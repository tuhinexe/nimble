package middleware

import (
	"context"
	"fmt"

	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
	"github.com/tuhinexe/nimble/apps/server/config"
)



func ValidateSession(c *fiber.Ctx) error {
	sessionID := c.Cookies("session_id")
	// fmt.Println("This is session" +sessionID)
	if sessionID == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "unauthorized"})
	}

	userID, err := config.RedisClient.Get(context.Background(), sessionID).Result()
	if err == redis.Nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Session expired"})
	}

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to validate session"})
	}

	c.Locals("user_id", userID)
	fmt.Print("This is session" + userID)
	return c.Next()
}