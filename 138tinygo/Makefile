all:
# firefox http://127.0.0.1:8080/
	cd static && gnome-terminal -- goserve
	
build:
	tinygo build -o static/js/main.wasm -target wasm -no-debug .
	ls -lh ./static/js/*.wasm
init:
# Run once for a new project:
	cp /usr/local/tinygo/targets/wasm_exec.js static/js/

gobuild:
# GOOS=js GOARCH=wasm go build -o ./static/test.wasm
	GOOS=js GOARCH=wasm go build -ldflags "-s -w" -o ./static/js/main.wasm
	ls -lh ./static/js/*.wasm
goinit:
# Run once for a new project:
# cp $(GOROOT)/misc/wasm/wasm_exec.html ./static/js/
	cp $(GOROOT)/misc/wasm/wasm_exec.js ./static/js/

# lsof -i :8080
# kill -9 10347

# https://github.com/WebAssembly/wabt
# https://github.com/WebAssembly/binaryen
wat:
# See the wasm text:
	wasm2wat ./static/js/main.wasm -o /dev/shm/main.wat && code /dev/shm/main.wat
# See the converted JavaScrip:
	wasm2js ./static/js/main.wasm -o /dev/shm/main.js && code /dev/shm/main.js

	which go
# Help:
	code /usr/local/go/src/syscall/js/js.go

	nargs ./...
	staticcheck -checks all,-SA1019,-ST1000 ./...
	staticcheck ./...
	golint ./...
	go test ./...