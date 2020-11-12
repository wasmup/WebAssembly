# Rust WebAssembly Morse code

See: https://en.wikipedia.org/wiki/Morse_code

```sh
# cargo build -v --release --target=wasm32-unknown-unknown
cargo clean
RUSTFLAGS='-C link-arg=-s' cargo build --release --target=wasm32-unknown-unknown
ll $target/wasm32-unknown-unknown/release/*.wasm
diff $target/wasm32-unknown-unknown/release/*.wasm ./static/js/main.wasm
cp $target/wasm32-unknown-unknown/release/*.wasm ./static/js/main.wasm
ls -lh ./static/js/main.wasm

# https://github.com/WebAssembly/wabt
# See the wasm text:
wasm2wat ./static/js/main.wasm -o /dev/shm/main.wat && code /dev/shm/main.wat
# See the converted JavaScrip:
wasm2js ./static/js/main.wasm -o /dev/shm/main.js && code /dev/shm/main.js
```