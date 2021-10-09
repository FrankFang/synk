package main

import (
	"embed"
	"os"
	"os/signal"
	"sync"

	server "synk/server"

	"github.com/zserge/lorca"
)

//go:embed server/frontend/dist/*
var FS embed.FS

func main() {
	var endWaiter sync.WaitGroup
	endWaiter.Add(1)
	quit := make(chan interface{})
	go server.Run(quit) // 8080
	ui, _ := lorca.New("", "", 800, 600, "--disable-sync", " --disable-translate")
	defer ui.Close()
	ui.Load("http://127.0.0.1:8080/static/index.html")
	signalChannel := make(chan os.Signal, 1)
	signal.Notify(signalChannel, os.Interrupt)
	select {
	case <-signalChannel:
		endWaiter.Done()
	case <-quit:
		endWaiter.Done()
	}
	endWaiter.Wait()
}
