
#ifndef CC_H_
#define CC_H_

#include <Arduino.h>
#include <DNSServer.h>
#include <WiFi.h>
#include <WiFiServer.h>

#include "Config.h"
#include "LoRaMesh.h"

class CC {
  public:
    CC();
    int begin(Config &cfg);
    int mesh(LoRaMesh *lm);
    int process();

  private:
    DNSServer dns_;
    LoRaMesh *lm_;
    WiFiServer wifi_;

    int dns_begin_(const uint16_t &port, const String &domain, const IPAddress &ip);
    int dns_process_();
    int wifi_begin_(const uint16_t &port, const uint32_t &timeout);
    int wifi_process_();
};

#endif
