package models

import "go.mongodb.org/mongo-driver/bson/primitive"


type NoteBook struct {
	ID	primitive.ObjectID	`json:"_id,omitempty" bson:"_id,omitempty"`
	Title	string	`json:"title,omitempty" bson:"title,omitempty"`
	Pages []primitive.ObjectID	`json:"pages,omitempty" bson:"pages,omitempty"`
	OwnerID  primitive.ObjectID	`json:"ownerId,omitempty" bson:"ownerID,omitempty"`
	Url string	`json:"url,omitempty" bson:"url"`
	CreatedAt  primitive.DateTime	`json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	UpdatedAt  primitive.DateTime	`json:"updatedAt,omitempty" bson:"updatedAt,omitempty"`
}


