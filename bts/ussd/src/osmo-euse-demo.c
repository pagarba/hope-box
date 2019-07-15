/* osmo-demo-euse: An External USSD Entity (EUSE) for demo purpose */

/* (C) 2018 by Harald Welte <laforge@gnumonks.org>
 *
 * All Rights Reserved
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * This program illustrates how to implement an external USSD application using
 * the existing osmocom libraries, particularly libosmocore, libosmogsm and libosmo-gsup-client.
 *
 * It will receive any MS-originated USSD message that is routed to it via the HLR, and
 * simply respond it quoted in the following string: 'You sent "foobar"' (assuming the original
 * message was 'foobar').
 */
#include <errno.h>
#include <netdb.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>

#include <osmocom/core/msgb.h>
#include <osmocom/core/select.h>
#include <osmocom/core/application.h>
#include <osmocom/core/utils.h>
#include <osmocom/core/logging.h>

#include <osmocom/gsm/gsup.h>
#include <osmocom/gsm/gsm0480.h>
#include <osmocom/gsm/protocol/gsm_04_80.h>

#include <osmocom/gsupclient/gsup_client.h>

#include "logging.h"

#define MAX_SIZE      200
#define MAX_SESSIONS  10
#define SA            struct sockaddr
#define TCP_PORT      4000

const char *kEnd = {'\n'};
const char *kTCPServerIP = "192.168.1.1";

const int Q1 = 0;
const int Q2 = 1;
const int Q3 = 2;
const int Q4 = 3;
const int Q5 = 4;
const int Q6 = 5;
const int Q7 = 6;
const int S1 = 7;
const int S2 = 8;

const uint8_t kPacketNewIMSI = 0x20;
const uint8_t kPacket911 = 0x40;

typedef struct {
  const char *imsi;
  int state;
} session;

session *sessions_[MAX_SESSIONS] = {0};

static struct osmo_gsup_client *g_gc;

const char *kYes = "*1#";
const char *response_[] = {
  "Is their an immediate threat to your life, medical or otherwise? Call:\n*1# for yes\n*2# for no",
  "Are you experiencing any medical complications at this time? Call:\n*1# for yes\n*2# for no",
  "Do you have trouble breathing or major blood loss? Call:\n*1# for yes\n*2# for no",
  "Do you have chest pains or major lacerations? Call:\n*1# for yes\n*2# for no",
  "Do you have abdominal pain or a fractured bone? Call:\n*1# for yes\n*2# for no",
  "Do you have minor pain or lacerations? Call:\n*1# for yes\n*2# for no",
  "Do you have any other minor health related issues? Call:\n*1# for yes\n*2# for no",
  "Thank you, emergency responders have been notified of your general location and will be with you ASAP.",
  "Thank you, we have provided your information to emergency responders.  Please wait for further instruction."
};

int session_del(session *ss) {
  bool del = false;
  for(int i = 0; i < MAX_SESSIONS; i++) {
    if(sessions_[i] != NULL && sessions_[i]->imsi == ss->imsi) {
      del = true;
      sessions_[i] = NULL;
      break;
    }
  }
  return del ? 1 : 0;
}

session *session_get(const char *imsi) {
  session *ss = NULL;
  for(int i = 0; i < MAX_SESSIONS; i++) {
    printf("%d %s\n", i, sessions_[i] == NULL ? NULL : sessions_[i]->imsi);
    if(sessions_[i] != NULL && sessions_[i]->imsi == imsi) {
      ss = sessions_[i];
      printf("%s\n", ss->imsi);
      break;
    }
  }
  return ss;
}

int session_set(session *ss) {
  bool set = false;
  for(int i = 0; i < MAX_SESSIONS; i++) {
    if(sessions_[i] != NULL && sessions_[i]->imsi == ss->imsi) {
      sessions_[i] = ss;
      set = true;
      break;
    }
  }
  if(!set) {
    for(int i = 0; i < MAX_SESSIONS; i++) {
      if(sessions_[i] == NULL) {
        session *nss = malloc(sizeof(session));
        nss->imsi = ss->imsi;
        nss->state = ss->state;
        sessions_[i] = nss;
        ss = nss;
        set = true;
        break;
      }
    }
  }
  return set ? 1 : 0;
}

const char* session_response(const char *imsi, const char *msisdn, const char *text) {
  printf("%s provided answer: %s\n", imsi, text);
  printf("Finding session for: %s\n", imsi);
  uint8_t esi = 0;
  session *ss = session_get(imsi);
  if(ss == NULL) {
    printf("Session not found for: %s\n", imsi);
    ss = &(session){imsi, Q1};

    // Send new IMSI message.
    char buf[17];
    buf[0] = kPacketNewIMSI;
    snprintf(buf + 1, sizeof(buf), "%s", imsi);
    printf("New IMSI: %s\n", buf);
    if(tcp_send(buf, sizeof(buf))) {
      printf("Unable to send new IMSI: %s\n", buf);
    }
  } else {
    printf("Session found for: %s %d\n", ss->imsi, ss->state);
    bool is_yes = strcmp(text, kYes) == 0;
    printf("Answer is yes? %s\n", is_yes ? "Yes" : "No");

    if(ss->state == 99) {
      ss->state = Q1;
    } else if(ss->state == Q1) {
      ss->state = is_yes ? S2 : Q2;
      if(is_yes) esi = 1;
    } else if(ss->state == Q2) {
      ss->state = is_yes ? Q3 : S1;
      if(!is_yes) esi = 5;
    } else if(ss->state <= Q7) {
      if(is_yes) {
        switch(ss->state) {
          case (int)Q3:
            esi = 1;
            break;
          case (int)Q4:
            esi = 2;
            break;
          case (int)Q5:
            esi = 3;
            break;
          case (int)Q6:
            esi = 4;
            break;
          case (int)Q7:
          default:
            esi = 5;
            break;
        }
      }

      ss->state = is_yes ? S1 : ss->state + 1;
    }
    printf("New session state of %d for %s\n", ss->state, ss->imsi);
  }

  if(!session_set(ss)) {
    printf("Unable to set session for: %s\n", imsi);
  } else {
    printf("Session set for: %s\n", imsi);
  }

  const char *msg = response_[ss->state];
  if(ss->state > Q7) {
    // Send new 911 message.
    char buf[18];
    buf[0] = kPacket911;
    snprintf(buf + 1, sizeof(buf), "%s", imsi);
    snprintf(buf + 16, 16, "%u", esi);
    printf("911: %u %s\n", esi, buf);
    if(tcp_send(buf, sizeof(buf))) {
      printf("Unable to send 911: %s\n", buf);
    }

    if(!session_del(ss)) {
      printf("Unable to deleted session for: %s\n", ss->imsi);
    } else {
      printf("Session deleted for: %s\n", ss->imsi);
    }
  }
  return msg;
}

int tcp_send(const char *payload, size_t len) {
  int sock_fd;
  struct sockaddr_in srv_addr;

  // create socket
  sock_fd = socket(AF_INET, SOCK_STREAM, 0);
  if(sock_fd == -1) {
    printf("Socket creation failed!\n");
    return 1;
  }
  bzero(&srv_addr, sizeof(srv_addr));

  // assign the ip and port
  srv_addr.sin_family = AF_INET;
  srv_addr.sin_addr.s_addr = inet_addr(kTCPServerIP);
  srv_addr.sin_port = htons(TCP_PORT);

  // connect the cli socket to srv socket
  if(connect(sock_fd, (SA*)&srv_addr, sizeof(srv_addr)) != 0) {
    printf("Socket connection failed!\n");
    return 2;
  }

  // send the payload to the tcp srv_addr
  write(sock_fd, payload, len);
  write(sock_fd, kEnd, sizeof(kEnd));
  printf("Write: %s\n", payload);
  // read the payload from the tcp srv
  char buf[len];
  bzero(buf, len);
  read(sock_fd, buf, len);
  printf("Read: %s\n", buf);

  // close the socket
  close(sock_fd);
  return 0;
}

/*! send a SS/USSD response to a given imsi/session.
 *  \param[in] gsupc GSUP client connection through which to send
 *  \param[in] imsi IMSI of the subscriber
 *  \param[in] session_id Unique identifier of SS session for which this response is
 *  \param[in] gsup_msg_type GSUP message type (OSMO_GSUP_MSGT_PROC_SS_{REQUEST,RESULT,ERROR})
 *  \param[in] final Is this the final result (true=END) or an intermediate result (false=CONTINUE)
 *  \param[in] msg Optional binary/BER encoded SS date (for FACILITY IE). Can be NULL. Freed in
 *  		   this function call.
 */
static int euse_tx_ss(struct osmo_gsup_client *gsupc, const char *imsi, uint32_t session_id,
		      enum osmo_gsup_message_type gsup_msg_type, bool final, struct msgb *ssmsg)
{
	struct osmo_gsup_message resp = {0};
	struct msgb *resp_msg;

	switch (gsup_msg_type) {
	case OSMO_GSUP_MSGT_PROC_SS_REQUEST:
	case OSMO_GSUP_MSGT_PROC_SS_RESULT:
	case OSMO_GSUP_MSGT_PROC_SS_ERROR:
		break;
	default:
		msgb_free(ssmsg);
		return -EINVAL;
	}

	resp.message_type = gsup_msg_type;
	OSMO_STRLCPY_ARRAY(resp.imsi, imsi);
	if (final)
		resp.session_state = OSMO_GSUP_SESSION_STATE_END;
	else
		resp.session_state = OSMO_GSUP_SESSION_STATE_CONTINUE;
	resp.session_id = session_id;
	if (ssmsg) {
		resp.ss_info = msgb_data(ssmsg);
		resp.ss_info_len = msgb_length(ssmsg);
	}

	resp_msg = gsm0480_msgb_alloc_name(__func__);
	OSMO_ASSERT(resp_msg);
	osmo_gsup_encode(resp_msg, &resp);
	msgb_free(ssmsg);
	return osmo_gsup_client_send(gsupc, resp_msg);
}

/*! send a SS/USSD reject to a given IMSI/session.
 * \param[in] gsupc		GSUP client connection through which to send
 * \param[in] imsi		IMSI of the subscriber
 * \param[in] session_id	Unique identifier of SS session for which this response is
 * \param[in] invoke_id		InvokeID of the request
 * \param[in] problem_tag	Problem code tag (table 3.13)
 * \param[in] problem_code	Problem code (table 3.14-3.17)
 */
static int euse_tx_ussd_reject(struct osmo_gsup_client *gsupc, const char *imsi, uint32_t session_id,
				int invoke_id, uint8_t problem_tag, uint8_t problem_code)
{
	struct msgb *msg = gsm0480_gen_reject(invoke_id, problem_tag, problem_code);
	LOGP(DMAIN, LOGL_NOTICE, "Tx %s/0x%08x: Reject(%d, 0x%02x, 0x%02x)\n", imsi, session_id,
		invoke_id, problem_tag, problem_code);
	OSMO_ASSERT(msg);
	return euse_tx_ss(gsupc, imsi, session_id, OSMO_GSUP_MSGT_PROC_SS_RESULT, true, msg);
}

/*! send a SS/USSD response in 7-bit GSM default alphabet o a given imsi/session.
 * \param[in] gsupc		GSUP client connection through which to send
 * \param[in] imsi		IMSI of the subscriber
 * \param[in] session_id	Unique identifier of SS session for which this response is
 * \param[in] final		Is this the final result (true=END) or an intermediate result
 * 				(false=CONTINUE)
 * \param[in] invoke_id		InvokeID of the request
 */
static int euse_tx_ussd_resp_7bit(struct osmo_gsup_client *gsupc, const char *imsi, uint32_t session_id,
				  bool final, uint8_t invoke_id, const char *text)
{
	struct msgb *ssmsg;

	/* encode response; remove L3 header */
	ssmsg = gsm0480_gen_ussd_resp_7bit(invoke_id, text);
	LOGP(DMAIN, LOGL_DEBUG, "Tx %s/0x%08x: USSD Result(%d, %s, '%s')\n", imsi, session_id,
		invoke_id, final ? "END" : "CONTINUE", text);
	OSMO_ASSERT(ssmsg);
	return euse_tx_ss(gsupc, imsi, session_id, OSMO_GSUP_MSGT_PROC_SS_RESULT, final, ssmsg);
}

static int euse_rx_PROC_SS_req(struct osmo_gsup_client *gsupc, const struct osmo_gsup_message *gsup)
{
	char buf[GSM0480_USSD_7BIT_STRING_LEN+1];
	struct ss_request req = {0};

	if (gsup->ss_info && gsup->ss_info_len) {
		if (gsm0480_parse_facility_ie(gsup->ss_info, gsup->ss_info_len, &req)) {
			return euse_tx_ussd_reject(gsupc, gsup->imsi, gsup->session_id, -1,
						   GSM_0480_PROBLEM_CODE_TAG_GENERAL,
						   GSM_0480_GEN_PROB_CODE_BAD_STRUCTURE);
		}
	}

	LOGP(DMAIN, LOGL_INFO, "Rx %s/0x%08x: USSD SessionState=%s, OpCode=%s, '%s'\n", gsup->imsi,
		gsup->session_id, osmo_gsup_session_state_name(gsup->session_state),
		gsm0480_op_code_name(req.opcode), req.ussd_text);

	/* we only handle single-request-response USSD in this demo */
	if (gsup->session_state != OSMO_GSUP_SESSION_STATE_BEGIN) {
		return euse_tx_ussd_reject(gsupc, gsup->imsi, gsup->session_id, req.invoke_id,
					   GSM_0480_PROBLEM_CODE_TAG_GENERAL,
					   GSM_0480_GEN_PROB_CODE_UNRECOGNISED);
	}

  printf("Received message: %s\n", req.ussd_text);
  const char *msg = session_response(gsup->imsi, (const char *)gsup->msisdn_enc, (const char *)req.ussd_text);
  printf("Session response: %s\n", msg);
	snprintf(buf, sizeof(buf), msg);
	return euse_tx_ussd_resp_7bit(gsupc, gsup->imsi, gsup->session_id, true, req.invoke_id, buf);
}

static int gsupc_read_cb(struct osmo_gsup_client *gsupc, struct msgb *msg)
{
	struct osmo_gsup_message gsup_msg = {0};
	int rc;

	rc = osmo_gsup_decode(msgb_l2(msg), msgb_l2len(msg), &gsup_msg);
	if (rc < 0) {
		LOGP(DMAIN, LOGL_ERROR, "Error decoding GSUP: %s\n", msgb_hexdump(msg));
		return rc;
	}
	DEBUGP(DMAIN, "Rx GSUP %s: %s\n", osmo_gsup_message_type_name(gsup_msg.message_type),
		msgb_hexdump(msg));

	switch (gsup_msg.message_type) {
	case OSMO_GSUP_MSGT_PROC_SS_REQUEST:
	case OSMO_GSUP_MSGT_PROC_SS_RESULT:
		euse_rx_PROC_SS_req(gsupc, &gsup_msg);
		break;
	case OSMO_GSUP_MSGT_PROC_SS_ERROR:
		break;
	default:
		LOGP(DMAIN, LOGL_DEBUG, "Unhandled GSUP message type %s\n",
			osmo_gsup_message_type_name(gsup_msg.message_type));
		break;
	}

	msgb_free(msg);
	return 0;
}

static struct log_info_cat default_categories[] = {
	[DMAIN] = {
		.name = "DMAIN",
		.description = "Main Program",
		.enabled = 1, .loglevel = LOGL_DEBUG,
	},
};

static const struct log_info gsup_log_info = {
	.cat = default_categories,
	.num_cat = ARRAY_SIZE(default_categories),
};

static void print_usage(void)
{
	printf("Usage: osmo-euse-demo [hlr-ip [hlr-gsup-port]]\n");
}

int main(int argc, char **argv)
{
	char *server_host = "127.0.0.1";
	uint16_t server_port = OSMO_GSUP_PORT;
	void *ctx = talloc_named_const(NULL, 0, "emergency-euse");

	osmo_init_logging2(ctx, &gsup_log_info);

	printf("argc=%d\n", argc);

	if (argc > 1) {
		if (!strcmp(argv[1], "--help") || !strcmp(argv[1], "-h")) {
			print_usage();
			exit(0);
		} else
			server_host = argv[1];
	}
	if (argc > 2)
		server_port = atoi(argv[2]);

	g_gc = osmo_gsup_client_create(ctx, "EUSE-gateway", server_host, server_port, gsupc_read_cb, NULL);

	while (1) {
		osmo_select_main(0);
	}

	exit(0);
}

