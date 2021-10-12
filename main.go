package main

import (
	"embed"
	"fmt"
	"os"
	"os/signal"
	"sync"

	server "synk/server"

	"github.com/zserge/lorca"
)

//go:embed server/frontend/dist/*
var FS embed.FS

func recoverFromError() {
	if r := recover(); r != nil {
		fmt.Println("Recovering from panic:", r)
	}
}
func main() {
	var endWaiter sync.WaitGroup
	endWaiter.Add(1)
	start := make(chan int)
	end := make(chan interface{})
	go server.Run(start, end)
	go func(start chan int, quit chan interface{}) {
		port := <-start
		defer recoverFromError()
		ui, _ := lorca.New(fmt.Sprintf("http://127.0.0.1:%d/static/index.html", port), "", 800, 600, "--disable-sync", " --disable-translate")
		defer ui.Close()
		quit <- (<-ui.Done())
	}(start, end)
	signalChannel := make(chan os.Signal, 1)
	signal.Notify(signalChannel, os.Interrupt)
	select {
	case <-signalChannel:
		endWaiter.Done()
	case <-end:
		endWaiter.Done()
	}
	endWaiter.Wait()
}
