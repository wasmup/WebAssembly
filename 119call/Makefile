all:
# GOOS=js GOARCH=wasm go build -o ./static/test.wasm
	GOOS=js GOARCH=wasm go build -ldflags "-s -w" -o ./static/js/main.wasm
	ls -lh ./static/js/*.wasm
	cd static && gnome-terminal -- goserve
	firefox http://127.0.0.1:8080/

init:
# Run once for a new project:
# cp $(GOROOT)/misc/wasm/wasm_exec.html ./static/js/
	cp $(GOROOT)/misc/wasm/wasm_exec.js ./static/js/

# lsof -i :8080
# kill -9 10347

wat:
	wasm2wat ./static/js/main.wasm -o main.wat