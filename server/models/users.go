package models

type Users struct {
	Id          uint   `gorm:"primaryKey;autoIncrement;unique;not null:true" json:"id"`
	User        string `gorm:"unique;not null:true" json:"user"`
	Pass        string `gorm:"not null:true;size:60" json:"pass"`
	Totp_secret string `gorm:"not null:true" json:"totp_secret"`
	Name        string `gorm:"not null:true" json:"name"`
	Surname     string `gorm:"not null:true" json:"surname"`
	Status      string `gorm:"not null:true" json:"status"`
	Rank        string `gorm:"not null:true" json:"rank"`
}
