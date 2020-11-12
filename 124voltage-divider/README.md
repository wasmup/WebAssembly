# Rust WebAssembly Voltage Divider

```sh
# cargo build -v --release --target=wasm32-unknown-unknown
cargo clean
RUSTFLAGS='-C link-arg=-s' cargo build --release --target=wasm32-unknown-unknown
ls -lh $target/wasm32-unknown-unknown/release/*.wasm
cp $target/wasm32-unknown-unknown/release/*.wasm ./static/js/main.wasm
ls -lh ./static/js/main.wasm

wasm2wat ./static/js/main.wasm | code -
wasm2js ./static/js/main.wasm | code -
```
