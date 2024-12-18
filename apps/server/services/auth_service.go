package services

import (
	"context"
	"errors"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/tuhinexe/nimble/apps/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type AuthService struct {
	UserCollection *mongo.Collection
	RedisClient	*redis.Client
}


func (s *AuthService) Signup(ctx context.Context, user models.User, method string) (*models.User, error) {

	if method == "google" {
	filter := bson.M{"email": user.Email}
	var existingUser models.User
	// if the user already exists, return the user or create a new user
	err := s.UserCollection.FindOne(ctx, filter).Decode(&existingUser)
	if err == nil {
		return &existingUser, nil
	}	
	}

	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()


	res, err := s.UserCollection.InsertOne(ctx, user)
	if err != nil {
		return nil, errors.New("failed to create user")
	}

	
	user.ID = res.InsertedID.(primitive.ObjectID)

	return &user, nil
}
