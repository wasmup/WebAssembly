package main

import (
	"syscall/js"
	"time"
)

var (
	window   = js.Global()
	document = window.Get("document")
)

func add(this js.Value, args []js.Value) interface{} {
	var c int = args[0].Int() + args[1].Int()
	return js.ValueOf(c)
}

func setTitle(this js.Value, args []js.Value) interface{} {
	document.Set("title", args[0].String())
	div1 := document.Call("getElementById", "div1")
	div1.Set("innerText", time.Now().String())
	return nil
}

func main() {
	window.Set("add", js.FuncOf(add))
	document.Set("setTitle", js.FuncOf(setTitle))
	// document.Call("JSfn") // panic: syscall/js: Value.Call: property JSfn is not a function, got undefined
	window.Call("JSfn") // Call JS function window.JSfn from Wasm
	select {}
}
