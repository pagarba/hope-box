#!/bin/bash

echo "Install required BTS software..." && \
cd bts/ && \
bash scripts/install.sh && \

echo "Install required CC software..." && \
cd ../cc/ && \
bash scripts/install.sh
