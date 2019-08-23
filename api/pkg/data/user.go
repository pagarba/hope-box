package data

import "time"

type User struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	CreatedAt time.Time  `gorm:"" json:"createdAt"`
	DeletedAt *time.Time `gorm:"" json:"deletedAt"`
	UpdatedAt time.Time  `gorm:"" json:"updatedAt"`
	ESI       uint8      `gorm:"not null" json:"esi"`
	IMSI      string     `binding:"required" gorm:"unique_index" json:"imsi"`
	MSISDN    string     `binding:"required" gorm:"unique_index" json:"msisdn"`
	Name      string     `gorm:"unique;not null" json:"name"`
}
