// #include <cstdint>
#include <algorithm>
#include <bits/stdc++.h>
#include <cmath>
#include <iostream>
#include <vector>
using namespace std;

// #include <stdio.h>
// #include <stdbool.h>
// #include <time.h>
// #include <limits.h>
// #include <stdlib.h>

bool is_prime(uint32_t n) {
  uint32_t i, q;
  if (n == 2)
    return true;
  if (n < 2)
    return false;
  if ((n & 1) == 0) // there is no even prime except 2
    return false;
  q = sqrt(n);
  for (i = 3; i <= q; i += 2) {
    if (n % i == 0)
      return false;
  }
  return true;
}

// st must have (n - 1) / 3 more space.
void separate_thousands(char *st) {
  int i = 4; // copy char* ending zero
  int sep;
  char *q, *p = st;
  int n = 0;
  while (*p) {
    n++;
    p++;
  }
  if (n < 4)
    return;
  sep = (n - 1) / 3;
  q = p + sep;
  while (sep--) {
    while (i--) {
      *q-- = *p--;
    }
    *q-- = '_';
    i = 3;
  }
}

uint32_t rnd(uint32_t min, uint32_t max) {
  return min +
         (uint32_t)((max - min) * (((double)rand()) / ((double)RAND_MAX)));
}

vector<uint32_t> factors(uint32_t n) {
  vector<uint32_t> v;
  uint32_t q = sqrt(n);
  for (int i = 2; i <= q; i++) {
    if (n % i == 0) {
      v.push_back(i);
      uint32_t m = n / i;
      if (i != m) {
        v.push_back(m);
      }
    }
  }
  sort(v.begin(), v.end());
  return v;
}

// sorted a,b
vector<uint32_t> intersection(vector<uint32_t> a, vector<uint32_t> b) {
  vector<uint32_t> v;
  vector<uint32_t>::iterator biter = b.begin();
  if (biter == b.end()) {
    return v;
  }
  for (const auto &i : a) {
    while (*biter < i) {
      biter++;
      if (biter == b.end()) {
        return v;
      }
    }
    if (i == *biter) {
      v.push_back(i);
    }
  }
  return v;
}

// select two random number:
// What is the probability that they have all common factor(s)?
string countCommonFactor(uint32_t min, uint32_t max, int n) {
  auto cfp = 100.0 * (1.0 - 6.0 / pow(M_PI, 2.0));
  auto commonFactors = 0;
  for (auto i = 0; i < n; i++) {
    auto a = rnd(min, max);
    auto b = rnd(min, max);
    auto fa = factors(a);
    auto fb = factors(b);
    auto fab = intersection(fa, fb);
    if (fab.size() > 0) {
      commonFactors++;
    }
  }
  auto probability = ((double)commonFactors) * 100.0 / (double)n;
  auto nstr = std::to_string(n);
  auto nln = nstr.length();
  nln = nln + 1 + (nln - 1) / 3;
  char *s = new char[nln];
  strcpy(s, nstr.c_str());
  separate_thousands(s);
  std::ostringstream out;
  out << "common factors probability = " << setprecision(2) << probability
      << " for " << s;
  out << " pairs of random numbers." << endl;
  out << "common factors probability = 1 - 6/π² = " << cfp;
  return out.str();
}

// select two random number:
// What is the probability that they have all common prime factor(s)?
string countPrimeFactor(uint32_t min, uint32_t max, int n) {
  auto cfp = 100.0 * (1.0 - 6.0 / pow(M_PI, 2.0));
  auto commonFactors = 0;
  auto countPrimeFactor = 0;
  for (auto i = 0; i < n; i++) {
    auto a = rnd(min, max);
    auto b = rnd(min, max);
    auto fa = factors(a);
    auto fb = factors(b);
    auto fab = intersection(fa, fb);
    if (fab.size() > 0) {
      commonFactors++;
      auto allPrime = true;
      for (const auto &i : fab) {
        if (!is_prime(i)) {
          allPrime = false;
          break;
        }
      }
      if (allPrime) {
        countPrimeFactor++;
      }
    }
  }
  auto probability = ((double)commonFactors) * 100.0 / (double)n;
  auto probabilityCountPrimeFactor =
      ((double)countPrimeFactor) * 100.0 / (double)n;
  auto nstr = std::to_string(n);
  auto nln = nstr.length();
  nln = nln + 1 + (nln - 1) / 3;
  char *s = new char[nln];
  strcpy(s, nstr.c_str());
  separate_thousands(s);
  std::ostringstream out;
  out << "common factors probability = " << setprecision(4) << probability
      << " for " << s;
  out << " pairs of random numbers." << endl;
  out << "common factors probability = 1 - 6/π² = " << cfp << endl;
  out << "all prime common factors probability = "
      << probabilityCountPrimeFactor;
  return out.str();
}

int main() {
  auto s = countPrimeFactor(1, 1000000, 1000000);
  cout << s << endl;
}
/*
clang++ -s -O3 main.cpp -o main && time ./main

common factors probability = 39.19 for 1_000_000 pairs of random numbers.
common factors probability = 1 - 6/π² = 39.21
all prime common factors probability = 27.46

real    0m7.560s
user    0m7.547s
sys     0m0.000s

common factors probability = 39 for 1_000_000 pairs of random numbers.
common factors probability = 1 - 6/π² = 39

real    0m7.672s
user    0m7.672s
sys     0m0.000s

export CPLUS_INCLUDE_PATH=/usr/include/c++/8:/usr/include/x86_64-linux-gnu/c++/8
[CPLUS_INCLUDE_PATH](https://clang.llvm.org/docs/CommandGuide/clang.html)

export LLVM_LIB_SEARCH_PATH=/usr/lib/gcc/x86_64-linux-gnu/8

echo $LLVM_LIB_SEARCH_PATH
echo $CPLUS_INCLUDE_PATH


clang++  -L/usr/lib/gcc/x86_64-linux-gnu/8 main.cpp -o main && ./main

clang++ -I/usr/include/c++/8 -I/usr/include/x86_64-linux-gnu/c++/8
-L/usr/lib/gcc/x86_64-linux-gnu/8 main.cpp -o main && ./main

clang -s --target=wasm32 -O3 -nostdlib -Wl,--no-entry -Wl,--export-all -o
main.wasm main.c

clang -lm -o main main.cpp && ./main
[Setting Up Your
Environment](https://releases.llvm.org/3.0/docs/GettingStarted.html#environment):
```sh

export CFLAGS="-I$LOCAL/include"     # for the C compiler
export CXXFLAGS="-I/usr/include/c++/8 -I/usr/include/x86_64-linux-gnu/c++/8"   #
for the C++ compiler export LDFLAGS="-L/usr/lib/gcc/x86_64-linux-gnu/8"        #
for the linker

clang++ --help | code -
```
 */