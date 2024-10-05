package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterAuthRoutes(routes *gin.RouterGroup) {
	routes.POST("/login", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"hi": "login",
		})
	})
	routes.POST("/register", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"hi": "Register",
		})
	})
}
