# Rust WebAssembly

## Install Rust

Use `rustup` to install Rust for your platform [here](https://www.rust-lang.org/tools/install).  
On Linux:
```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup set profile default
rustup toolchain add nightly
rustup default nightly
rustup show
```
Then add some components:
```
rustup component add rustfmt rust-src rust-analysis 
rustup component list --installed

```


## Install wasm32 target for Rust

```sh
rustup target add wasm32-unknown-unknown
rustup target list --installed
```

## Generate WebAssembly binary file using rustc
```sh
rustc --target wasm32-unknown-unknown -O --crate-type=cdylib src/lib.rs  -o main.wasm
```

# Create a new Rust library project

```sh
cargo new --lib hello
cd hello
```

[ref](https://doc.rust-lang.org/reference/linkage.html):  
> --crate-type=cdylib, #[crate_type = "cdylib"] - A dynamic system library will be produced. This is used when compiling a dynamic library to be loaded from another language. This output type will create *.so files on Linux, *.dylib files on macOS, and *.dll files on Windows.

Open your favorite code editor/IDE and add following lines to the `Cargo.toml` file in a newly created project folder:

```
[lib]
crate-type = ["cdylib"]

[profile.release]
opt-level = 's'  # Optimize for size.
lto = true # Link Time Optimization (LTO)
# codegen-units = 1 #Set this to 1 to allow for maximum size reduction optimizations:
# panic = 'abort' #  removes the need for this extra unwinding code.
```

# Build

```sh
cargo clean
RUSTFLAGS='-C link-arg=-s' cargo build --release --target=wasm32-unknown-unknown
ll $target/wasm32-unknown-unknown/release/*.wasm
# Copy Wasm file to your static files folder:
cp $target/wasm32-unknown-unknown/release/*.wasm  ./static/js/main.wasm
ls -lh ./static/js/main.wasm
# 24K

# https://github.com/WebAssembly/wabt
# See the wasm text:
wasm2wat ./static/js/main.wasm -o /dev/shm/main.wat && code /dev/shm/main.wat
# See the converted JavaScrip:
wasm2js ./static/js/main.wasm -o /dev/shm/main.js && code /dev/shm/main.js
```

----

You may use `-v` or `--verbose` to see verbose output in case of any error:
```sh
cargo build -v --release --target=wasm32-unknown-unknown
```
Output on my machine for `cargo build -v --release --target=wasm32-unknown-unknown`:
```sh
rustc --edition=2018 --crate-name rs102hello src/lib.rs --error-format=json --json=diagnostic-rendered-ansi --crate-type cdylib --emit=dep-info,link -C opt-level=s -C lto -C metadata=f08b7015af550268 --out-dir /dev/shm/target/wasm32-unknown-unknown/release/deps --target wasm32-unknown-unknown -L dependency=/dev/shm/target/wasm32-unknown-unknown/release/deps -L dependency=/dev/shm/target/release/deps
```
See: [rustc docs](https://doc.rust-lang.org/rustc/command-line-arguments.html).


Check before build (faster than build to see errors):
```sh
cargo clean
cargo check --target=wasm32-unknown-unknown
# check verbose:
cargo check -v --target=wasm32-unknown-unknown
```

# Run your static file server

```sh
python3 -m http.server 8080
```
You may built it yourself from Rust actix-web source: https://github.com/wasmup/WebAssembly/tree/master/rsserve

Open `./102hello-rs/static/index.html` file via that web server:

```sh
firefox http://127.0.0.1:8080/102hello-rs/static/
```

Or just run it online [here](https://wasmup.github.io/wasmup/102hello-rs/static/index.html).  
It's the same.

Note: It won't work directly without static file server.