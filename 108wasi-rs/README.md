# Rust Wasm wasi

```sh

# rustup default stable
rustup default nightly
# rustup update
rustup target add wasm32-wasi
rustup target list --installed

cargo clean
RUSTFLAGS='-C link-arg=-s' cargo build --release --target=wasm32-wasi
ll $target/wasm32-wasi/release/*.wasm 
cp $target/wasm32-wasi/release/*.wasm  ./static/js/main.wasm
ll ./static/js/main.wasm

# https://github.com/WebAssembly/wabt
# See the wasm text:
wasm2wat ./static/js/main.wasm -o /dev/shm/main.wat && code /dev/shm/main.wat
# See the converted JavaScrip:
wasm2js ./static/js/main.wasm -o /dev/shm/main.js && code /dev/shm/main.js
```
