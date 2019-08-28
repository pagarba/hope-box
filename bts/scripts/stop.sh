#!/bin/bash

TERM="osmo"

echo "Running processes..."
ps aux | grep $TERM

echo "Killing processes..."
sudo pkill -f $TERM
