#!/bin/bash

source $PWD/../scripts/functions.sh
set_category "WEB"

NODE=$(which node)
if [ -z "$NODE" ]; then
  warn "Installing Node..." && \
  sudo apt-get install -y nodejs npm >/dev/null
else
  success "Node already installed"
fi

info "Installing NPM libraries..." && \
npm install >/dev/null && \

info "Building WEB..." && \
npm run build >/dev/null && \

success "Complete!"
