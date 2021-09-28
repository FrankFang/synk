package main

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"runtime"
	"sync"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	qrcode "github.com/skip2/go-qrcode"
)

//go:embed frontend/dist/*
var FS embed.FS

func main() {
	const pi float64 = 20
	fmt.Println(pi)
	log.Println("Start")
	path, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(path)
	list, _ := (FS.ReadDir("."))
	for _, f := range list {
		fmt.Println(f.Name())
	}
	args := []string{}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=Lorca")
	}
	// ui, _ := lorca.New("", "", 800, 600, "--disable-sync", " --disable-translate")
	// defer ui.Close()

	go func() {
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
				return origin == "http://127.0.0.1:3000"
			},
			MaxAge: 12 * time.Hour,
		}))
		router.POST("/api/v1/materials", func(c *gin.Context) {
			println("1111111111111111111111")
			type X struct {
				Category string
				Raw      string
			}
			var json X
			if err := c.ShouldBindJSON(&json); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			exe, _ := os.Executable()
			dir := filepath.Dir(exe)
			if err != nil {
				log.Fatal(err)
			}
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
	}()
	// ui.Load("http://127.0.0.1:8080/static/index.html")

	// Wait until the interrupt signal arrives or browser window is closed
	var endWaiter sync.WaitGroup
	endWaiter.Add(1)
	signalChannel := make(chan os.Signal, 1)
	signal.Notify(signalChannel, os.Interrupt)
	go func() {
		select {
		case <-signalChannel:
			endWaiter.Done()
			// case <-ui.Done():
			// 	endWaiter.Done()
		}
	}()
	endWaiter.Wait()
	log.Println("Bye")
}
