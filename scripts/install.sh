#!/bin/bash

source $PWD/scripts/functions.sh

set_category "GLOBAL" && \
info "Starting full installation..." && \

info "Install required API software..." && \
cd api/ && \
bash scripts/install.sh && \

set_category "GLOBAL" && \
info "Install required BTS software..." && \
cd ../bts/ && \
bash scripts/install.sh && \

set_category "GLOBAL" && \
info "Install required CC software..." && \
cd ../cc/ && \
bash scripts/install.sh && \

set_category "GLOBAL" && \
info "Install required WEB software..." && \
cd ../web/ && \
bash scripts/install.sh && \

set_category "GLOBAL" && \
success "Full installation complete!"
