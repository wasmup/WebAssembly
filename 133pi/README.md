# Rust WebAssembly

## Build
```sh
cargo clean

RUSTFLAGS='-C link-arg=-s' cargo build --release --target=wasm32-unknown-unknown
ll $target/wasm32-unknown-unknown/release/*.wasm
rm $target/wasm32-unknown-unknown/release/*_bg.wasm
rm $target/wasm32-unknown-unknown/release/*.js
wasm-bindgen --target web --no-typescript --out-dir $target/wasm32-unknown-unknown/release/ $target/wasm32-unknown-unknown/release/*.wasm
wasm-gc $target/wasm32-unknown-unknown/release/*_bg.wasm
ll $target/wasm32-unknown-unknown/release/*.wasm
cp $target/wasm32-unknown-unknown/release/*_bg.wasm  ./static/js/main.wasm
cp $target/wasm32-unknown-unknown/release/*.js  ./static/js/bindgen.js
ls -lh ./static/js/main.wasm

code ./static/js/bindgen.js # export
wasm2wat ./static/js/main.wasm -o /dev/shm/main.wat && code /dev/shm/main.wat
wasm2js ./static/js/main.wasm -o /dev/shm/main.js && code /dev/shm/main.js
```