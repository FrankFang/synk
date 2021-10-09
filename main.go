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

func openWindow(ch chan interface{}) {
	ui, _ := lorca.New("", "", 800, 600, "--disable-sync", " --disable-translate")
	defer ui.Close()
	ui.Load("http://127.0.0.1:8080/static/index.html")
	ch <- ui.Done()
}
func waitForEnd(endWaiter sync.WaitGroup, signalChannel chan os.Signal, quit chan interface{}) {
	select {
	case <-signalChannel:
		endWaiter.Done()
	case <-quit:
		endWaiter.Done()
	}
}

func main() {
	quit := make(chan interface{})
	go server.Run(quit) // 8080
	// go openWindow(quit)
	var endWaiter sync.WaitGroup
	endWaiter.Add(1)
	signalChannel := make(chan os.Signal, 1)
	signal.Notify(signalChannel, os.Interrupt)
	go waitForEnd(endWaiter, signalChannel, quit)
	endWaiter.Wait()
}
