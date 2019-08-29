# HopeBox

#### This repository is under heavy development and may contain breaking changes.

## Table of Contents

* [Overview](#overview)
* [Current Features](#current-features)
* [Future Ideas](#future-ideas)
* [About Us](#about-us)

### Modules:

* [API](api/README.md)
* [Arduino](arduino/README.md)
* [Base Transceiver Station](bts/README.md)
* [Command Center](cc/README.md)
* [Supporting Documents](docs/README.md)
* [Examples](examples/README.md)
* [Bash Scripts](scripts/README.md)
* [Website](web/README.md)

## Overview

The `HopeBox` provides a new way of gathering information for first responders during an emergency.  

Watch a video introduction on YouTube at [https://youtu.be/J2ShlnsDs5A](https://youtu.be/J2ShlnsDs5A).

By using cellular technology `HopeBox` provides a way to automatically connect to mobile devices which initiate a questionnaire to quickly gather emergency severity information from people and open up communication on the cellular network with first responders.

The prototype has several limitations that can easily be expanded upon to provide better performance.  Ideally telecommunications providers would provide the hardware and allow for the `HopeBox` information gathering software platforms to integrate during emergencies.  

[Table of Contents](#table-of-contents)


## Current Features

The following a basic outline of the current implemented features in the `HopeBox`.

* Provide a simple cellular network that roaming mobile devices can connect to, even automatically, that will provide a source of communication when all connects are down.
  - `2G & 3G` connections provided at a minimum for mobile devices to connect on.
  - Frequencies and other settings can be configured to work with local requirements all over the world.
  - `USSD` protocol used for `ESI` questionnaire that is initiated by calling `*911#` on a connected mobile device.
  - The network will assign connected mobile devices to allow for voice communication if pursued.
* Collect `Emergency Severity Index (ESI)` information for first responders and transmit over a LoRa mesh-network to the `CC`.
  - For more information please checkout the [USSD Gateway](bts/ussd/) documentation.


## Future Ideas

There are several ideas that can be accomplished with the `HopeBox` and below is some of them that have been discussed amongst the `Pagarba` team.

* Attach the `HopeBox` to ariel devices that can reach places better that have signals obstructed.
* Connect `SMS` with `AI` powered `Chatbot` and other medical information services.
* Provide internal blockchain powered consensus between multiple `BTS`.
* Implement a control protocol to change `BTS` settings in real-time.
* In progress, more to come...


## About Us

![Pagarba Logo](https://secureservercdn.net/50.62.88.95/138.e03.myftpupload.com/wp-content/themes/twentyseventeen/pagarba/static/images/pagarba-logo-original.svg?sanitize=true)

Pagarba is a global strategy and engineering consulting firm focused on creating products and solutions that enable digital transformation within blockchain, IoT, Artificial Intelligence, software defined radio, analytics, cloud, and cyber security for our customers.

Beyond victory, happiness is also achieved with the adoption of a new era of mobile emergency services inspired by the `HopeBox`.

For more information please view the website [https://pagarba.io](https://pagarba.io).
