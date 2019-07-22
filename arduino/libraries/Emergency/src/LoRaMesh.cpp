
#include <stdlib.h>
#include <time.h>

#include "LoRaMesh.h"

String ctoh(unsigned char *buf, size_t len) {
  String s = "";
  for(int i = 0; i < len; i++) {
    if((uint8_t)buf[i] < 16) s.concat("0");
    s.concat(String(buf[i], HEX));
  }
  return s;
}

void ltoc(unsigned long n, unsigned char *buf) {
  buf[0] = (n >> 24) & 0xFF;
  buf[1] = (n >> 16) & 0xFF;
  buf[2] = (n >> 8) & 0xFF;
  buf[3] = n & 0xFF;
}

/**
 * Packet Layout (Byte(s) = Note)
 * 1 = Destination Address
 * 1 = Source Address
 * 4 = Sequence Number - prevent relay of already seen packets
 * 4 = Timestamp (seconds epoch)
 * 1 = Packet type - see below
 * <140 = Packet payload - the actual data for use
 */

LoRaMesh::LoRaMesh(byte addr) {
  addr_ = addr;
  sequence_ = 0;
}

LoRaMesh::~LoRaMesh() {

}

int LoRaMesh::begin() {
  LoRa.setPins(LM_PIN_CS, LM_PIN_RST, LM_PIN_IRQ);
  return LoRa.begin(LM_FREQUENCY);
}

void LoRaMesh::end() {
  LoRa.end();
}

int LoRaMesh::recv(struct packet &pack) {
  String packet;

  int size = LoRa.parsePacket();
  if(size == 0) return 1;

  while(LoRa.available()) {
    packet.concat(LoRa.readString());
  }

  unsigned char buf[packet.length()];
  packet.getBytes(buf, sizeof(buf));

  pack.destination = strtol(packet.substring(0, 2).c_str(), NULL, 16);
  pack.source = strtol(packet.substring(2, 4).c_str(), NULL, 16);
  pack.sequence = strtol(packet.substring(4, 12).c_str(), NULL, 16);

  // Update our list of nodes or here is a chance to ignore the
  // packet if we have already seen it.
  Serial.print("Node count: "); Serial.println(nodes_.size(), DEC);
  if(!nodes_.count(pack.source)) {
    nodes_.insert(std::pair<byte, unsigned long>(pack.source, pack.sequence));
    Serial.print("Added node: "); Serial.println(pack.source, HEX);
  } else if(nodes_[pack.source] >= pack.sequence) {
    return 2;
  }

  nodes_[pack.source] = pack.sequence;
  Serial.print("Node sequence: "); Serial.print(pack.source, HEX); Serial.print(" "); Serial.println(nodes_[pack.source], DEC);

  pack.timestamp = strtol(packet.substring(12, 20).c_str(), NULL, 16);
  pack.type = strtol(packet.substring(20, 22).c_str(), NULL, 16);
  pack.payload = packet.substring(22);
  Serial.print("Receive size: "); Serial.println(packet.length(), DEC);
  Serial.print("Receive data: "); Serial.println(packet);

  if(pack.destination != addr_) {
    relay(pack);
  }
  return 0;
}

int LoRaMesh::relay(struct packet &pack) {
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

  LoRa.beginPacket();
  LoRa.print(data);
  LoRa.endPacket();
  Serial.print("Relay size: "); Serial.println(data.length(), DEC);
  Serial.print("Relay data: "); Serial.println(data);
  return 0;
}

int LoRaMesh::send(byte dest, byte type, String payload) {
  time_t t;
  time(&t);

  ++sequence_;

  unsigned char seq[4];
  ltoc(sequence_, seq);

  unsigned char now[4];
  ltoc(t, now);

  String data;
  data.concat(String(dest, HEX));
  data.concat(String(addr_, HEX));
  data.concat(ctoh(seq, sizeof(seq)));
  data.concat(ctoh(now, sizeof(now)));
  data.concat(String(type, HEX));

  unsigned char *pl = (unsigned char *)payload.c_str();
  data.concat(ctoh(pl, payload.length() * 2));

  LoRa.beginPacket();
  LoRa.print(data);
  LoRa.endPacket();
  Serial.print("Send size: "); Serial.println(data.length(), DEC);
  Serial.print("Send data: "); Serial.println(data);
  return 0;
}
