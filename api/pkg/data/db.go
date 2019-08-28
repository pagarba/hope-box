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

func Create(v interface{}) (err error) {
	db.Create(v)
	err = Error()
	return
}

func Count(v, count interface{}) (err error) {
	db.Find(v).Count(count)
	err = Error()
	return
}

func Delete(v interface{}) (err error) {
	db.Delete(v)
	err = Error()
	return
}

func DeleteByID(id uint, v interface{}) (err error) {
	db.Where("id == ?", id).Delete(v)
	err = Error()
	return
}

func Error() (err error) {
	errs := Errors()
	if len(errs) > 0 {
		err = errs[0]
	}
	return
}

func Errors() (errs []error) {
	errs = db.GetErrors()
	return
}

func Find(v interface{}) (err error) {
	db.Find(v)
	err = Error()
	return
}

func GetByID(v interface{}, id uint) (err error) {
	db.Where("id = ?", id).First(v)
	err = Error()
	return
}

func Open(path string) (err error) {
	if db, err = gorm.Open("sqlite3", path); err != nil {
		return
	}

	db.AutoMigrate(&Responder{})
	return
}

func Page(v interface{}, limit, offset uint) (err error) {
	db.Limit(limit).Offset(offset).Find(v)
	err = Error()
	return
}

func Update(v interface{}) (err error) {
	db.Save(v)
	err = Error()
	return
}
