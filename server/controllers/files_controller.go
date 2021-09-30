package synk

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/skip2/go-qrcode"
)

func FilesController(c *gin.Context) {
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
	fullpath := filepath.Join("uploads", filename+filepath.Ext(file.Filename))
	fileErr := c.SaveUploadedFile(file, filepath.Join(dir, fullpath))
	if fileErr != nil {
		log.Fatal(fileErr)
	}
	qrErr := qrcode.WriteFile("http://127.0.0.1:8080/"+fullpath, qrcode.Medium, 256,
		filepath.Join(dir, fullpath+"-qr.png"))
	if qrErr != nil {
		log.Fatal(qrErr)
	}
	c.JSON(http.StatusOK, gin.H{"url": "/" + fullpath + "-qr.png"})
}
