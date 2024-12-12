package models

import "go.mongodb.org/mongo-driver/bson/primitive"




type User struct {
	ID	primitive.ObjectID	`json:"_id,omitempty" bson:"_id,omitempty"`
	Username	string	`json:"username,omitempty" bson:"username,omitempty"`
	Gmail	string	`json:"gmail,omitempty" bson:"gmail,omitempty"`
	Timezone  string	`json:"timezone,omitempty" bson:"timezone"`

}