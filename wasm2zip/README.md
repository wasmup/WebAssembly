# Compress wasm file using deflate

Usage:  
wasm2zip main.wasm main.zip

Or use stdin and stdout:  
wasm2zip < main.wasm > main.zip

See go110zipwasm

```sh
# cargo build --release
# RUSTFLAGS='-C link-arg=-s' cargo build --release
RUSTFLAGS='-C link-arg=-s' cargo build --release --target x86_64-unknown-linux-musl

```