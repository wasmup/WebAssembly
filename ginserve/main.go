package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.StaticFS("/", http.Dir("."))
	router.Run(":8080")
}

// router.Static("/assets", "./assets")
// router.StaticFile("/favicon.ico", "./resources/favicon.ico")
