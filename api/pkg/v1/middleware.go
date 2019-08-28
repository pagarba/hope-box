package v1

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func middleware(r *gin.Engine) {
	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"*"},
		AllowMethods:  []string{"DELETE", "GET", "OPTIONS", "POST", "PUT"},
		AllowHeaders:  []string{"Accept", "Authorization", "Content-Type", "Origin"},
		ExposeHeaders: []string{"Content-Length"},
		//AllowCredentials: true,
		MaxAge: 1 * time.Hour,
	}))

	// Authorization
	r.Use(func(c *gin.Context) {
		h := c.GetHeader("Authorization")
		if h != "Bearer NONE" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		c.Next()
	})
}
