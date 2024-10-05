package main

import (
	"os"
	"server/db"
	"server/migrations"
	"server/routes"

	"github.com/gin-gonic/gin"
	_ "github.com/joho/godotenv/autoload" // Auto load env file
)

func init() {
	db.InitDb()
	migrations.Migrate()
}

func main() {
	server := gin.Default()
	apiRoutes := server.Group("/api")
	routes.RegisterRoutes(apiRoutes)

	server.Run(os.Getenv("PORT"))
}
