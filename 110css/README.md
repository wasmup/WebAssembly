# Go WebAssembly CSS setAttribute

# Build
```sh
GOOS=js GOARCH=wasm go build -o static/js/main.wasm
ls -lh static/js/main.wasm

cd static/js/
# wasm-opt -Os -o output.wasm main.wasm # Optimize for size.
wasm-opt -Oz -o output.wasm main.wasm # Optimize aggressively for size.
# wasm-opt -O -o output.wasm main.wasm # Optimize for speed.
# wasm-opt -O3 -o output.wasm main.wasm # Optimize aggressively for speed.
mv ./output.wasm ./main.wasm
ls -lh main.wasm
```
