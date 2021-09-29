package synk

import (
	"embed"
	"io/fs"
	"log"
	"net/http"

	controllers "synk/server/controllers"
	initializers "synk/server/initializers"

	"github.com/gin-gonic/gin"
)

//go:embed frontend/dist/*
var FS embed.FS

func Run() {
	gin.SetMode(gin.ReleaseMode)
	gin.DisableConsoleColor()
	router := gin.Default()
	staticFiles, _ := fs.Sub(FS, "frontend/dist")
	router.StaticFS("/static", http.FS(staticFiles))
	initializers.InitCors(router)
	router.POST("/api/v1/files", controllers.FilesController)
	router.POST("/api/v1/texts", controllers.TextsController)
	runErr := router.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
	if runErr != nil {
		log.Fatal(runErr)
	}
}
