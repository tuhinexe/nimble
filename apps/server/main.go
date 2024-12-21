package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/tuhinexe/nimble/apps/server/api/v1"
	"github.com/tuhinexe/nimble/apps/server/config"
	"github.com/tuhinexe/nimble/apps/server/middleware"
	"github.com/tuhinexe/nimble/apps/server/routes"
	"github.com/tuhinexe/nimble/apps/server/services"
)

var (
	Version string = "1.0.0"
)


func setupMiddleware(app *fiber.App) {
	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://app.localhost:3000",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
	}))

	app.Use(recover.New()) 
}

func initializeServices(mongoClient *mongo.Client, redisClient *redis.Client) (*services.AuthService, *api.AuthAPI) {
	userCollection := mongoClient.Database(config.AppConfig.DB_NAME).Collection("users")

	authService := &services.AuthService{
		UserCollection: userCollection,
		RedisClient:    redisClient,
	}

	authApi := &api.AuthAPI{
		AuthService: authService,
	}

	return authService, authApi
}

func main() {
	config.LoadConfig()
	port := config.AppConfig.Port
	if port == "" {
		port = "5000"
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Initialize MongoDB
	mongoClient, err := config.InitMongoDB()
	if err != nil {
		log.Fatalf("Error connecting to MongoDB: %v", err)
	}
	defer func() {
		if err := mongoClient.Disconnect(ctx); err != nil {
			log.Printf("Error disconnecting from MongoDB: %v", err)
		}
	}()


	redisClient, err := config.InitRedis()
	if err != nil {
		log.Fatalf("Error connecting to Redis: %v", err)
	}
	defer redisClient.Close()


	app := fiber.New(fiber.Config{
		AppName:      "Nimble Server",
		ServerHeader: "Nimble",
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	})

	setupMiddleware(app)

	_, authApi := initializeServices(mongoClient, redisClient)

	api := app.Group("/api/v1")

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Redirect("/api/v1")
	})

	api.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Nimble API version " + Version,
			"status": "healthy",
		})
	})

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":    "healthy",
			"version":   Version,
			"timestamp": time.Now(),
		})
	})

	routes.AuthRoutes(api, *authApi)
	api.Use(middleware.ValidateSession)
	api.Get("/owner", func (c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Welcome Owner"})
	})

	go func() {
		log.Printf("Server running on port %s", port)
		if err := app.Listen(":" + port); err != nil {
			log.Fatalf("Server failed to start: %v", err)
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	
	<-stop
	
	log.Println("Shutting down server...")

	// Attempt graceful shutdown
	if err := app.Shutdown(); err != nil {
		log.Printf("Server shutdown error: %v", err)
	}

	log.Println("Server stopped")
}