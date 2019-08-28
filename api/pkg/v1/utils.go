package v1

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func getID(c *gin.Context) (id uint, err error) {
	var ok bool
	var sid string
	if sid, ok = c.GetQuery("id"); !ok {
		err = fmt.Errorf("query id missing")
		return
	}

	var uid uint64
	if uid, err = strconv.ParseUint(sid, 10, 64); err != nil {
		return
	}

	id = uint(uid)
	return
}

func replyError(c *gin.Context, err error) {
	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
}

func replyOK(c *gin.Context, json interface{}) {
	c.JSON(http.StatusOK, json)
}
