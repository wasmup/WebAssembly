# Rust WebAssembly HTML factorial

```sh
# rustup target add wasm32-unknown-unknown
# (printf "\n%s\n" '[lib]' 'crate-type = ["cdylib"]') >> Cargo.toml

cargo clean
RUSTFLAGS='-C link-arg=-s' cargo build --release --target=wasm32-unknown-unknown
ls -lh $target/wasm32-unknown-unknown/release/*.wasm
cp $target/wasm32-unknown-unknown/release/*.wasm ./static/js/main.wasm
ls -lh ./static/js/main.wasm


# https://github.com/WebAssembly/wabt
# See the wasm text:
wasm2wat ./static/js/main.wasm -o /dev/shm/main.wat && code /dev/shm/main.wat
# See the converted JavaScrip:
wasm2js ./static/js/main.wasm -o /dev/shm/main.js && code /dev/shm/main.js
```
