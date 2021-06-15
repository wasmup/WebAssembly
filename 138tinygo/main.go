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
	div := document.Call("createElement", "div")
	div.Set("id", "div1")

	body := document.Call("getElementById", "body")
	body.Call("appendChild", div)

	div1 := document.Call("getElementById", "div1")
	div1.Set("innerText", fmt.Sprint("5! =", factorial(5)))

	select {}
}

func factorial(n int32) int32 {
	var f int32 = 1
	for i := int32(2); i <= n; i++ {
		f *= i
	}
	return f
}
