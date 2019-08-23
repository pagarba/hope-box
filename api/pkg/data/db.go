package data

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB

func Close() (err error) {
	err = db.Close()
	return
}

func Create(v interface{}) {
	db.Create(v)
}

func Delete(v interface{}) {
	db.Delete(v)
}

func DeleteByID(id uint, v interface{}) {
	db.Where("id == ?", id).Delete(v)
}

func Find(v interface{}) {
	db.Find(v)
}

func Open(path string) (err error) {
	if db, err = gorm.Open("sqlite3", path); err != nil {
		return
	}

	db.AutoMigrate(&Responder{})
	return
}

func Update(v interface{}) {
	db.Save(v)
}
