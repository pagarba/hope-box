package data

import "time"

type User struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	CreatedAt time.Time  `gorm:"" json:"createdAt"`
	DeletedAt *time.Time `gorm:"" json:"deletedAt"`
	UpdatedAt time.Time  `gorm:"" json:"updatedAt"`
	BTS       string     `gorm:"" json:"bts"`
	ESI       string     `gorm:"not null" json:"esi"`
	IMSI      string     `binding:"required" gorm:"unique_index" json:"imsi"`
	Latitude  string     `gorm:"" json:"latitude"`
	Longitude string     `gorm:"" json:"longitude"`
	MSISDN    string     `binding:"required" gorm:"unique_index" json:"msisdn"`
	Name      string     `gorm:"unique;not null" json:"name"`
}
