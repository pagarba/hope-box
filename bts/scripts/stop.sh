#!/bin/bash

source $PWD/../scripts/functions.sh
set_category "BTS"

TERM="osmo"

info "Stopping processes..." && \

info "Currently running processes..." && \
ps aux | grep $TERM && \

info "Killing matching processes..." && \
sudo pkill -f $TERM && \

success "Complete!"
