package main

import (
	"fmt"
	"strconv"
	"strings"
	"syscall/js"
)

var (
	window   = js.Global()
	document = window.Get("document")
)

// sieve returns odd prime positions: isPrime:buf[i]==0; prim:2*i+1
func sieve(n uint64) []uint8 {
	const notPrime = 1 // 0: is prime
	if n < 3 {
		return nil
	}
	p := (n + 1) / 2
	buf := make([]uint8, p) // number = 2*index+1
	buf[0] = notPrime       // the 1 is not a prime
	p = 3                   // start from first odd prime
	for i := p * p; i <= n; i = p * p {
		for j := i; j <= n; j += 2 * p { // just odd numbers
			buf[j/2] = notPrime // number = 2*index+1
		}
		for p += 2; buf[p/2] == notPrime; p += 2 { // find next available number
		}
	}
	return buf
}

func genPrimes(this js.Value, args []js.Value) interface{} {
	text1 := document.Call("getElementById", "text1").Get("value")
	max, err := strconv.ParseInt(text1.String(), 10, 64)
	if err != nil {
		window.Call("alert", err.Error())
	}

	primes := sieve(uint64(max))
	sb := &strings.Builder{}
	fmt.Fprint(sb, 2, " ")
	for i, v := range primes {
		if v == 0 {
			fmt.Fprint(sb, 2*i+1, " ")
		}
	}

	document.Call("getElementById", "textarea1").Set("value", sb.String())
	return nil
}

func main() {
	document.Call("getElementById", "button1").Call("addEventListener", "click", js.FuncOf(genPrimes))
	document.Call("getElementById", "textarea1").Set("value", "WebAssembly is here, ready.")
	select {}
}
