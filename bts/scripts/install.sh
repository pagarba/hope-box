#!/bin/bash

# Enable exit on any failure.
set -e

# Colors
NC='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'

# Home
HOME=$PWD

# Version
LIMESUITE_V="v18.10.0"
OSMOTRX_V="1.0.0"

echo -e "${GREEN}Installing dependencies...${NC}"
sudo apt-get install -y software-properties-common && \
sudo apt-get update -y && \
sudo apt-get install -y git g++ cmake gnuplot sqlite3 gnutls-dev libsqlite3-dev libdbd-sqlite3 libortp-dev libsctp-dev libdbi-dev libtalloc-dev libi2c-dev libusb-1.0-0-dev libpcsclite-dev libfftw3-dev libwxgtk3.0-dev freeglut3-dev autoconf automake

if [ ! -d "build/" ]; then
    echo -e "${YELLOW}Creating build directory...${NC}"
    mkdir -p build
fi
cd build

if [ ! -d "SoapySDR/" ]; then
    echo -e "${YELLOW}Creating SoapySDR directory...${NC}"
    git clone https://github.com/pothosware/SoapySDR.git
fi
if [ ! -f "SoapySDR/OK" ]; then
    echo -e "${YELLOW}Compiling SoapySDR...${NC}"
    cd SoapySDR && \
    mkdir -p build && \
    cd build && \
    cmake .. && \
    make -j4 && \
    sudo make install && \
    sudo ldconfig && \
    cd .. && \
    touch OK && \
    cd ..
fi

if [ ! -d "LimeSuite/" ]; then
    echo -e "${YELLOW}Creating LimeSuite directory...${NC}"
    git clone https://github.com/myriadrf/LimeSuite.git
fi
if [ ! -f "LimeSuite/OK" ]; then
    echo -e "${YELLOW}Compiling LimeSuite...${NC}"
    cd LimeSuite && \
    git checkout $LIMESUITE_V && \
    rm -fR buildir && \
    mkdir -p buildir && \
    cd buildir && \
    cmake ../ && \
    make -j4 && \
    sudo make install && \
    sudo ldconfig && \
    cd .. && \
    cd udev-rules && \
    sudo sh ./install.sh && \
    cd .. && \
    touch OK && \
    cd ..
fi

if [ ! -d "libosmocore/" ]; then
    echo -e "${YELLOW}Fetching libosmocore...${NC}"
    git clone git://git.osmocom.org/libosmocore
fi
if [ ! -f "libosmocore/OK" ]; then
    echo -e "${YELLOW}Compiling libosmocore...${NC}"
    cd libosmocore && \
    autoreconf -i && \
    ./configure && \
    make -j4 && \
    sudo make install && \
    sudo ldconfig && \
    touch OK && \
    cd ..
fi

if [ ! -d "osmo-trx/" ]; then
    echo -e "${YELLOW}Fetching osmo-trx...${NC}"
    git clone https://git.osmocom.org/osmo-trx
fi
if [ ! -f "osmo-trx/OK" ]; then
    echo -e "${YELLOW}Compiling osmo-trx...${NC}"
    cd osmo-trx && \
    #git checkout $OSMOTRX_V && \
    autoreconf -i && \
    ./configure --with-lms --without-uhd && \
    make -j4 && \
    sudo make install && \
    sudo ldconfig && \
    touch OK && \
    cd ..
fi

if [ ! -d "libosmo-abis/" ]; then
    echo -e "${YELLOW}Fetching libosmo-abis...${NC}"
    git clone git://git.osmocom.org/libosmo-abis
fi
if [ ! -f "libosmo-abis/OK" ]; then
    echo -e "${YELLOW}Compiling libosmo-abis...${NC}"
    cd libosmo-abis && \
    autoreconf -i && \
    ./configure && \
    make -j4 && \
    sudo make install && \
    sudo ldconfig && \
    touch OK && \
    cd ..
fi

if [ ! -d "libosmo-netif/" ]; then
    echo -e "${YELLOW}Fetching libosmo-netif...${NC}"
    git clone git://git.osmocom.org/libosmo-netif
fi
if [ ! -f "libosmo-netif/OK" ]; then
    echo -e "${YELLOW}Compiling libosmo-netif...${NC}"
    cd libosmo-netif && \
    autoreconf -i && \
    ./configure && \
    make -j4 && \
    sudo make install && \
    sudo ldconfig && \
    touch OK && \
    cd ..
fi

if [ ! -d "libosmo-sccp/" ]; then
    echo -e "${YELLOW}Fetching libosmo-sccp...${NC}"
    git clone git://git.osmocom.org/libosmo-sccp
fi
if [ ! -f "libosmo-sccp/OK" ]; then
    echo -e "${YELLOW}Compiling libosmo-sccp...${NC}"
    cd libosmo-sccp && \
    autoreconf -i && \
    ./configure && \
    make -j4 && \
    sudo make install && \
    sudo ldconfig && \
    touch OK && \
    cd ..
fi

if [ ! -d "libsmpp34/" ]; then
    echo -e "${YELLOW}Fetching libsmpp34...${NC}"
    git clone git://git.osmocom.org/libsmpp34
fi
if [ ! -f "libsmpp34/OK" ]; then
    echo -e "${YELLOW}Compiling libsmpp34...${NC}"
    cd libsmpp34 && \
    autoreconf -i && \
    ./configure && \
    make -j4 && \
    sudo make install && \
    sudo ldconfig && \
    touch OK && \
    cd ..
fi

if [ ! -d "osmo-mgw/" ]; then
    echo -e "${YELLOW}Fetching osmo-mgw...${NC}"
    git clone git://git.osmocom.org/osmo-mgw
fi
if [ ! -f "osmo-mgw/OK" ]; then
    echo -e "${YELLOW}Compiling osmo-mgw...${NC}"
    cd osmo-mgw && \
    autoreconf -i && \
    ./configure && \
    make -j4 && \
    sudo make install && \
    sudo ldconfig && \
    touch OK && \
    cd ..
fi

if [ ! -d "osmo-bsc/" ]; then
    echo -e "${YELLOW}Fetching osmo-bsc...${NC}"
    git clone git://git.osmocom.org/osmo-bsc
fi
if [ ! -f "osmo-bsc/OK" ]; then
    echo -e "${YELLOW}Compiling osmo-bsc...${NC}"
    cd osmo-bsc && \
    autoreconf -i && \
    ./configure && \
    make -j4 && \
    sudo make install && \
    sudo ldconfig && \
    touch OK && \
    cd ..
fi

if [ ! -d "osmo-hlr/" ]; then
    echo -e "${YELLOW}Fetching osmo-hlr...${NC}"
    git clone git://git.osmocom.org/osmo-hlr
fi
if [ ! -f "osmo-hlr/OK" ]; then
    echo -e "${YELLOW}Compiling osmo-hlr...${NC}"
    cd osmo-hlr && \
    autoreconf -i && \
    ./configure && \
    make -j4 && \
    sudo make install && \
    sudo ldconfig && \
    touch OK && \
    cd ..
fi

if [ ! -d "osmo-msc/" ]; then
    echo -e "${YELLOW}Fetching osmo-msc...${NC}"
    git clone git://git.osmocom.org/osmo-msc
fi
if [ ! -f "osmo-msc/OK" ]; then
    echo -e "${YELLOW}Compiling osmo-msc...${NC}"
    cd osmo-msc && \
    autoreconf -i && \
    ./configure --enable-smpp && \
    make -j4 && \
    sudo make install && \
    sudo ldconfig && \
    touch OK && \
    cd ..
fi

if [ ! -d "osmo-bts/" ]; then
    echo -e "${YELLOW}Fetching osmo-bts...${NC}"
    git clone git://git.osmocom.org/osmo-bts
fi
if [ ! -f "osmo-bts/OK" ]; then
    echo -e "${YELLOW}Compiling osmo-bts...${NC}"
    cd osmo-bts && \
    autoreconf -i && \
    ./configure --enable-trx && \
    make -j4 && \
    sudo make install && \
    sudo ldconfig && \
    touch OK && \
    cd ..
fi

echo -e "${YELLOW}Adding execute permission to scripts...${NC}"
cd $HOME
chmod +x scripts/*.sh

echo -e "${GREEN}Complete!${NC}"
