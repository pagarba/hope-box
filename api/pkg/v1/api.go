package v1

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

var r *gin.Engine

func Run(host string, port uint16, path string) (err error) {
	addr := fmt.Sprintf("%s:%d", host, port)
	r = gin.Default()

	// Static file routes from website.
	r.StaticFile("/bundle.js", fmt.Sprintf("%s/bundle.js", path))
	r.StaticFS("/images", http.Dir(fmt.Sprintf("%s/images", path)))
	r.StaticFile("/", fmt.Sprintf("%s/index.html", path))

	middleware(r)
	routes(r)

	err = r.Run(addr)
	return
}
