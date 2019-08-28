#!/bin/bash

echo "Installing NPM libraries..." && \
npm install && \

echo "Building WEB..." && \
npm run build && \

echo "Complete!"
