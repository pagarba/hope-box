#!/bin/bash

#set -e
#set -t
#set -x

# Colors
NC='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'

function error {
  echo -e "${RED}${1}${NC}"
}

function info {
  echo -e "${YELLOW}${1}${NC}"
}

function is_directory {
  if [ -d "$1" ]; then
    true
  else
    false
  fi
}

function is_file {
  if [ -f "$1" ]; then
    true
  else
    false
  fi
}

function success {
  echo -e "${GREEN}${1}${NC}"
}

function quit {
  exit
}
