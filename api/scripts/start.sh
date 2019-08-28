#!/bin/bash

echo "Starting API..." && \
go run cmd/hopebox-api/main.go && \
echo "Complete!"
