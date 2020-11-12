# WebAssembly: Web Console Hello 

# Build
```sh
GOOS=js GOARCH=wasm go build -o static/js/main.wasm
ls -lh static/js/main.wasm
# 2.2M 
```

# Run in terminal
```sh
node static/js/wasm_exec.js static/js/main.wasm
# Output:
# Console Hello WebAssembly
```
