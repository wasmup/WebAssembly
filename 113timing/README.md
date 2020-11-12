# Timing Go vs WebAssembly vs JavaScript to find the bigest 64-bit prime number 18446744073709551557

| Cores | Go    | Wasm  | C     | JS   |    
|-------|-------|-------|-------|------|    
| 8     | 5.12s | 37.5s |       |      |    
| 1     | 23.3s | 34.5s | 21.9s | 628s |    

```sh
time go run .
# real    0m5.121s
# user    0m39.265s
# sys     0m0.024s
time GOOS=js GOARCH=wasm go build -o main.wasm  
time node wasm_exec.js main.wasm 
# real    0m37.504s
# user    0m38.896s
# sys     0m0.064s

cd one-core
time go run .
# real    0m23.324s
# user    0m23.426s
# sys     0m0.110s
GOOS=js GOARCH=wasm go build -o main.wasm  
time node ../wasm_exec.js main.wasm 
# real    0m34.509s
# user    0m35.980s
# sys     0m0.056s

cd js
time node main.jsj
# big: 18446744073709551615n
# Prime: 18446744073709551557n
# real    10m28.528s
# user    10m28.170s
# sys     0m6.403s
```

