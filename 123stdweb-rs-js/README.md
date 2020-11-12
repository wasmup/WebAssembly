# Rust WebAssembly cargo-web and stdweb

```sh
rustup target add wasm32-unknown-unknown

# https://github.com/koute/stdweb
cargo search cargo-web
# cargo-web = "0.6.26"          # A Cargo subcommand for the client-side Web
# cargo install cargo-web --version 0.6.26
cargo install cargo-web
file ~/.cargo/bin/cargo-web
cargo-web --version
# cargo-web 0.6.26

cargo search stdweb
# Add to Cargo.toml:
# stdweb = "0.4.20"                    # A standard library for the client-side Web

# Compile to WebAssembly using Rust's native WebAssembly backend:
cargo web start --target=wasm32-unknown-unknown

firefox http://localhost:8000


ls -lh ./static/*.wasm
# 137K

cargo clean
RUSTFLAGS='-C link-arg=-s' cargo web build --release --target=wasm32-unknown-unknown
ls -lh $target/wasm32-unknown-unknown/release/stdweb-rs-js.*

cp $target/wasm32-unknown-unknown/release/stdweb-rs-js.js ./static/
cp $target/wasm32-unknown-unknown/release/stdweb-rs-js.wasm ./static/
ls -lh ./static/*.wasm
# 63K
wasm2js ./static/*.wasm | code -

```

```sh
# using custom linker
RUSTFLAGS='-C linker=rust-lld' cargo web start --target=wasm32-unknown-unknown
```
