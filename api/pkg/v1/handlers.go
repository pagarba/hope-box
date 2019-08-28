package v1

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/pagarba/hope-box/api/pkg/data"
)

// Responder

func deleteResponder(c *gin.Context) {
	id, err := getID(c)
	if err != nil {
		replyError(c, err)
		return
	}

	if err = data.DeleteByID(uint(id), &data.Responder{}); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"result": "OK"})
}

func getResponder(c *gin.Context) {
	vs := make([]data.Responder, 0)
	pag, err := getPagination(c, &vs)
	if err != nil {
		replyError(c, err)
		return
	}

	if err = data.Page(&vs, pag.Limit, pag.Skip); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"count": pag.Count, "result": vs})
}

func postResponder(c *gin.Context) {
	v := new(data.Responder)
	c.MustBindWith(v, binding.JSON)

	if err := data.Create(v); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"result": v})
}

func putResponder(c *gin.Context) {
	v := new(data.Responder)
	c.MustBindWith(v, binding.JSON)

	if err := data.Update(v); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"result": "OK"})
}

// Settings

func getSettings(c *gin.Context) {
	v := new(data.Settings)
	if err := data.GetByID(v, 1); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"result": v})
}

func putSettings(c *gin.Context) {
	v := new(data.Settings)
	c.MustBindWith(v, binding.JSON)

	v.ID = 1
	if err := data.Update(v); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"result": "OK"})
}

// SMS

func postSMS(c *gin.Context) {
	replyOK(c, gin.H{"result": "OK"})
}

// Station

func deleteStation(c *gin.Context) {
	id, err := getID(c)
	if err != nil {
		replyError(c, err)
		return
	}

	if err = data.DeleteByID(uint(id), &data.Station{}); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"result": "OK"})
}

func getStation(c *gin.Context) {
	vs := make([]data.Station, 0)
	pag, err := getPagination(c, &vs)
	if err != nil {
		replyError(c, err)
		return
	}

	if err = data.Page(&vs, pag.Limit, pag.Skip); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"count": pag.Count, "result": vs})
}

func postStation(c *gin.Context) {
	v := new(data.Station)
	c.MustBindWith(v, binding.JSON)

	if err := data.Create(v); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"result": v})
}

func putStation(c *gin.Context) {
	v := new(data.Station)
	c.MustBindWith(v, binding.JSON)

	if err := data.Update(v); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"result": "OK"})
}

// User

func deleteUser(c *gin.Context) {
	id, err := getID(c)
	if err != nil {
		replyError(c, err)
		return
	}

	if err = data.DeleteByID(uint(id), &data.User{}); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"result": "OK"})
}

func getUser(c *gin.Context) {
	vs := make([]data.User, 0)
	pag, err := getPagination(c, &vs)
	if err != nil {
		replyError(c, err)
		return
	}

	if err = data.Page(&vs, pag.Limit, pag.Skip); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"count": pag.Count, "result": vs})
}

func postUser(c *gin.Context) {
	v := new(data.User)
	c.MustBindWith(v, binding.JSON)

	if err := data.Create(v); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"result": v})
}

func putUser(c *gin.Context) {
	v := new(data.User)
	c.MustBindWith(v, binding.JSON)

	if err := data.Update(v); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"result": "OK"})
}

func putUserESI(c *gin.Context) {
	v := new(data.User)
	c.MustBindWith(v, binding.JSON)

	if err := data.UpdateUserESI(v.IMSI, v.ESI); err != nil {
		replyError(c, err)
		return
	}

	replyOK(c, gin.H{"result": "OK"})
}

// USSD

func postUSSD(c *gin.Context) {
	replyOK(c, gin.H{"result": "OK"})
}
