package api

import (
	"context"
	"net/http"

	"github.com/gofiber/fiber/v2"
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
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "invalid request"})
	}


	if req.Method == "credentials" && (req.Email == "" || req.Password == "") {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "email and password are required"})
	}
	if req.Method == "google" && req.Email == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "email is required for Google signup"})
	}

	
	user := models.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: req.Password,
		ImageUrl:    req.Image,
	}
	createdUser, err := api.AuthService.Signup(context.Background(), user, req.Method)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	
	return c.Status(http.StatusCreated).JSON(fiber.Map{
		"user": fiber.Map{
			"id":    createdUser.ID,
			"name":  createdUser.Name,
			"email": createdUser.Email,
			"imageUrl": createdUser.ImageUrl,
		},
	})
}
