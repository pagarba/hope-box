import sys
import requests
import SocketServer
import json
import codecs

"""
LoRa Mesh
- Each node will keep track of all reported BTSs and their sequence.
- When a packet is received from a BTS the sequence is updated.
- Previous sequence numbers are ignored and not relayed.
- Messages are relayed the first time they are seen.

LoRa Addresses (1 byte)
0xA0 = Control Center
0x10-0x90 = BTS

Packet Layout (Byte(s) = Note)
1 = Destination Address
1 = Source Address
4 = Sequence Number - prevent relay of already seen packets
4 = Timestamp (seconds epoch)
1 = Packet type - see below
<140 = Packet payload - the actual data for use

Packet - Payload Types (Byte)
0x10 = Register BTS with control center
0x20 = New IMSI registered on system
0x30 = New MSIDSN assigned to IMSI
0x40 = *911# user information from USSD questions
0x50 = Responder SMS to User
0x60 = User SMS reply to Responder


Packets (Byte(s) = Note)
0x10 = Register BTS
4 = Latitude
4 = Longitude

0x20 = New IMSI
4 = IMSI
4 = BTS ID
4 = MSIDSN - might be reassigned by CC
* If send by CC then add to database, could be responder from CC

0x30 = Respond with MSIDSN for New IMSI
4 = IMSI
4 = MSIDSN
* If MSIDSN is not the same the BTS should change it.

0x40 = *911# user response information
4 = IMSI
1 = ESI

0x50 = Responder SMS
4 = IMSI
<140 = Message

0x60 = User SMS response
4 = IMSI
<140 = Message
"""

max = 200
port = 4000
stubLat =35.254030261211476
stubLon =-80.75157165527345
headers = {'Content-Type': 'application/json'}


def registerBTS(addr,lat,lon):
    url = 'http://169.61.14.250/icons/post'
    payload = {"lat":lat,"lon":lon,"message":"BTSID: "+addr,"item":"Base Station"}
    return requests.post(url, headers=headers, data=json.dumps(payload))

def newIMSI(imsi,addr,lat,lon):
    print(imsi)
    url = 'http://169.61.14.250/data/post'
    payload = {"imsi":imsi,"lat":lat,"lon":lon,"message":"BTSID: "+addr,"status":"unharmed"}
    return requests.post(url, headers=headers, data=json.dumps(payload))

def MSISDNResponse():
    return "not yet"

def ESIResponse(imsi,esi,addr):
    url = 'http://169.61.14.250/data/update'
    payload = {"imsi":imsi,"message":"BTSID: "+addr+" ESI: "+esi,"status":"assistance"}
    return requests.post(url, headers=headers, data=json.dumps(payload))

def ResponderSMS():
    return "not yet"

def UserSMS():
    return "not yet"

class MyTCPHandler(SocketServer.BaseRequestHandler):
    """
    The request handler class for our server.

    It is instantiated once per connection to the server, and must
    override the handle() method to implement communication to the
    client.
    """

    def handle(self):
        # self.request is the TCP socket connected to the client
        self.data = self.request.recv(1024).strip().lower()
        print "{} wrote:".format(self.client_address[0])
        print self.data

        payloadType = self.data[20:22]

        if(payloadType == '10'):
            #print(registerBTS(self.data[0:2],codecs.decode(self.data[22:26],"hex"),codecs.decode(self.data[26:30],"hex")))
            print(registerBTS(self.data[0:2],stubLat,stubLon))

        elif(payloadType == '20'):
            print "New IMSI"
            print(newIMSI(codecs.decode(self.data[22:52],"hex"),self.data[0:2],stubLat,stubLon))

        elif(payloadType == '30'):
            print(MSISDNResponse())

        elif(payloadType == '40'):
            print "911 Info"
            print(ESIResponse(codecs.decode(self.data[22:52],"hex"),codecs.decode(self.data[52:54],"hex"),self.data[0:2]))

        elif(payloadType == '50'):
            print(ResponderSMS())

        elif(payloadType == '60'):
            print(UserSMS())

        # just send back the same data, but upper-cased
        self.request.sendall(self.data.upper())

if __name__ == "__main__":
    HOST, PORT = "0.0.0.0", port

    # Create the server, binding to localhost on port 9999
    server = SocketServer.TCPServer((HOST, PORT), MyTCPHandler)
    print "Server ready!"

    # Activate the server; this will keep running until you
    # interrupt the program with Ctrl-C
    server.serve_forever()
