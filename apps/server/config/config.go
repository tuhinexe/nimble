package config

import (
	"log"

	"github.com/spf13/viper"
)

// Config holds all application configuration values
type Config struct {
	Port     string
	MongoURI string
	REDIS_ADDRESS string
	Env      string
	REDIS_PASSWORD string
}


var AppConfig Config


func LoadConfig() {

	
	viper.SetConfigName("config")
	viper.SetConfigType("env")    
	viper.AddConfigPath(".")      
	viper.AddConfigPath("apps/server") 

	
	viper.AutomaticEnv()

	
	if err := viper.ReadInConfig(); err != nil {
		log.Printf("Config file not found: %v", err)
	} else {
		log.Println("Config file loaded successfully.")
	}

	// Unmarshal the configuration into AppConfig
	if err := viper.Unmarshal(&AppConfig); err != nil {
		log.Fatalf("Error unmarshalling configuration: %v", err)
	}
}
