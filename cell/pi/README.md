# PI Setup

## Configuration

After burning raspbian stretch lite onto the SD card please copy the files located in either `bts/` or `cc/` to the boot SD card.  

### Static IP Address

Once the raspberry pi has started login via ssh, you might have to connect to the WiFi AP that the Pi is connected with.

Run `sudo vi /etc/dhcpcd.conf` by adding the following to the bottom:
```
interface wlan0
static ip_address=192.168.1.254
static routers=192.168.1.1
static domain_name_servers=192.168.1.1
```

Now reboot the pi with `sudo reboot now` after saving above.
