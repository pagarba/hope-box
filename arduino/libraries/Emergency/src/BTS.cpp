
#include "BTS.h"

BTS::BTS() {

}

int BTS::begin(Config &cfg) {
  Serial.println("Starting DNS...");
  int rc = dns_begin_(cfg.dns_port, cfg.dns_domain, cfg.ap_ip);
  if(rc) return rc;

  Serial.println("Starting Web Server...");
  rc = web_begin_(cfg.web_port, cfg.web_html);
  if(rc) return rc;

  Serial.println("Starting WiFi Server...");
  rc = wifi_begin_(cfg.wifi_port, cfg.wifi_timeout);
  return rc;
}

int BTS::mesh(LoRaMesh *lm) {
  lm_ = lm;
  return 0;
}

int BTS::process() {
  int rc = dns_process_();
  if(rc) return rc;

  rc = web_process_();
  if(rc) return rc;

  rc = wifi_process_();
  return rc;
}

int BTS::dns_begin_(const uint16_t &port, const String &domain, const IPAddress &ip) {
  dns_.start(port, domain, ip);
  return 0;
}

int BTS::dns_process_() {
  dns_.processNextRequest();
  return 0;
}

int BTS::web_begin_(const uint16_t &port, const String &html) {
  web_.onNotFound([this, html]() {
    web_.send(200, "text/html", html);
  });
  web_.on("/", [this, html]() {
    web_.send(200, "text/html", html);
  });
  web_.begin(port);
  return 0;
}

int BTS::web_process_() {
  web_.handleClient();
  return 0;
}

int BTS::wifi_begin_(const uint16_t &port, const uint32_t &timeout) {
  wifi_.setTimeout(timeout);
  wifi_.begin(port);
  return 0;
}

int BTS::wifi_process_() {
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
