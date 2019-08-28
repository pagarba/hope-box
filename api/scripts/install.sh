#!/bin/bash

source $PWD/../scripts/functions.sh

GO_TAR="go1.12.9.linux-amd64.tar.gz"

if [ ! -d "/usr/local/go" ]; then
  info "Installing Go..." && \
  if [ ! -f "$GO_TAR" ]; then
    wget "https://dl.google.com/go/$GO_TAR"
  fi
  sudo tar -C /usr/local -zxf $GO_TAR && \
  sudo echo "GOROOT=/usr/local/go" >> /etc/profile && \
  sudo echo "PATH=\$PATH:\$GOROOT/bin" >> /etc/profile && \
  mkdir -p ~/go/bin ~/go/src && \
  echo "GOPATH=\$HOME/go" >> ~/.profile && \
  sudo source /etc/profile && \
  source ~/.profile
fi

info "Installing Go libraries..." && \
#go get github.com/gin-contrib/cors && \
#go get github.com/gin-gonic/gin && \
#go get github.com/jinzhu/gorm && \
#go get github.com/mattn/go-sqlite3 && \
#go get github.com/spf13/viper && \
go mod download && \

PYTHON=$(which python)
if [ -z "$PYTHON" ]; then
  info "Installing Python..." && \
  sudo apt install -y python python-pip
fi

info "Installing Python libraries..." && \
pip install requests && \

REDIS=$(which redis-server)
if [ -z "$REDIS" ]; then
  info "Installing Redis..." && \
  sudo apt install -y redis-server && \
  sudo systemctl enable redis-server
fi

success "Done"
