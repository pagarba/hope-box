package api

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func routes(r *gin.Engine, path string) {
	// Responder
	r.DELETE("/responder", deleteResponder)
	r.GET("/responder", getResponder)
	r.POST("/responder", postResponder)
	r.PUT("/responder", putResponder)
	// Settings
	r.GET("/settings", getSettings)
	r.PUT("/settings", putSettings)
	// SMS
	r.POST("/sms", postSMS)
	// Station
	r.DELETE("/station", deleteStation)
	r.GET("/station", getStation)
	r.POST("/station", postStation)
	r.PUT("/station", putStation)
	// User
	r.DELETE("/user", deleteUser)
	r.GET("/user", getUser)
	r.POST("/user", postUser)
	r.PUT("/user", putUser)
	// USSD
	r.POST("/ussd", postUSSD)

	// Static file routes from website.
	r.StaticFile("/bundle.js", fmt.Sprintf("%s/bundle.js", path))
	r.StaticFile("/", fmt.Sprintf("%s/index.html", path))
}
