package config

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)





func InitMongoDB() (*mongo.Client,error) {
	fmt.Println("Connecting to MongoDB...")
	clientOptions := options.Client().ApplyURI(AppConfig.MongoURI)
	client , err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		return nil,err
	}

	err = client.Ping(context.TODO(), nil)

	if err != nil {
		return nil, err
	}
	fmt.Println("Connected to MongoDB!")

	return client,nil


}
