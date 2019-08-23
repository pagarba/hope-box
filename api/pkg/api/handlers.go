package api

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/pagarba/hope-box/api/pkg/data"
)

// Responder

func deleteResponder(c *gin.Context) {
	sid, ok := c.GetQuery("id")
	if !ok {
		replyError(c, errors.New("id is required"))
		return
	}

	id, err := strconv.ParseUint(sid, 10, 64)
	if err != nil {
		replyError(c, err)
		return
	}

	if err = data.DeleteByID(uint(id), &data.Responder{}); err != nil {
		replyError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

func getResponder(c *gin.Context) {
	vs := make([]data.Responder, 0)
	if err := data.Find(&vs); err != nil {
		replyError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"result": vs})
}

func postResponder(c *gin.Context) {
	v := new(data.Responder)
	if err := c.BindJSON(v); err != nil {
		replyError(c, err)
		return
	}

	if err := data.Create(v); err != nil {
		replyError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"result": v})
}

func putResponder(c *gin.Context) {
	v := new(data.Responder)
	if err := c.BindJSON(v); err != nil {
		replyError(c, err)
		return
	} else if v.ID == 0 {
		replyError(c, errors.New("cannot update id 0"))
		return
	}

	if err := data.Update(v); err != nil {
		replyError(c, err)
		return
	}

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
