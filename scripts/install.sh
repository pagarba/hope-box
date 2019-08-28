#!/bin/bash

source $PWD/scripts/functions.sh

info "Install required API software..." && \
cd api/ && \
bash scripts/install.sh && \

info "Install required BTS software..." && \
cd ../bts/ && \
bash scripts/install.sh && \

info "Install required CC software..." && \
cd ../cc/ && \
bash scripts/install.sh && \

info "Install required WEB software..." && \
cd ../web/ && \
bash scripts/install.sh && \

success "Complete!"
