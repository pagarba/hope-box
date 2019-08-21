
#ifndef HOPE_H
#define HOPE_H

#include <Arduino.h>
#include <WiFi.h>

namespace Hope
{
  namespace API {
    const String kHTML = ""
      "<!DOCTYPE html>"
      "<html>"
      "<head>"
      "<title>Kudzu</title>"
      "</head>"
      "<body>"
      "<h1>Emergency Portal</h1>"
      "</body>"
      "</html>";
    const uint16_t kPort{80};
  }

  namespace DNS {
    const String kDomain("*");
    const uint16_t kPort{53};
  }

  namespace Net {
    const IPAddress kIP(10, 0, 0, 1);
    const IPAddress kNetMask(255, 255, 255, 0);
  }

  namespace WiFi {
    const uint16_t kPort{4000};
    const char *kSSID = "EmergencyAP";
  }
}


#endif
