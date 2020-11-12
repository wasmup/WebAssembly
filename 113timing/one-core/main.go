package main

import (
	"fmt"
	"math"
	"runtime"
)

var nCPU = runtime.NumCPU()

func main() {
	n := uint64(math.MaxUint64) // find maxPrime64
	for !isOddPrime1Core(n) {
		n -= 2
	}
	fmt.Println("maxPrime64:", n) // 18446744073709551557
}

// Go: 23.3 seconds to find maxPrime64, GoWasm:34.5s
func isOddPrime1Core(n uint64) bool {
	q := uint64(math.Sqrt(float64(n)))
	for i := uint64(3); i <= q; i += 2 {
		if n%i == 0 {
			return false
		}
	}
	return true
}
