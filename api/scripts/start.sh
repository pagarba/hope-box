#!/bin/bash

source $PWD/../scripts/functions.sh
set_category "API"

info "Starting API..." && \
go run cmd/hopebox-api/main.go && \
success "Complete!"
