package controllers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/skip2/go-qrcode"
)

func QrcodesController(c *gin.Context) {
	if content := c.Query("content"); content != "" {
		png, err := qrcode.Encode(content, qrcode.Medium, 256)
		if err != nil {
			log.Fatal(err)
		}
		c.Data(http.StatusOK, "image/png", png)
	} else {
		c.Status(http.StatusPreconditionRequired)
	}
}
