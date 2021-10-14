#!/bin/sh
version=$(git describe --tags $(git rev-list --tags='v[0-9].[0-9]*' --max-count=1))

APP="Synk-${version}.app"
mkdir -p build/$APP/Contents/MacOS
mkdir -p build/$APP/Contents/Resources
GOOS=darwin GOARCH=amd64 go build -o build/$APP/Contents/MacOS/synk
cat > build/$APP/Contents/Info.plist << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleExecutable</key>
	<string>synk</string>
	<key>CFBundleIconFile</key>
	<string>icon.icns</string>
	<key>CFBundleIdentifier</key>
	<string>com.fangyinghang.synk</string>
</dict>
</plist>
EOF
cp macres/synk.icns build/$APP/Contents/Resources/icon.icns
find build/$APP