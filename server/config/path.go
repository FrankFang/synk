package synk

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
)

func DefaultPathes() (uploads string) {
	fmt.Println("执行 DefaultPathes")
	exe, err := os.Executable()
	if err != nil {
		log.Fatal(err)
	}
	dir := filepath.Dir(exe)
	uploads = filepath.Join(dir, "uploads")
	return
}

var UploadsDir = DefaultPathes()
