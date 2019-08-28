#!/bin/bash

source $PWD/../scripts/functions.sh

info "Installing NPM libraries..." && \
npm install && \

info "Building WEB..." && \
npm run build && \

success "Complete!"
