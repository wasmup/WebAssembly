# Rust WebAssembly

## Build
```sh
cargo clean
RUSTFLAGS='-C link-arg=-s' cargo build --release
# Finished release [optimized] target(s) in 12.96s
ll /dev/shm/target/release/common-factors-probability-timing 
# 288_968
time /dev/shm/target/release/common-factors-probability-timing
# common factor probability = 39.2230% for 1_000_000 pairs of random numbers.
# common factors probability = 1 - 6/π² = 39.2073%
# all prime common factors probability = 27.5286%

# real    0m8.495s
# user    0m8.456s
# sys     0m0.004s

RUSTFLAGS='-C link-arg=-s' cargo build --release --target x86_64-unknown-linux-musl
file /dev/shm/target/x86_64-unknown-linux-musl/release/common-factors-probability-timing
ll /dev/shm/target/x86_64-unknown-linux-musl/release/common-factors-probability-timing
# 308_832 => toml: 280_048
time /dev/shm/target/x86_64-unknown-linux-musl/release/common-factors-probability-timing
# common factor probability = 39.2122% for 1_000_000 pairs of random numbers.
# common factors probability = 1 - 6/π² = 39.2073%
# all prime common factors probability = 27.4795%
# real    0m7.559s
# user    0m7.509s
# sys     0m0.001s

cd go
time go run .
# common factor probability = 39.2507% for 1_000_000 pairs of random numbers.
# common factors probability = 1 - 6/π² = 39.2073%
# all prime common factors probability = 27.5514%
# real    0m9.940s
# user    0m10.550s
# sys     0m0.314s

# cp $GOROOT/misc/wasm/wasm_exec.html ./static/js/
cp $GOROOT/misc/wasm/wasm_exec.js ./static/js/
time GOOS=js GOARCH=wasm go build -o static/js/main.wasm  
ls -lh  static/js/main.wasm  
# 2.2M
time node static/js/wasm_exec.js static/js/main.wasm 
# common factor probability = 39.0957% for 1_000_000 pairs of random numbers.
# common factors probability = 1 - 6/π² = 39.2073%
# all prime common factors probability = 27.4218%
# 30.920858112s

# real    0m31.823s
# user    0m33.684s
# sys     0m0.149s
# wasm-gc static/js/main.wasm

time tinygo build -o static/js/main.wasm -target wasm -no-debug .
# real    0m3.314s
# user    0m3.593s
# sys     0m0.192s
ls -lh ./static/js/*.wasm
    # 114K
cp /usr/local/tinygo/targets/wasm_exec.js static/js/
time node static/js/wasm_exec.js static/js/main.wasm
# common factor probability = 39.1889% for 1_000_000 pairs of random numbers.
# common factors probability = 1 - 6/π² = 39.2073%
# all prime common factors probability = 27.4320%
# 17.858201856s

# real    0m17.975s
# user    0m18.061s
# sys     0m0.017s

cd ../Cpp
# sudo apt-get install clang-tools-10
clang++ -s -O3 main.cpp -o main && time ./main

# common factors probability = 39.19 for 1_000_000 pairs of random numbers.
# common factors probability = 1 - 6/π² = 39.21
# all prime common factors probability = 27.46
# real    0m7.560s
# user    0m7.547s
# sys     0m0.000s

exit

# clang --target=wasm32 -s -Os -nostdlib -Wl,--no-entry -Wl,--export-all -o ./static/js/main.wasm main.c
# 382 bytes

#  tell linker to drop unused sections (-Wl,--gc-sections): https://elinux.org/images/2/2d/ELC2010-gc-sections_Denys_Vlasenko.pdf
clang --target=wasm32 -s -Os -nostdlib -Wl,--no-entry -Wl,--export-all -Wl,--gc-sections -o ./static/js/main.wasm main.c
# 369 bytes
ls -lh ./static/js/*.wasm

wasm2wat ./static/js/main.wasm | code -
wasm2js  ./static/js/main.wasm | code -

# llc --version | code -

# C to LLVM IR:
# clang --target=wasm32 -emit-llvm -c -S main.c

# LLVM IR to object file:
# llc -march=wasm32 -filetype=obj main.ll
# wasm-objdump -x main.o | code -

# https://lld.llvm.org/WebAssembly.html
# which wasm-ld 
# wasm-ld --version
# wasm-ld --no-entry --export-all -o main.wasm main.o
# ls -lh ./static/js/*.wasm
```