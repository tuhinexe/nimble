package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tuhinexe/nimble/apps/server/services"
)



func AuthRoutes(api fiber.Router,authService *services.AuthService){
	auth := api.Group("/auth")

	auth.Post("/signup", func(c *fiber.Ctx) error {
		return authService.SignUp(c)
	})

}