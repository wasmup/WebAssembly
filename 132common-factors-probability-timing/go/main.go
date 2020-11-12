package main

import (
	"fmt"
	"math"
	"math/rand"
	"sort"
	"time"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}
func rnd(min, max uint32) uint32 {
	return min + uint32(rand.Int63n(int64(max-min)))
}
func factors(n uint32) []uint32 {
	var v []uint32
	q := uint32(math.Sqrt(float64(n)))
	for i := uint32(2); i <= q; i++ {
		if n%i == 0 {
			v = append(v, i)
			m := n / i
			if i != m {
				v = append(v, m)
			}
		}
	}
	sort.Slice(v, func(i, j int) bool { return v[i] < v[j] })
	return v
}

// sorted a,b
func intersection(a, b []uint32) (v []uint32) {
	if len(b) == 0 {
		return
	}
	j := 0
	for i := range a {
		for b[j] < a[i] {
			j++
			if j >= len(b) {
				return
			}
		}
		if a[i] == b[j] {
			v = append(v, a[i])
		}
	}
	return
}
func separateThousands(st string) (s string) {
	rs := []rune(st)
	for i := range rs {
		if ((i % 3) == 0) && (i != 0) {
			s = "_" + s
		}
		s = string(rs[len(rs)-1-i]) + s
	}
	return
}

func countCommonFactor(min, max uint32, n int) string {
	cfp := 100.0 * (1.0 - 6.0/math.Pow(math.Pi, 2.0))
	commonFactors := 0
	for i := 0; i < n; i++ {
		a := rnd(min, max)
		b := rnd(min, max)
		fa := factors(a)
		fb := factors(b)
		fab := intersection(fa, fb)
		if len(fab) > 0 {
			commonFactors++
		}
	}
	probability := float64(commonFactors) * 100.0 / float64(n)
	return fmt.Sprintf(`common factors probability = %.2f%% for %s pairs of random numbers.
common factors probability = 1 - 6/π² = %.2f%%`,
		probability, separateThousands(fmt.Sprint(n)), cfp,
	)
}

// What is the probability that they have all common prime factor(s)?
func countPrimeFactor(min, max uint32, n int) string {
	cfp := 100.0 * (1.0 - 6.0/math.Pow(math.Pi, 2.0))
	commonFactors := 0
	countPrimeFactor := 0
	for i := 0; i < n; i++ {
		a := rnd(min, max)
		b := rnd(min, max)
		fa := factors(a)
		fb := factors(b)
		fab := intersection(fa, fb)
		if len(fab) > 0 {
			commonFactors++
			allPrime := true
			for _, i := range fab {
				if !isPrime(i) {
					allPrime = false
					break
				}
			}
			if allPrime {
				countPrimeFactor++
			}
		}
	}
	probability := float64(commonFactors) * 100.0 / float64(n)
	probabilityCountPrimeFactor := float64(countPrimeFactor) * 100.0 / float64(n)

	return fmt.Sprintf(`common factor probability = %.4f%% for %s pairs of random numbers.
common factors probability = 1 - 6/π² = %.4f%%
all prime common factors probability = %.4f%%`,
		probability, separateThousands(fmt.Sprint(n)), cfp, probabilityCountPrimeFactor)
}

func main() {
	var min, max uint32 = 1, 1_000_000
	fmt.Println(countPrimeFactor(min, max, 1_000_000))
}

func isPrime(n uint32) bool {
	if n == 2 {
		return true
	}
	if n < 2 {
		return false
	}
	if (n & 1) == 0 {
		return false // there is no even prime except 2
	}
	q := uint32(math.Sqrt(float64(n)))
	for i := uint32(3); i <= q; i += 2 {
		if n%i == 0 {
			return false
		}
	}
	return true
}
