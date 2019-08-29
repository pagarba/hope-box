# HopeBox - Arduino

## Outline

Please review the system outline and look at the source code for more detail information.

### Hardware

The following hardware library and platform code is included in the system.

* `hardware/espressif` - engineering and manufacturing of IoT hardware.
  - `ESP32` - popular micro-controller capable of wireless that is faster and provides more space than most common Arduino platforms.

### Libraries

A brief explanation is provided about the libraries used in the system.

* `libraries/Emergency` - provides the LoRa mesh-network protocol interface.
  - `BTS` - the base transceiver station module interface.
  - `CC` - the command center module interface.
  - `Config` - configuration values for the modules.
  - `Emergency` - static values defined in a namespace.
  - `LoRaMesh` - handles the mesh protocol for the LoRa network.
* `libraries/LoRa` - interfaces with the LoRa chip by `Sandeep Mistry`.
  - `LoRa` - stream like interface to interact with the RFM95 chip.


### Sketches

Build-able and uploadable code for the LoRa modules attached to the Raspberry Pi or other platforms.

* `sketches/bts` - sketch for the base transceiver station LoRa module.
* `sketches/cc` - sketch for the command center LoRa module.

## Configuration 

To configure the IDE please update the following sections as described below.  These instructions assume version 1.8.9 is installed on the development system.

1. Open Arduino IDE and go to `File -> Preferences` in the menu.

2. Change `Sketchbook location` to point to `${PROJECT_FOLDER}/arduino` replacing `${PROJECT_FOLDER}` with the full path of the cloned project folder.

3. Now click on `preferences.txt` link at the bottom under `More preferences can be edited directly in this file`.  It should open the containing folder.

4. Click `OK` in the `Preferences` menu and then close the IDE.

5.   Opent the `preferences.txt` file and change `last.ide.1.8.9.hardwarepath` to be `last.ide.1.8.9.hardwarepath=${PROJECT_FOLDER}/arduino/hardware` replacing `${PROJECT_FOLDER}` with the full path of the cloned project folder.

6. Save the `preferences.txt` file and open the IDE again.

The IDE should now point to the project folder arduino folder with needed libraries and hardware information already installed.
