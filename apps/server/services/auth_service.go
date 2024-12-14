package services

import (
	"context"
	"errors"
	"log"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/tuhinexe/nimble/apps/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	UserCollection *mongo.Collection
	RedisClient	*redis.Client
}


func (s *AuthService) Signup(ctx context.Context, user models.User, method string) (*models.User, error) {

	filter := bson.M{"email": user.Email}
	var existingUser models.User
	err := s.UserCollection.FindOne(ctx, filter).Decode(&existingUser)
	if err == nil {
		log.Println("User already exists")
		return nil, errors.New("user already exists")
	}

	
	if method == "credentials" {
		
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			return nil, errors.New("failed to hash password")
		}
		user.Password = string(hashedPassword)
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
