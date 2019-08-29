#!/bin/bash

source $PWD/../scripts/functions.sh
set_category "BTS"

# Home
HOME=$PWD

# Version
LIMESUITE_V="v18.10.0"
OSMOTRX_V="1.0.0"

info "Starting BTS installation..." && \

if ! is_directory "build/"; then
  warn "Installing dependencies..." && \
  sudo apt-get install -y software-properties-common >/dev/null && \
  sudo apt-get update -y >/dev/null && \
  sudo apt-get install -y git g++ cmake gnuplot sqlite3 gnutls-dev libsqlite3-dev libdbd-sqlite3 libortp-dev libsctp-dev libdbi-dev libtalloc-dev libi2c-dev libusb-1.0-0-dev libpcsclite-dev libfftw3-dev libwxgtk3.0-dev freeglut3-dev libtool libtool-bin autoconf automake >/dev/null

  warn "Creating build directory..." && \
  mkdir -p build
else
  success "Build directory already created"
fi
cd build && \

if ! is_directory "SoapySDR/"; then
  warn "Creating SoapySDR directory..." && \
  git clone https://github.com/pothosware/SoapySDR.git >/dev/null
else
  success "SoapySDR directory already created"
fi
if ! is_file "SoapySDR/OK"; then
  warn "Compiling SoapySDR..." && \
  cd SoapySDR && \
  mkdir -p build && \
  cd build && \
  cmake .. >/dev/null && \
  make -j4 >/dev/null && \
  sudo make install >/dev/null && \
  sudo ldconfig >/dev/null && \
  cd .. && \
  touch OK && \
  cd ..
else
  success "SoapySDR already compiled"
fi

if ! is_directory "LimeSuite/"; then
  warn "Creating LimeSuite directory..." && \
  git clone https://github.com/myriadrf/LimeSuite.git >/dev/null
else
  success "LimeSuite directory already created"
fi
if ! is_file "LimeSuite/OK"; then
  warn "Compiling LimeSuite..." && \
  cd LimeSuite && \
  git checkout $LIMESUITE_V >/dev/null && \
  rm -fR buildir && \
  mkdir -p buildir && \
  cd buildir && \
  cmake ../ >/dev/null && \
  make -j4 >/dev/null && \
  sudo make install >/dev/null && \
  sudo ldconfig >/dev/null && \
  cd .. && \
  cd udev-rules && \
  sudo sh ./install.sh >/dev/null && \
  cd .. && \
  touch OK && \
  cd ..
else
  success "LimeSuite already compiled"
fi

if ! is_directory "libosmocore/"; then
  warn "Creating libosmocore directory..." && \
  git clone git://git.osmocom.org/libosmocore >/dev/null
else
  success "libosmocore directory already created"
fi
if ! is_file "libosmocore/OK"; then
  warn "Compiling libosmocore..." && \
  cd libosmocore && \
  autoreconf -i >/dev/null && \
  ./configure >/dev/null && \
  make -j4 >/dev/null && \
  sudo make install >/dev/null && \
  sudo ldconfig >/dev/null && \
  touch OK && \
  cd ..
else
  success "libosmocore already compiled"
fi

if ! is_directory "osmo-trx/"; then
  warn "Creating osmo-trx directory..." && \
  git clone https://git.osmocom.org/osmo-trx >/dev/null
else
  success "osmo-trx directory already created"
fi
if ! is_file "osmo-trx/OK"; then
  warn "Compiling osmo-trx..." && \
  cd osmo-trx && \
  git checkout $OSMOTRX_V && \
  autoreconf -i >/dev/null && \
  ./configure --with-lms --without-uhd >/dev/null && \
  make -j4 >/dev/null && \
  sudo make install >/dev/null && \
  sudo ldconfig >/dev/null && \
  touch OK && \
  cd ..
else
  success "osmo-trx already compiled"
fi

if ! is_directory "libosmo-abis/"; then
  warn "Creating libosmo-abis directory..." && \
  git clone git://git.osmocom.org/libosmo-abis >/dev/null
else
  success "libosmo-abis directory already created"
fi
if ! is_file "libosmo-abis/OK"; then
  warn "Compiling libosmo-abis..." && \
  cd libosmo-abis && \
  autoreconf -i >/dev/null && \
  ./configure >/dev/null && \
  make -j4 >/dev/null && \
  sudo make install >/dev/null && \
  sudo ldconfig >/dev/null && \
  touch OK && \
  cd ..
else
  success "libosmo-abis already compiled"
fi

if ! is_directory "libosmo-netif/"; then
  warn "Creating libosmo-netif directory..." && \
  git clone git://git.osmocom.org/libosmo-netif >/dev/null
else
  success "libosmo-netif directory already created"
fi
if ! is_file "libosmo-netif/OK"; then
  warn "Compiling libosmo-netif..." && \
  cd libosmo-netif && \
  autoreconf -i >/dev/null && \
  ./configure >/dev/null && \
  make -j4 >/dev/null && \
  sudo make install >/dev/null && \
  sudo ldconfig >/dev/null && \
  touch OK && \
  cd ..
else
  success "libosmo-netif already compiled"
fi

if ! is_directory "libosmo-sccp/"; then
  warn "Creating libosmo-sccp directory..." && \
  git clone git://git.osmocom.org/libosmo-sccp >/dev/null
else
  success "libosmo-sccp directory already created"
fi
if ! is_file "libosmo-sccp/OK"; then
  warn "Compiling libosmo-sccp..." && \
  cd libosmo-sccp && \
  autoreconf -i >/dev/null && \
  ./configure >/dev/null && \
  make -j4 >/dev/null && \
  sudo make install >/dev/null && \
  sudo ldconfig >/dev/null && \
  touch OK && \
  cd ..
else
  success "libosmo-sccp already compiled"
fi

if ! is_directory "libsmpp34/"; then
  warn "Creating libsmpp34 directory..." && \
  git clone git://git.osmocom.org/libsmpp34 >/dev/null
else
  success "libsmpp34 directory already created"
fi
if ! is_file "libsmpp34/OK"; then
  warn "Compiling libsmpp34..." && \
  cd libsmpp34 && \
  autoreconf -i >/dev/null && \
  ./configure >/dev/null && \
  make -j4 >/dev/null && \
  sudo make install >/dev/null && \
  sudo ldconfig >/dev/null && \
  touch OK && \
  cd ..
else
  success "libsmpp34 already compiled"
fi

if ! is_directory "osmo-mgw/"; then
  warn "Creating osmo-mgw directory..." && \
  git clone git://git.osmocom.org/osmo-mgw >/dev/null
else
  success "osmo-mgw directory already created"
fi
if ! is_file "osmo-mgw/OK"; then
  warn "Compiling osmo-mgw..." && \
  cd osmo-mgw && \
  autoreconf -i >/dev/null && \
  ./configure >/dev/null && \
  make -j4 >/dev/null && \
  sudo make install >/dev/null && \
  sudo ldconfig >/dev/null && \
  touch OK && \
  cd ..
else
  success "osmo-mgw already compiled"
fi

if ! is_directory "osmo-bsc/"; then
  warn "Creating osmo-bsc directory..." && \
  git clone git://git.osmocom.org/osmo-bsc >/dev/null
else
  success "osmo-bsc directory already created"
fi
if ! is_file "osmo-bsc/OK"; then
  warn "Compiling osmo-bsc..." && \
  cd osmo-bsc && \
  autoreconf -i >/dev/null && \
  ./configure >/dev/null && \
  make -j4 >/dev/null && \
  sudo make install >/dev/null && \
  sudo ldconfig >/dev/null && \
  touch OK && \
  cd ..
else
  success "osmo-bsc already compiled"
fi

if ! is_directory "osmo-hlr/"; then
  warn "Creating osmo-hlr directory..." && \
  git clone git://git.osmocom.org/osmo-hlr >/dev/null
else
  success "osmo-hlr directory already created"
fi
if ! is_file "osmo-hlr/OK"; then
  warn "Compiling osmo-hlr..." && \
  cd osmo-hlr && \
  autoreconf -i >/dev/null && \
  ./configure >/dev/null && \
  make -j4 >/dev/null && \
  sudo make install >/dev/null && \
  sudo ldconfig >/dev/null && \
  touch OK && \
  cd ..
else
  success "osmo-hlr already compiled"
fi

if ! is_directory "osmo-msc/"; then
  warn "Creating osmo-msc directory..." && \
  git clone git://git.osmocom.org/osmo-msc >/dev/null
else
  success "osmo-msc directory already created"
fi
if ! is_file "osmo-msc/OK"; then
  warn "Compiling osmo-msc..." && \
  cd osmo-msc && \
  autoreconf -i >/dev/null && \
  ./configure --enable-smpp >/dev/null && \
  make -j4 >/dev/null && \
  sudo make install >/dev/null && \
  sudo ldconfig >/dev/null && \
  touch OK && \
  cd ..
else
  success "osmo-msc already compiled"
fi

if ! is_directory "osmo-bts/"; then
  warn "Creating osmo-bts directory..." && \
  git clone git://git.osmocom.org/osmo-bts >/dev/null
else
  success "osmo-bts directory already created"
fi
if ! is_file "osmo-bts/OK"; then
  warn "Compiling osmo-bts..." && \
  cd osmo-bts && \
  autoreconf -i >/dev/null && \
  ./configure --enable-trx >/dev/null && \
  make -j4 >/dev/null && \
  sudo make install >/dev/null && \
  sudo ldconfig >/dev/null && \
  touch OK && \
  cd ..
else
  success "osmo-bts already compiled"
fi

info "Adding execute permission to scripts..." && \
cd $HOME && \
chmod +x scripts/*.sh && \

info "BTS installation complete"
