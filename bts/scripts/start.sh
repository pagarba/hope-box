#!/bin/bash

source $PWD/../scripts/functions.sh

info "Starting daemons..."
cd bts

info "Starting osmo-hlr..."
sudo osmo-hlr -c configs/osmo/osmo-hlr.cfg -D

info "Starting osmo-msc..."
sudo osmo-msc -c configs/osmo/osmo-msc.cfg -D

info "Starting osmo-stp..."
sudo osmo-stp -c configs/osmo/osmo-stp.cfg -D

#info "Starting osmo-mgw..."
#sudo osmo-mgw -c configs/osmo/osmo-mgw.cfg -D

info "Starting osmo-bsc..."
sudo osmo-bsc -c configs/osmo/osmo-bsc.cfg -D

info "Starting osmo-bts-trx..."
sudo osmo-bts-trx -c configs/osmo/osmo-bts-trx.cfg -D

info "Starting osmo-trx-lms..."
sudo osmo-trx-lms -C configs/osmo/osmo-trx-lms.cfg

success "Complete!"
