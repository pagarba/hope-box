#!/bin/bash

GO_TAR="go1.12.9.linux-amd64.tar.gz"

echo "Installing HopeBox!" && \

echo "Installing Go..." && \
wget "https://dl.google.com/go/$GO_TAR" && \
tar -C /usr/local -zxf $GO_TAR && \
sudo echo "PATH=\$PATH:/usr/local/go/bin" >> /etc/profile && \
mkdir -p ~/go/bin ~/go/src && \
echo "GOPATH=\$HOME/go" >> ~/.profile && \
source /etc/profile && \
source ~/.profile && \

echo "Installing Go libraries..." && \
go get github.com/gin-contrib/cors && \
go get github.com/gin-gonic/gin && \
go get github.com/jinzhu/gorm && \
go get github.com/mattn/go-sqlite3 && \
go get github.com/spf13/viper && \

echo "Installing Redis..." && \
sudo apt install -y redis-server && \
sudo systemctl enable redis-server && \

echo "Done!"
