package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tuhinexe/nimble/apps/server/api/v1"
)




func OwnerRoutes(api fiber.Router,authApi api.AuthAPI){
	owner := api.Group("/owner")

	owner.Get("/",authApi.GetOwner)
	owner.Get("/logout",authApi.LogoutHandler)

}