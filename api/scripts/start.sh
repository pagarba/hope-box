#!/bin/bash

source $PWD/../scripts/functions.sh

info "Starting API..." && \
go run cmd/hopebox-api/main.go && \
success "Complete!"
