# HOPE-Box

## Install

To setup and configure the system on a debian based system please refer to the `./scripts/bts-install.sh` file.  If you are running on Ubuntu 18+ you can execute the script to install the system for you `bash ./scripts/bts-install.sh`.

The current working configuration uses the following table:

| Module | Version | Notes |
|---|---|---|
| LimeSuite | v18.10.0 | Seems to be the most compatible version with Osmocom. |
| LimeSDR Mini Firmware | v18.10.0 | The mini will need to be flashed with this version using LimeSuiteGUI. |

* All other versions of `bts` modules are working so far on the master branch.
* You might need to download the firmware version from [MyriadRF](https://downloads.myriadrf.org/project/limesuite/18.10/).  You can also try `wget https://downloads.myriadrf.org/project/limesuite/18.10/LimeSDR-Mini_HW_1.2_r1.28.rpd` from the terminal which works at the time of writing.   
  * Once the software is downloaded, with the `LimeSDR Mini` plugged into the USB port, open `LimeSuiteGUI` then connect to the device and open the `Programming` option from the `Modules` menu.  
  * In the `Programming` window select `FPGA FLASH` in `Programming Mode`, then click on `Open` to select the firmware just downloaded.
  * Click on `Program`. 
  * Once complete close `LimeSuiteGUI`.

## Configuration

In order to configure the Raspberry Pis please flash the SD card with Raspbian Stretch Lite and following one of the following depending on the type of Pi being setup.  The following steps should be performed before the SD card is removed from the computer and installed into the Pi.

Once the files below are copied onto the SD card safely remove the SD, install it into the Pi, and start the Pi.

### Command Center (CC)

Copy all of the contents `pi/cc` onto the root `boot` section of the SD card.

### Base Transceiver Station (BTS)

Copy all of the contents `pi/bts` onto the root `boot` section of the SD card.


## Running

To start the platform open 6 terminals and execute the following commands in order with one being executed in each terminal:

1. `cd bts`

2. `sudo osmo-hlr -c configs/simple/osmo-hlr.cfg`
   
3. `sudo osmo-msc -c configs/simple/osmo-msc.cfg`
   
4. `sudo osmo-stp -c configs/simple/osmo-stp.cfg`
   
5. `sudo osmo-bsc -c configs/simple/osmo-bsc.cfg`
    
6.  `sudo osmo-bts-trx -c configs/simple/osmo-bts-trx.cfg`
    
7.  `sudo osmo-trx-lms -C configs/simple/osmo-trx-lms.cfg`

* The above commands should be ran from the project root folder.
* Please note that the `-C` in number 7 is a capital `C` while the rest are lowercase `c`.

### USSD Gateway

With the platform already and assuming you are in the base project folder `osmo` please follow these instructions to build and run the USSD gateway:

1. `bash scripits/ussd-build-run.sh`

The script will copy the `ussd/osmo-euse-demo.c` to `build/osmo-hlr/src/osmo-euse-demo.c` then build using make with an execution of the binary upon success.


