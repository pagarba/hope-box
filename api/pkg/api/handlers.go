package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pagarba/hope-box/api/pkg/data"
)

// Responder

func deleteResponder(c *gin.Context) {
	data.DeleteByID(c.MustGet("id").(uint), &data.Responder{})
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

func getResponder(c *gin.Context) {
	vs := make([]data.Responder, 0)
	data.Find(&vs)
	c.JSON(http.StatusOK, gin.H{"result": vs})
}

func postResponder(c *gin.Context) {
	v := new(data.Responder)
	if err := c.BindJSON(v); err != nil {
		replyError(c, err)
		return
	}

	data.Create(v)
	c.JSON(http.StatusOK, gin.H{"result": v})
}

func putResponder(c *gin.Context) {
	v := new(data.Responder)
	if err := c.BindJSON(v); err != nil {
		replyError(c, err)
		return
	}

	data.Update(v)
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

// Settings

func getSettings(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

func putSettings(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

// SMS

func postSMS(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

// Station

func deleteStation(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

func getStation(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

func postStation(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

func putStation(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

// User

func deleteUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

func getUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

func postUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

func putUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

// USSD

func postUSSD(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}
