package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func replyError(c *gin.Context, err error) {
	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
}

func replyOK(c *gin.Context, result interface{}) {
	c.JSON(http.StatusOK, gin.H{"result": result})
}
