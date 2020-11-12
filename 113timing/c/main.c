#include <limits.h>
#include <math.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>

bool is_prime(uint64_t n)
{
  uint64_t i, q;
  // if (n == 2)
  //   return true;
  // if (n < 2)
  //   return false;
  // if ((n & 1) == 0) // there is no even prime except 2
  //   return false;
  q = sqrt(n);
  for (i = 3; i <= q; i += 2)
  {
    if (n % i == 0)
      return false;
  }
  return true;
}
int main()
{                          // Largest 64 bit prime
  uint64_t n = ULLONG_MAX; // 18_446_744_073_709_551_615
  while (is_prime(n) == false)
    n -= 2;
  printf(" %ju \n", n); // 18446744073709551557
  return 0;
}

/*

# compile with link-time-optimization
clang -flto -O3 -c main.c -o main.o
clang -flto -lm main.o -o main
time ./main
real    0m23.147s
user    0m23.142s
sys     0m0.001s

clang -S -emit-llvm main.c
# To compile LLVM IR further to assembly, use the llc tool:
llc main.ll


clang main.c -Wall -O2 -o main -lm && time ./main
real    0m24.452s
user    0m24.445s
sys     0m0.004s

clang main.c -Wall -O3 -o main -lm && time ./main
real    0m23.348s
user    0m23.342s
sys     0m0.000s

gcc main.c -O3 -o main -lm && time ./main
real    0m21.999s
user    0m21.999s
sys     0m0.001s

gcc main.c -Ofast -o main -lm && time ./main
real    0m24.295s
user    0m24.287s
sys     0m0.000s
gcc main.c -o main -lm && ./main
time ./main
real    0m24.167s
user    0m24.111s
sys     0m0.012s

clang -emit-llvm --target=wasm32 -S main.c -o main.ll
llc -march=wasm32 -filetype=asm main.ll -o main.s
s2wasm main.s -o main.wat
wat2wasm main.wat -o main.wasm

*/