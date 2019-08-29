#!/bin/bash

source $PWD/../scripts/functions.sh
set_category "BTS:USSD"

SCRIPT="osmo-euse-demo"

info "Moving USSD demo gateway..." && \
cp -f ussd/osmo-euse-demo.c build/osmo-hlr/src/osmo-euse-demo.c && \

info "Building USSD demo gateway..." && \
cd build/osmo-hlr/src/ && \
make osmo-euse-demo >/dev.null && \

info "Running USSD demo gateway..." && \
./osmo-euse-demo && \

success "Complete!"
