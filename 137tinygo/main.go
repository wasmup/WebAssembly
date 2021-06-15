package main

import (
	"fmt"
	"syscall/js"
)

var (
	window   = js.Global()
	document = window.Get("document")
)

func main() {
	div1 := document.Call("getElementById", "div1")
	div1.Set("innerText", "5! = "+fmt.Sprint(factorial(5)))
}

func factorial(n int32) int32 {
	var f int32 = 1
	for i := int32(2); i <= n; i++ {
		f *= i
	}
	return f
}
