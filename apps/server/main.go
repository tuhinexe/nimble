package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/tuhinexe/nimble/apps/server/config"
)




func main(){
	config.LoadConfig()

	port := config.AppConfig.Port

	if port == "" {
		port = "5000"
	}
	app := fiber.New()

	app.Use(logger.New())
	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Hello, World!",
		})
	})


	log.Printf("Server running on port %s", port)
	log.Fatal(app.Listen(":" + port))
	
}