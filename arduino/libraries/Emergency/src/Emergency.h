
#ifndef EMERGENCY_H_
#define EMERGENCY_H_

#include <Arduino.h>
#include <WiFi.h>

namespace Emergency {

const IPAddress kAPIP(192, 168, 1, 1);

const IPAddress kAPNetMask(255, 255, 255, 0);

const char *kAPSSID = "EmergencyAP";

const String kDNSDomain("*");

const uint16_t kDNSPort{53};

const uint16_t kWiFiPort{4000};

const uint32_t kWiFiTimeout{5}; // seconds

const String kWebHTML = ""
  "<!DOCTYPE html><html><head><title>Kudzu</title></head><body>"
  "<h1>Emergency Portal</h1>"
  "<p>Please connect your phone the emergency carrier system.</p></body></html>";

const uint16_t kWebPort{80};

}
#endif
