#!/bin/bash

# Colors
NC='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'

echo -e "${GREEN}Starting daemons...${NC}"
cd bts

echo -e "${YELLOW}Starting osmo-hlr...${NC}"
sudo osmo-hlr -c configs/simple/osmo-hlr.cfg -D

echo -e "${YELLOW}Starting osmo-msc...${NC}"
sudo osmo-msc -c configs/simple/osmo-msc.cfg -D

echo -e "${YELLOW}Starting osmo-stp...${NC}"
sudo osmo-stp -c configs/simple/osmo-stp.cfg -D

echo -e "${YELLOW}Starting osmo-mgw...${NC}"
sudo osmo-mgw -c configs/simple/osmo-mgw.cfg -D

echo -e "${YELLOW}Starting osmo-bsc...${NC}"
sudo osmo-bsc -c configs/simple/osmo-bsc.cfg -D

echo -e "${YELLOW}Starting osmo-bts-trx...${NC}"
sudo osmo-bts-trx -c configs/simple/osmo-bts-trx.cfg -D

echo -e "${YELLOW}Starting osmo-trx-lms...${NC}"
sudo osmo-trx-lms -C configs/simple/osmo-trx-lms.cfg

echo -e "${GREEN}Complete!${NC}"
