all:
	cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" ./static/wasm_exec.js
	cp "$(go env GOROOT)/misc/wasm/wasm_exec.html" ./static/wasm_exec.html
	
# GOOS=js GOARCH=wasm go build -o ./static/test.wasm
	GOOS=js GOARCH=wasm go build -ldflags "-s -w" -o ./static/test.wasm
# Run when main.go changed:
	ls -l ./static/*.wasm

# Run the static file server at background:
	gnome-terminal -- go run web/main.go
# Now open the web page using your web browser at: http://127.0.0.1:8080/static/wasm_exec.html

	firefox http://127.0.0.1:8080/static/wasm_exec.html

init:
# Run once for a new project:
	cp $(GOROOT)/misc/wasm/wasm_exec.html ./static/
	cp $(GOROOT)/misc/wasm/wasm_exec.js ./static/

# lsof -i :8080
# kill -9 10347

wat:
	wasm2wat static/test.wasm -o test.wat