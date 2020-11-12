# Rust WebAssembly

## Build
```sh
cargo clean
RUSTFLAGS='-C link-arg=-s' cargo build --release
ll /dev/shm/target/release/common-factors-probability-timing 
# 243_976
time /dev/shm/target/release/common-factors-probability-timing
# common factor probability = 39.2280% for 1_000_000 pairs of random numbers.
# common factors probability = 1 - 6/π² = 39.2073%
# all prime common factors probability = 27.5149%
# real    0m7.380s
# user    0m7.375s
# sys     0m0.004s

# Wasm:
# common factor probability = 39.1228% for 1_000_000 pairs of random numbers.
# common factors probability = 1 - 6/π² = 39.2073%
# all prime common factors probability = 27.4648%
# Simulation time = 9226ms

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
# real    0m9.362s
# user    0m9.611s
# sys     0m0.177s
time GOOS=js GOARCH=wasm go build -o static/js/main.wasm  
time node static/js/wasm_exec.js static/js/main.wasm 
# common factor probability = 39.1570% for 1_000_000 pairs of random numbers.
# common factors probability = 1 - 6/π² = 39.2073%
# all prime common factors probability = 27.4726%
# real    0m39.045s
# user    0m40.543s
# sys     0m0.100s
ll static/js/main.wasm
# 2_384_488
wasm-gc static/js/main.wasm
ll static/js/main.wasm
# 2_384_250
time node static/js/wasm_exec.js static/js/main.wasm 
# common factor probability = 39.2729% for 1_000_000 pairs of random numbers.
# common factors probability = 1 - 6/π² = 39.2073%
# all prime common factors probability = 27.5075%
# real    0m38.933s
# user    0m40.359s
# sys     0m0.100s


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