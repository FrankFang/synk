package main

import (
	"embed"
	"log"
	"os"
	"os/signal"
	"runtime"
	"sync"

	server "synk/server"

	// "github.com/zserge/lorca"
)

//go:embed server/frontend/dist/*
var FS embed.FS

func main() {
	args := []string{}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=Lorca")
	}
	// ui, _ := lorca.New("", "", 800, 600, "--disable-sync", " --disable-translate")
	// defer ui.Close()
	go server.Run() // 8080
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
