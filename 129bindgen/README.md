# Rust WebAssembly

## Install tools

```sh
# @file: ~/.cargo/config : [build] target-dir = "/dev/shm/target" 
# export TARGET=/dev/shm/target

# https://github.com/alexcrichton/wasm-gc
RUSTFLAGS='-C link-arg=-s' cargo install wasm-gc --force
file $(which wasm-gc)

# https://github.com/rustwasm/wasm-bindgen
RUSTFLAGS='-C link-arg=-s' cargo install wasm-bindgen-cli --force
file $(which wasm-bindgen)
wasm-bindgen --version
```

# Build
```sh
cargo clean
RUSTFLAGS='-C link-arg=-s' cargo build --release --target=wasm32-unknown-unknown
x $target/wasm32-unknown-unknown/release/
rm $target/wasm32-unknown-unknown/release/*_bg.wasm
rm $target/wasm32-unknown-unknown/release/*.js
wasm-bindgen --target web --no-typescript --out-dir $target/wasm32-unknown-unknown/release/ $target/wasm32-unknown-unknown/release/*.wasm
ll $target/wasm32-unknown-unknown/release/*.wasm
wasm-gc $target/wasm32-unknown-unknown/release/*_bg.wasm
ll $target/wasm32-unknown-unknown/release/*.wasm
cp $target/wasm32-unknown-unknown/release/*_bg.wasm  ./static/js/main.wasm
cp $target/wasm32-unknown-unknown/release/*.js  ./static/js/bindgen.js
ls -lh ./static/js/main.wasm
code ./static/js/bindgen.js # export

wasm2wat ./static/js/main.wasm -o /dev/shm/main.wat && code /dev/shm/main.wat
wasm2js ./static/js/main.wasm -o /dev/shm/main.js && code /dev/shm/main.js
```


# Run your static file server

```sh
go run ../goserve/.
```

Open your web browser:

```sh
firefox http://127.0.0.1:8080/static/
```