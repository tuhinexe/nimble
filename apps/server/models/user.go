package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)




type User struct {
	ID	primitive.ObjectID	`json:"_id,omitempty" bson:"_id,omitempty"`
	Name	string	`json:"username,omitempty" bson:"username,omitempty"`
	Email	string	`json:"email,omitempty" bson:"email,omitempty"`
	CreatedAt	time.Time	`json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt	time.Time	`json:"updated_at,omitempty" bson:"updated_at,omitempty"`
	LoginType	string	`json:"type,omitempty" bson:"type,omitempty"`
	ImageUrl 		string	`json:"image,omitempty" bson:"image,omitempty"`

}