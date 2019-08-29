#!/bin/bash

source $PWD/../scripts/functions.sh
set_category "BTS"

info "Removing build indicators..."

rm -f build/libosmo-abis/OK
rm -f build/libosmo-netif/OK
rm -f build/libosmo-sccp/OK
rm -f build/libosmocore/OK
rm -f build/libsmpp23/OK
rm -f build/LimeSuite/OK
rm -f build/osmo-bsc/OK
rm -f build/osmo-bts/OK
rm -f build/osmo-hlr/OK
rm -f build/osmo-mgw/OK
rm -f build/osmo-msc/OK
rm -f build/osmo-trx/OK
rm -f build/SoapySDR/OK

success "Complete!"
