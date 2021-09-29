package synk

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	qrcode "github.com/skip2/go-qrcode"
)

//go:embed frontend/dist/*
var FS embed.FS

func Run() {
	gin.SetMode(gin.ReleaseMode)
	gin.DisableConsoleColor()
	router := gin.Default()
	staticFiles, _ := fs.Sub(FS, "frontend/dist")
	router.StaticFS("/static", http.FS(staticFiles))
	router.Use(cors.New(cors.Config{
		AllowMethods:     []string{"PUT", "PATCH", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			if origin == "http://127.0.0.1:3000" || origin == "http://localhost:3000" {
				return true
			} else {
				log.Printf("%v is now allowed", origin)
				return false
			}
		},
		MaxAge: 12 * time.Hour,
	}))
	router.POST("/api/v1/files", func(c *gin.Context) {
		file, err := c.FormFile("raw")
		if err != nil {
			log.Fatal(err)
		}
		exe, err := os.Executable()
		if err != nil {
			log.Fatal(err)
		}
		dir := filepath.Dir(exe)
		if err != nil {
			log.Fatal(err)
		}
		filename := uuid.New().String()
		fileErr := c.SaveUploadedFile(file, filepath.Join(dir, "uploads", filename+filepath.Ext(file.Filename)))
		if fileErr != nil {
			log.Fatal(fileErr)
		}
		c.JSON(http.StatusOK, gin.H{"status": "you are logged in"})
	})
	router.POST("/api/v1/texts", func(c *gin.Context) {
		var json struct {
			Raw string
		}
		if err := c.ShouldBindJSON(&json); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		exe, err := os.Executable()
		if err != nil {
			log.Fatal(err)
		}
		dir := filepath.Dir(exe)
		filename := uuid.New().String()
		fileErr := qrcode.WriteFile(json.Raw, qrcode.Medium, 256,
			filepath.Join(dir, "uploads", filename+".png"))
		fmt.Println(fileErr, filepath.Join(dir, "uploads", filename+".png"))
		c.JSON(http.StatusOK, gin.H{"status": "you are logged in"})
	})
	runErr := router.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
	if runErr != nil {
		log.Fatal(runErr)
	}
}
