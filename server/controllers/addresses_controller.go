package controllers

import (
	"net"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddressesController(c *gin.Context) {
	addrs, _ := net.InterfaceAddrs()
	var result []string
	for _, address := range addrs {
		// check the address type and if it is not a loopback the display it
		if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				result = append(result, ipnet.IP.String())
			}
		}
	}
	c.JSON(http.StatusOK, gin.H{"addresses": result})
}
