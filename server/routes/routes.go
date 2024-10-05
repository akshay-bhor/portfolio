package routes

import "github.com/gin-gonic/gin"

func RegisterRoutes(routerGroup *gin.RouterGroup) {
	authRoutes := routerGroup.Group("/auth")

	RegisterAuthRoutes(authRoutes)
}
