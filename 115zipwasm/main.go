package main

import (
	"fmt"
	"math/big"
	"strconv"
	"syscall/js"
	"time"
)

var (
	window   = js.Global()
	document = window.Get("document")
)

func getElementBy(id string) js.Value {
	return document.Call("getElementById", id)
}

var (
	res = getElementBy("result")
	his = getElementBy("history")
)

func main() {
	t := time.Now()
	document.Set("isPrime", js.FuncOf(isPrime))
	document.Set("Factorial", js.FuncOf(Factorial))
	document.Set("TimeNow", js.FuncOf(TimeNow))
	document.Set("Length", js.FuncOf(Length))
	// document.Set("clr", js.FuncOf(clr))
	// document.Set("bracket", js.FuncOf(bracket))
	// document.Set("clrHistory", js.FuncOf(clrHistory))
	// document.Set("apnd", js.FuncOf(apnd))
	// document.Set("solve", js.FuncOf(solve))
	res.Set("value", fmt.Sprint(t.UnixNano()/1_000_000)+"n-"+res.Get("value").String())
	addToHistory("^: ms Wasm-JS Load time, " + t.String() + ": WebAssembly is here, ready.")
	select {}
}

func resultValue() string { return res.Get("value").String() }

func addToHistory(st string) { his.Set("value", st+"\n"+his.Get("value").String()) }

func addResultToHistory() { addToHistory(resultValue()) }

// TimeNow returns Time.Now.
func TimeNow(this js.Value, args []js.Value) interface{} {
	addToHistory(time.Now().String())
	return nil
}

// Length is to calculate the console string length.
func Length(this js.Value, args []js.Value) interface{} {
	addToHistory(fmt.Sprintf("The console content length is %d", len(resultValue())))
	return nil
}

// Factorial is exported to JavaScript
func Factorial(this js.Value, args []js.Value) interface{} {
	addResultToHistory()
	n, err := strconv.ParseInt(resultValue(), 10, 64)
	if err != nil {
		addToHistory("Enter just an integer number e.g. 5")
		return nil
	}
	res.Set("value", fact(n))
	return nil
}

// fact returns the factorial of numer n
func fact(n int64) string {
	f := big.NewInt(1)
	one := big.NewInt(1)
	max := big.NewInt(n)
	for i := big.NewInt(2); i.Cmp(max) <= 0; i.Add(i, one) {
		f.Mul(f, i)
	}
	return f.String()
}

// isPrime returns Yes or No
func isPrime(this js.Value, args []js.Value) interface{} {
	st := resultValue()
	n, ok := new(big.Int).SetString(st, 10)
	if !ok {
		addToHistory("Error: Enter just an integer number e.g. 5")
		return nil
	}
	factor := new(big.Int)
	if isprime(n, factor) {
		st = "It is a prime."
	} else if n.Cmp(big.NewInt(2)) < 0 {
		st = "It is not a prime."
	} else {
		st = "It is not a prime. It is divisible by " + factor.String()
	}
	addToHistory(st)
	return nil
}

func isprime(n, factor *big.Int) bool {
	two := big.NewInt(2)
	cmp := n.Cmp(two)
	switch {
	case cmp == 0: // n ==2
		return true
	case cmp < 0: // n<2
		factor.Set(n)
		return false
	case n.Bit(0) == 0: // is even
		factor.Set(two)
		return false
	}
	zero := big.NewInt(0)
	z := new(big.Int)
	r := new(big.Int)
	q := new(big.Int).Sqrt(n) //	q := uint64(math.Sqrt(float64(n)))
	for factor.Set(big.NewInt(3)); factor.Cmp(q) <= 0; factor.Add(factor, two) {
		z.QuoRem(n, factor, r)
		if r.Cmp(zero) == 0 {
			return false
		}
	}
	return true
}

// func apnd(_ js.Value, args []js.Value) interface{} {
// 	res.Set("value", resultValue()+args[0].String())
// 	return nil
// }

// func solve(js.Value, []js.Value) interface{} {
// 	addResultToHistory()
// 	res.Set("value", window.Call("eval", resultValue()))
// 	return nil
// }

// func clr(js.Value, []js.Value) interface{} {
// 	res.Set("value", "")
// 	return nil
// }

// func clrHistory(js.Value, []js.Value) interface{} {
// 	his.Set("value", "")
// 	return nil
// }

// func bracket(_ js.Value, args []js.Value) interface{} {
// 	res.Set("value", args[0].String()+"("+resultValue()+")")
// 	return nil
// }
