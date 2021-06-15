# Calculator

```sh
GOOS=js GOARCH=wasm go build -o static/js/main.wasm
ls -ll static/js/main.wasm
goserve 
```