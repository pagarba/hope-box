#!/bin/bash

SCRIPT="osmo-euse-demo"

echo "Moving USSD demo gateway..." && \
cp -f ussd/osmo-euse-demo.c build/osmo-hlr/src/osmo-euse-demo.c && \

echo "Building USSD demo gateway..." && \
cd build/osmo-hlr/src/ && \
make osmo-euse-demo && \

echo "Running USSD demo gateway..." && \
./osmo-euse-demo
