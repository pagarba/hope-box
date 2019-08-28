package v1

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

var r *gin.Engine

func Run(host string, port uint16, path string) (err error) {
	addr := fmt.Sprintf("%s:%d", host, port)
	r = gin.Default()

	middleware(r)
	routes(r, path)

	err = r.Run(addr)
	return
}
