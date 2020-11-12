# Rust WebAssembly HTML factorial

```sh
# rustup target add wasm32-unknown-unknown
# (printf "\n%s\n" '[lib]' 'crate-type = ["cdylib"]') >> Cargo.toml

rustup target add wasm32-wasi

cargo clean
RUSTFLAGS='-C link-arg=-s' cargo build --release --target=wasm32-wasi
ls -lh $target/wasm32-wasi/release/*.wasm
cp $target/wasm32-wasi/release/*.wasm ./static/js/main.wasm
ls -lh ./static/js/main.wasm
# 72K

file  ./static/js/main.wasm
wasm2wat ./static/js/main.wasm | code -
wasm2js ./static/js/main.wasm | code -

# https://github.com/bytecodealliance/wasmtime/blob/master/docs/WASI-tutorial.md
# https://github.com/bytecodealliance/wasmtime

curl https://wasmtime.dev/install.sh -sSf | bash

file $(which wasmtime)
wasmtime --version
# Run:
# sandbox:
# run to copy file README.md to  /dev/shm/a.txt
# wasmtime ./static/js/main.wasm README.md /dev/shm/a.txt 
# error opening input: failed to find a preopened file descriptor through which "/dev/shm/a.txt" could be opened

wasmtime --dir=. --dir=/dev/shm ./static/js/main.wasm README.md /dev/shm/a.txt 
code /dev/shm/a.txt 



```
