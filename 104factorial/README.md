# Go WebAssembly web Console factorial

```sh
time go run .
# 120
# 0m0.245s

# Build:
GOOS=js GOARCH=wasm go build -o static/js/main.wasm
ls -lh static/js/main.wasm
# 2.2M

time node static/js/wasm_exec.js static/js/main.wasm
# 120
# 0m0.582s
```
