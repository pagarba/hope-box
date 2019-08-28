package main

import (
	"flag"
	"fmt"
	"log"

	"github.com/pagarba/hope-box/api/pkg/data"
	v1 "github.com/pagarba/hope-box/api/pkg/v1"
	"github.com/spf13/viper"
)

func main() {
	fconfig := flag.String("config", "development", "configuration file in configs folder")
	fwebsite := flag.String("website", "../web/dist", "location of website public folder")
	flag.Parse()

	// Configuration
	viper.AddConfigPath("configs")
	viper.SetConfigName(*fconfig)
	if err := viper.ReadInConfig(); err != nil {
		log.Fatal(err)
	}
	fmt.Println("HopeBox API", *fconfig)

	// Database
	if err := data.Open("hope.db"); err != nil {
		log.Fatal(err)
	}
	defer data.Close()

	// API
	ip := viper.GetString("ip")
	port := uint16(viper.GetUint("port"))
	if err := v1.Run(ip, port, *fwebsite); err != nil {
		log.Fatal(err)
	}
}
