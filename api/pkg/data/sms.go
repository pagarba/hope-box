package data

import "time"

type SMS struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	CreatedAt time.Time  `gorm:"" json:"createdAt"`
	DeletedAt *time.Time `gorm:"" json:"deletedAt"`
	UpdatedAt time.Time  `gorm:"" json:"updatedAt"`
	Message   string     `gorm:"required" json:"message"`
	Responder Responder  `gorm:"" json:"responder"`
	User      User       `gorm:"required" json:"user"`
}
