package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tuhinexe/nimble/apps/server/config"
)




func main(){
	config.LoadConfig()
	app := fiber.New()

	app.Listen(":"+config.AppConfig.Port)
	
}