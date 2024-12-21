package api

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/tuhinexe/nimble/apps/server/models"
	"github.com/tuhinexe/nimble/apps/server/services"
)

type AuthAPI struct {
	AuthService *services.AuthService
}


func (api *AuthAPI) SignUpHandler(c *fiber.Ctx) error {

	var req struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password,omitempty"`
		Image    string `json:"image,omitempty"`
		Method   string `json:"method"` 
	}
	if err := c.BodyParser(&req); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"message": "invalid request"})
	}


	if req.Method == "credentials signup" && (req.Email == "" || req.Password == "") {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"message": "email and password are required"})
	}
	if req.Method == "google" && req.Email == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"message": "email is required for Google signup"})
	}
	if req.Image == "" {
		req.Image = "https://ui-avatars.com/api/?name="+req.Name+"&size=512"
	}

	
	user := models.User{
		Name:     req.Name,
		Email:    req.Email,
		ImageUrl:    req.Image,
	}
	createdUser, err := api.AuthService.Signup(context.Background(), user, req.Method)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"message": err.Error()})
	}

	sessionID := uuid.NewString()

	err = api.AuthService.RedisClient.Set(context.Background(), sessionID, createdUser.ID.Hex(), time.Hour*24*7).Err()

	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "failed to create session"})
	}

	c.Cookie(&fiber.Cookie{
		Name:     "session_id",
		Value:    sessionID,
		Expires:  time.Now().Add(time.Hour * 24 * 7),
		HTTPOnly: true,
		Secure:  true,
		SameSite: "None",
		Path: "/",
	})

	
	return c.Status(http.StatusCreated).JSON(fiber.Map{
		"user": fiber.Map{
			"id":    createdUser.ID,
			"name":  createdUser.Name,
			"email": createdUser.Email,
			"imageUrl": createdUser.ImageUrl,
		},
		"success": true,
	})
}

