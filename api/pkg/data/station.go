package data

import "time"

type Station struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	CreatedAt time.Time  `gorm:"" json:"createdAt"`
	DeletedAt *time.Time `gorm:"" json:"deletedAt"`
	UpdatedAt time.Time  `gorm:"" json:"updatedAt"`
	Latitude  string     `gorm:"" json:"latitude"`
	Longitude string     `gorm:"" json:"longitude"`
	Name      string     `gorm:"unique;not null" json:"name"`
}
