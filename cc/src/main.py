import PyLora
import time
import sys
import requests
import SocketServer
import json
import codecs

PyLora.set_pins(cs_pin=25, rst_pin=17, irq_pin=4)
PyLora.init()
print('PyLora initialized!')

PyLora.set_spreading_factor(7)
PyLora.set_preamble_length(8)
PyLora.set_frequency(915000000)
PyLora.set_sync_word(0x12)
#PyLora.set_tx_power(17)

ip = 'http://0.0.0.0:4000'
max = 200
port = 4000
stubLat ='35.254030261211476'
stubLon ='-80.75157165527345'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer NONE'
}

def registerBTS(addr,lat,lon):
    url = ip+'/station'
    payload = {"id":addr,"latitude":lat,"longitude":lon,"name":"Base Station"+addr}
    print addr
    return requests.post(url, headers=headers, data=json.dumps(payload))
    #return addr

def newIMSI(imsi,addr,lat,lon):
    url = ip+'/user'
    payload = {"imsi":imsi,"latitude":lat,"longitude":lon,"bts":addr,"msisdn":"123456","name":"testguy"}
    print addr + ' : ' + imsi
    return requests.post(url, headers=headers, data=json.dumps(payload))
    #return addr + ' : ' + imsi

def MSISDNResponse():
    return "not yet"

def ESIResponse(imsi,esi,addr):
    url = ip+'/user/esi'
    payload = {"imsi":imsi,"bts":addr,"esi":esi,"msisdn":"123456","name":"testguy"}
    print addr + " :" + imsi + " : " + esi
    return requests.put(url, headers=headers, data=json.dumps(payload))
    #return addr + " :" + imsi + " : " + esi

def ResponderSMS():
    return "not yet"

def UserSMS():
    return "not yet"

def handle(rx):
    payloadType = rx[20:22]
    btsid = rx[0:2]
    if(payloadType == '10'):
        #print(registerBTS(self.data[0:2],codecs.decode(self.data[22:26],"hex"),codecs.decode(self.data[26:30],"hex")))
        print(registerBTS(btsid,stubLat,stubLon))
    elif(payloadType == '20'):
        print "New IMSI"
        print(newIMSI(codecs.decode(rx[22:52],"hex"),btsid,stubLat,stubLon))
    elif(payloadType == '30'):
        print(MSISDNResponse())
    elif(payloadType == '40'):
        print "911 Info"
        print(ESIResponse(codecs.decode(rx[22:52],"hex"),codecs.decode(rx[52:54],"hex"),btsid))
    elif(payloadType == '50'):
        print(ResponderSMS())
    elif(payloadType == '60'):
        print(UserSMS())

while True:
    PyLora.receive()   # put into receive mode
    while not PyLora.packet_available():
        # wait for a package
        time.sleep(0)
    rec = PyLora.receive_packet()
    try:
        print(rec.decode())
        handle(rec.decode())
        #print('Packet:', bytes(rec).decode())
    except:
        print('Packet:', rec)
    #handle(rec.decode())
