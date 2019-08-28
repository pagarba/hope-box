#!/bin/bash

source $PWD/../scripts/functions.sh

info "Installing NPM libraries..." && \
npm install >/dev/null && \

info "Building WEB..." && \
npm run build >/dev/null && \

success "Complete!"
