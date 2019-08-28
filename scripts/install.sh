#!/bin/bash

set -x

echo "Install required API software..." && \
cd api/ && \
bash scripts/install.sh && \

echo "Install required BTS software..." && \
cd ../bts/ && \
bash scripts/install.sh && \

echo "Install required CC software..." && \
cd ../cc/ && \
bash scripts/install.sh && \

echo "Install required WEB software..." && \
cd ../web/ && \
bash scripts/install.sh && \

echo "Complete!"
