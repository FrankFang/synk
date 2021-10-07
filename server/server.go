package synk

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"strings"

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
	initializers.InitCors(router)
	router.GET("/uploads/:path", controllers.UploadsController)
	router.GET("/api/v1/addresses", controllers.AddressesController)
	router.GET("/api/v1/qrcodes", controllers.QrcodesController)
	router.POST("/api/v1/files", controllers.FilesController)
	router.POST("/api/v1/texts", controllers.TextsController)
	staticFiles, _ := fs.Sub(FS, "frontend/dist")
	router.StaticFS("/static", http.FS(staticFiles))
	router.NoRoute(func(c *gin.Context) {
		path := c.Request.URL.Path
		if strings.HasPrefix(path, "/static/") {
			reader, err := staticFiles.Open("index.html")
			if err != nil {
				log.Fatal(err)
			}
			defer reader.Close()
			stat, err := reader.Stat()
			if err != nil {
				log.Fatal(err)
			}
			c.DataFromReader(http.StatusOK, stat.Size(), "text/html", reader, nil)
		} else {
			c.Status(http.StatusNotFound)
		}
	})
	runErr := router.Run(":8080") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
	if runErr != nil {
		log.Fatal(runErr)
	}
}
