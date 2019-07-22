
#ifndef LORA_MESH_H_
#define LORA_MESH_H_

#include <Arduino.h>
#include <LoRa.h>
#include <map>
#include <SPI.h>

#define LM_CC_ADDRESS    0xA0
#define LM_NULL_ADDRESS  0x00

#define LM_PACKET_MAX_SIZE   151
#define LM_PACKET_REGISTER   0x10
#define LM_PACKET_NEW_IMSI   0x20
#define LM_PACKET_NEW_MSIDSN 0x30
#define LM_PACKET_911_INFO   0x40
#define LM_PACKET_RESP_SMS   0x50
#define LM_PACKET_USER_SMS   0x60

#define LM_FREQUENCY 915E6
#define LM_PIN_CS  16
#define LM_PIN_RST 3
#define LM_PIN_IRQ 26

struct packet {
  byte destination;
  byte source;
  unsigned long sequence;
  unsigned long timestamp;
  byte type;
  String payload;
};

class LoRaMesh {
  public:
    LoRaMesh(byte addr);
    ~LoRaMesh();
    int begin();
    void end();
    int recv(struct packet &pack);
    int relay(struct packet &pack);
    int send(byte dest, byte type, String payload);

  private:
    byte addr_ = LM_NULL_ADDRESS;
    std::map<byte, unsigned long> nodes_;
    unsigned long sequence_;
};

String ctoh(unsigned char *buf, size_t len);
void ltoc(unsigned long n, unsigned char *buf);

#endif
