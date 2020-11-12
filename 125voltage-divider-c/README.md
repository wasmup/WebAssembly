```sh

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