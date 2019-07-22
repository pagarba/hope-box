import socket

import sys



HOST, PORT = "localhost", 4000



# Create a socket (SOCK_STREAM means a TCP socket)

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)



try:

    # Connect to server and send data

    sock.connect((HOST, PORT))

    #data = "a01000000002000000661033352e3235343033303236313231313437362d38302e3735313537313635353237333435"
    data = "a010000000020000006620333131343830323432333532373537"
    sock.sendall(data)

    # Receive data from the server and shut down

    received = sock.recv(1024).lower()

finally:

    sock.close()



print "Sent:     {}".format(data)

print "Received: {}".format(received)
