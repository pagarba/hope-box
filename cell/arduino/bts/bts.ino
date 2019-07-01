/**
 * BTS
 */
#include <BTS.h>
#include <Config.h>
#include <Emergency.h>
#include <LoRaMesh.h>
#include <WiFi.h>

const byte kLoRaAddress = 0x10;

Config cfg_ = {
  Emergency::kAPIP,
  Emergency::kAPNetMask,
  "EmergencyAP",
  Emergency::kDNSDomain,
  Emergency::kDNSPort,
  Emergency::kWiFiPort,
  Emergency::kWiFiTimeout,
  Emergency::kWebHTML,
  Emergency::kWebPort
};
BTS bts_;
LoRaMesh lm_(kLoRaAddress);

void setup() {
  Serial.begin(115200);
  while(!Serial);
  Serial.println();

  if(!lm_.begin()) {
    Serial.println("Unable to start LoRaMesh!");
    while(true);
  }
  Serial.println("LoRaMesh started!");
  bts_.mesh(&lm_);

  WiFi.mode(WIFI_AP);
  WiFi.softAP(cfg_.ap_ssid);
  delay(500);
  WiFi.softAPConfig(cfg_.ap_ip, cfg_.ap_ip, cfg_.ap_net_mask);
  Serial.println("WiFi AP started!");
  int rc = bts_.begin(cfg_);
  if(rc) {
    Serial.print("Error: begin returned code "); Serial.println(rc, DEC);
    while(true);
  }
  Serial.println("BTS started!");
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
  }

  int rc = bts_.process();
  if(rc) {
    Serial.print("Error: process returned code "); Serial.println(rc, DEC);
  }
}
