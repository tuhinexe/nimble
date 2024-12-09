package models

import "go.mongodb.org/mongo-driver/bson/primitive"


type Page struct {
	ID	primitive.ObjectID	`json:"_id,omitempty" bson:"_id,omitempty"`
	Title	string	`json:"title,omitempty" bson:"title,omitempty"`
	Content	string	`json:"content,omitempty" bson:"content,omitempty"`
}