package services

import (
	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)




type AuthService struct {
	mongoClient *mongo.Client
	redisClient *redis.Client
}

func NewAuthService(mongoClient *mongo.Client, redisClient *redis.Client) *AuthService {
	return &AuthService{
		mongoClient: mongoClient,
		redisClient: redisClient,
	}
}


func (s *AuthService) SignUp(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "SignUp",
	})
}