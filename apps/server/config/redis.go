package config

import (
	"context"
	"fmt"

	"github.com/go-redis/redis/v8"
)




func InitRedis() (*redis.Client,error) {
	client := redis.NewClient(&redis.Options{
		Addr:     AppConfig.REDIS_ADDRESS,
		Password: AppConfig.REDIS_PASSWORD,
		DB:       0,
	})
	
	_, err := client.Ping(context.Background()).Result()
	if err != nil {
		return nil,err
	}
	fmt.Println("Redis connected")
	return client,nil

}