package v1

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/pagarba/hope-box/api/pkg/data"
)

type Pagination struct {
	Count uint `form:"count" json:"count"`
	Limit uint `form:"limit" json:"limit"`
	Skip  uint `form:"skip" json:"skip"`
}

func getLimitSkip(c *gin.Context) (limit, skip uint, err error) {
	slimit := c.Query("limit")
	if slimit == "" {
		limit = 10
	} else {
		var ulimit uint64
		if ulimit, err = strconv.ParseUint(slimit, 10, 64); err != nil {
			return
		}
		limit = uint(ulimit)
	}

	sskip := c.Query("skip")
	if sskip == "" {
		skip = 0
	} else {
		var uskip uint64
		if uskip, err = strconv.ParseUint(sskip, 10, 64); err != nil {
			return
		}
		skip = uint(uskip)
	}
	return
}

func getPagination(c *gin.Context, model interface{}) (p *Pagination, err error) {
	var count, limit, skip uint
	if err = data.Count(model, &count); err != nil {
		return
	}
	if limit, skip, err = getLimitSkip(c); err != nil {
		return
	}

	p = &Pagination{
		Count: count,
		Limit: limit,
		Skip:  skip,
	}
	return
}
