
#include "CC.h"

CC::CC() {

}

int CC::begin(Config &cfg) {
  int rc = dns_begin_(cfg.dns_port, cfg.dns_domain, cfg.ap_ip);
  if(rc) return rc;

  rc = wifi_begin_(cfg.wifi_port, cfg.wifi_timeout);
  return rc;
}

int CC::mesh(LoRaMesh *lm) {
  lm_ = lm;
  return 0;
}

int CC::process() {
  int rc = dns_process_();
  if(rc) return rc;

  rc = wifi_process_();
  return rc;
}

int CC::dns_begin_(const uint16_t &port, const String &domain, const IPAddress &ip) {
  dns_.start(port, domain, ip);
  return 0;
}

int CC::dns_process_() {
  dns_.processNextRequest();
  return 0;
}

int CC::wifi_begin_(const uint16_t &port, const uint32_t &timeout) {
  wifi_.setTimeout(timeout);
  wifi_.begin(port);
  return 0;
}

int CC::wifi_process_() {
  WiFiClient cli = wifi_.available();
  if(cli) {
    String line = "";
    while(cli.connected() && cli.available()) {
      line += cli.readStringUntil('\n');
    }

    const char *str = line.c_str();
    cli.write(str, sizeof(str));
    cli.write((uint8_t)'\n');
    cli.stop();

    return lm_->send(LM_CC_ADDRESS, str[0], ++str);
  }
  return 0;
}
