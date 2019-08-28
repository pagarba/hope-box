#!/bin/bash

GO_TAR="go1.12.9.linux-amd64.tar.gz"

echo "Installing API!" && \

if [ ! -d "/usr/local/go" ]; then
  echo "Installing Go..." && \
  wget "https://dl.google.com/go/$GO_TAR" && \
  sudo tar -C /usr/local -zxf $GO_TAR && \
  sudo echo "PATH=\$PATH:/usr/local/go/bin" >> /etc/profile && \
  mkdir -p ~/go/bin ~/go/src && \
  echo "GOPATH=\$HOME/go" >> ~/.profile && \
  sudo source /etc/profile && \
  source ~/.profile
fi

echo "Installing Go libraries..." && \
go get github.com/gin-contrib/cors && \
go get github.com/gin-gonic/gin && \
go get github.com/jinzhu/gorm && \
go get github.com/mattn/go-sqlite3 && \
go get github.com/spf13/viper && \

PYTHON=$(which python)
if [ -z "$PYTHON" ]; then
  echo "Installing Python..." && \
  sudo apt install -y python python-pip
fi

echo "Installing Python libraries..." && \
pip install requests && \

REDIS=$(which redis-server)
if [ -z "$REDIS" ]; then
  echo "Installing Redis..." && \
  sudo apt install -y redis-server && \
  sudo systemctl enable redis-server
fi

echo "Complete!"
