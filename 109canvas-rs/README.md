# 2D Canvas


```sh
# https://rustwasm.github.io/wasm-pack/installer/
# Linux:
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
wasm-pack --version
# wasm-pack 0.9.1

# wasm-pack build --target web
cargo clean
RUSTFLAGS='-C link-arg=-s' wasm-pack build --target web
cp ./pkg/rs104canvas_bg.wasm ./static/js/main.wasm
ls -lh ./static/js/*.wasm

wasm2js ./static/js/*.wasm | code -

```