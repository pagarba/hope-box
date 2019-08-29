#!/bin/bash

#set -e
#set -t
#set -x

BOLD='\033[1m'
CATEGORY="GLOBAL"
GREEN='\033[0;32m'
NC='\033[0m'
RED='\033[0;31m'
YELLOW='\033[1;33m'

function error {
  echo -e "${RED}${CATEGORY}: ${1}${NC}"
}

function info {
  echo -e "${BOLD}${CATEGORY}: ${1}${NC}"
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

function quit {
  exit
}

function set_category {
  CATEGORY=$1
}

function success {
  echo -e "${GREEN}${CATEGORY}: ${1}${NC}"
}

function warn {
  echo -e "${YELLOW}${CATEGORY}: ${1}${NC}"
}
