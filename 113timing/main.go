package main

import (
	"fmt"
	"math"
	"runtime"
	"sync"
)

var nCPU = runtime.NumCPU()

func main() {
	// fmt.Println("NumCPU:", nCPU) // 8
	n := uint64(math.MaxUint64) // find maxPrime64
	for !isOddPrime(n) {
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

// Go 5 seconds to find maxPrime64. Core:Second = {4:7.0 5:6.7 6:5.9, 7:5.2, 8:5.0, 9:12.0}
func isOddPrime(n uint64) bool {
	q := uint64(math.Sqrt(float64(n)))
	step := q / uint64(nCPU)
	if step&1 == 1 {
		step++ // make it even
	}

	var wg sync.WaitGroup
	wg.Add(nCPU)
	isPrime := true
	start := uint64(3)

	for k := 0; k < nCPU; k++ {

		end := start + step
		if end > q {
			end = q
		}

		go func(i, end uint64) {
			for ; isPrime && i <= end; i += 2 {
				if n%i == 0 {
					isPrime = false // done
				}
			}
			wg.Done()
		}(start, end)

		start = end + 2
	}

	wg.Wait()
	return isPrime
}
