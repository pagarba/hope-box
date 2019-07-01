
#ifndef CONFIG_H_
#define CONFIG_H_

#include <Arduino.h>
#include <WiFi.h>

typedef struct {
  const IPAddress ap_ip;
  const IPAddress ap_net_mask;
  const char *ap_ssid;

  const String dns_domain;
  const uint16_t dns_port;

  const uint16_t wifi_port;
  const uint32_t wifi_timeout;

  const String web_html;
  const uint16_t web_port;
} Config;

#endif
