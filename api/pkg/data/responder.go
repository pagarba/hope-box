package data

import "time"

type Responder struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	CreatedAt time.Time  `gorm:"" json:"createdAt"`
	DeletedAt *time.Time `gorm:"" json:"deletedAt"`
	UpdatedAt time.Time  `gorm:"" json:"updatedAt"`
	IMSI      string     `gorm:"unique_index" json:"imsi"`
	MSISDN    string     `gorm:"unique_index" json:"msisdn"`
	Name      string     `gorm:"unique;not null" json:"name"`
}
