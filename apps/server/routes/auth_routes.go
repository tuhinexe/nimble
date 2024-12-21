package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tuhinexe/nimble/apps/server/api/v1"
)



func AuthRoutes(api fiber.Router,authApi api.AuthAPI){
	auth := api.Group("/auth")

	auth.Post("/signup",authApi.SignUpHandler)
	// auth.Get("owner",authApi.GetOwnerHandler)

}