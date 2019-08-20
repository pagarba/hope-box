# HopeBox - Base Transceiver Station (BTS)

The following is information provided in regards to the base transceiver station and its function in the network.  

The idea behind this system is provide a forward deploying cellular network to gather and transmit relevant information to first responders.

The prototype uses a `LimeSDR Mini` connected to a `Raspberry Pi 3 B+` running the `Osmocom` stack of open source services.  This `Pi` connects to a `WiFi AP` provided by the `ESP32` chip on the `LoRa Gateway` module.  Communication is done over `TCP` between the module and `Pi`.

The two main interfaces of communication for information gathering are the `USSD` and `SMPP` gateways.  For more detailed information about the two protocols it is recommended to do some online research.


## Outline

Checkout the following to gain an overview of the different sections of the `BTS`.

* `configs/` - configuration files used to run the different `Osmocom` services.
* `pi/` - files to be copied to the `Pi` after the operating system has been burned to the SD card.
* `scripts/` - bash scripts related to the `BTS`.
* `smpp/` - the `SMPP` interface for `SMS` interaction in a `BTS`.
* `ussd/` - the `USSD` interface that provides the `ESI` questionnaire.


## Install

To setup and configure the system on a debian based system please refer to the `scripts/install.sh` file.  

If you are running on Ubuntu 18+ you can execute the script to install the system for you `bash scripts/install.sh`.

The following non-current version are being utilized:

| Module | Version | Notes |
|---|---|---|
| LimeSuite | v18.10.0 | Seems to be the most compatible version with Osmocom. |
| LimeSDR Mini Firmware | v18.10.0 | The mini will need to be flashed with this version using LimeSuiteGUI. |

* Other services and libraries are currently working by using the `master` branch of each except those outlined above.

To flash the above working firmware to the `LimeSDR Mini` please follow these steps:

1. Download the firmware version from [MyriadRF](https://downloads.myriadrf.org/project/limesuite/18.10/).  You can also try `wget https://downloads.myriadrf.org/project/limesuite/18.10/LimeSDR-Mini_HW_1.2_r1.28.rpd` from the terminal which works at the time of writing.   

2. Once the software is downloaded, with the `LimeSDR Mini` plugged into the USB port, open `LimeSuiteGUI` then connect to the device and open the `Programming` option from the `Modules` menu.  

3. In the `Programming` window select `FPGA FLASH` in `Programming Mode`, then click on `Open` to select the firmware just downloaded.

4. Click on `Program` and wait for the process to finish. 

5. Once complete close `LimeSuiteGUI` and other open alerts.


## Run

To start the base transceiver station please run `bash scripts/start.sh`.  This will start the required services as daemons with the `LimeSDR` interface running as a job.

In another terminal execute `bash scripts/ussd.sh` to build and run the `USSD Gateway` that interfaces with `USSD` and provides the questionnaire.

In the third terminal run `python smpp/main.py` to run the `SMPP Gateway` that interfaces with `SMS` to provide interfacing such things as a `Chatbot` powered by `AI` for example.


## Clean

To cleanup or force new builds of the required services please run `bash scripts/clean.sh`.  Once completed you can now do a fresh install.
