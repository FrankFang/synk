package config

import (
	"log"
	"os"
	"path/filepath"
)

func DefaultPathes() (uploads string) {
	exe, err := os.Executable()
	if err != nil {
		log.Fatal(err)
	}
	dir := filepath.Dir(exe)
	uploads = filepath.Join(dir, "uploads")
	return
}

var UploadsDir = DefaultPathes()
