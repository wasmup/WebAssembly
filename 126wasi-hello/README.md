# Rust WebAssembly WASI CLI Hello

```sh
rustup target add wasm32-wasi

cargo clean
RUSTFLAGS='-C link-arg=-s' cargo build --release --target=wasm32-wasi
ls -lh $target/wasm32-wasi/release/*.wasm
mkdir -p static/js/
cp $target/wasm32-wasi/release/*.wasm ./static/js/main.wasm
ls -lh ./static/js/main.wasm

# 65K
file  ./static/js/main.wasm
wasm2wat ./static/js/main.wasm | code -
wasm2js ./static/js/main.wasm | code -

# https://github.com/bytecodealliance/wasmtime/blob/master/docs/WASI-tutorial.md
# Install:
curl https://wasmtime.dev/install.sh -sSf | bash

file $(which wasmtime)
wasmtime --version
# 0.8.0

# Run in sandbox:
wasmtime ./static/js/main.wasm 
# Hello, world from WASI.
```
