package data

import "time"

type Settings struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	CreatedAt time.Time  `gorm:"" json:"createdAt"`
	DeletedAt *time.Time `gorm:"" json:"deletedAt"`
	UpdatedAt time.Time  `gorm:"" json:"updatedAt"`
	Latitude  string     `gorm:"" json:"latitude"`
	Longitude string     `gorm:"" json:"longitude"`
	SSID      string     `gorm:"" json:"ssid"`
	PSK       string     `gorm:"" json:"psk"`
}
