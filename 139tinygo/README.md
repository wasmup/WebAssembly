# Calculator

```sh
GOOS=js GOARCH=wasm go build -o static/js/main.wasm
ls -lh static/js/main.wasm


tinygo build -o static/js/main.wasm -target wasm ./main.go
tinygo build -o static/js/main.wasm -target wasm -no-debug ./main.go
ls -lh static/js/main.wasm
```
