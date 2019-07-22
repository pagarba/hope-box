/**
 * CC
 */
#include <CC.h>
#include <Config.h>
#include <Emergency.h>
#include <LoRaMesh.h>
#include <WiFi.h>

const byte kLoRaAddress = LM_CC_ADDRESS;

Config cfg = {
  Emergency::kAPIP,
  Emergency::kAPNetMask,
  "CommandCenterAP",
  Emergency::kDNSDomain,
  Emergency::kDNSPort,
  Emergency::kWiFiPort,
  Emergency::kWiFiTimeout,
  Emergency::kWebHTML,
  Emergency::kWebPort
};
CC cc_;
LoRaMesh lm_(kLoRaAddress);
IPAddress pi_ip_(192, 168, 1, 254);

void setup() {
  Serial.begin(115200);
  while(!Serial);
  Serial.println();

  if(!lm_.begin()) {
    Serial.println("Unable to start LoRaMesh!");
    while(true);
  }
  Serial.println("LoRaMesh started!");
  cc_.mesh(&lm_);

  WiFi.mode(WIFI_AP);
  WiFi.softAP(cfg.ap_ssid);
  delay(500);
  WiFi.softAPConfig(cfg.ap_ip, cfg.ap_ip, cfg.ap_net_mask);
  Serial.println("WiFi AP started!");
  int rc = cc_.begin(cfg);
  if(rc) {
    Serial.print("Error: begin returned code "); Serial.println(rc, DEC);
    while(true);
  }
  Serial.println("CC started!");
}

void loop() {
  struct packet pack;
  if(!lm_.recv(pack)) {
    Serial.print("Destination: "); Serial.println(pack.destination, HEX);
    Serial.print("Source: "); Serial.println(pack.source, HEX);
    Serial.print("Sequence: "); Serial.println(pack.sequence, DEC);
    Serial.print("Timestamp: "); Serial.println(pack.timestamp, DEC);
    Serial.print("Type: "); Serial.println(pack.type, HEX);
    Serial.print("Payload: "); Serial.println(pack.payload);

    WiFiClient cli;
    if(!cli.connect(pi_ip_, cfg.wifi_port)) {
      Serial.print("WiFi connect error: ");
      Serial.print(pi_ip_); Serial.print(":"); Serial.println(cfg.wifi_port, DEC);
    } else {
      unsigned char seq[4];
      ltoc(pack.sequence, seq);

      unsigned char now[4];
      ltoc(pack.timestamp, now);

      String data;
      data.concat(String(pack.destination, HEX));
      data.concat(String(pack.source, HEX));
      data.concat(ctoh(seq, sizeof(seq)));
      data.concat(ctoh(now, sizeof(now)));
      data.concat(String(pack.type, HEX));
      data.concat(pack.payload);

      cli.println(data);
      cli.stop();
      Serial.print("Sent data: "); Serial.println(data);
    }
  }

  int rc = cc_.process();
  if(rc) {
    Serial.print("Error: process returned code "); Serial.println(rc, DEC);
  }
}
