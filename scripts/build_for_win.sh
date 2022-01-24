#!/bin/sh
version=$(git describe --tags $(git rev-list --tags='v[0-9].[0-9]*' --max-count=1))

go generate
GOOS=windows GOARCH=amd64 go build -ldflags "-H windowsgui" -o build/synk-${version}.exe
