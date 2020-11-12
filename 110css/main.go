package main

import "syscall/js"

func main() {
	window := js.Global()
	document := window.Get("document")

	// document.Set("title", "Welcome")

	body := document.Get("body")
	body.Call("setAttribute", "style", `background: linear-gradient(green, white, red);`)

	topLeft := document.Call("getElementById", "top-left")
	topLeft.Call("setAttribute", "style", `background: linear-gradient(to right, green, white, red);`)

	topRight := document.Call("getElementById", "top-right")
	topRight.Call("setAttribute", "style", `background: linear-gradient(to right, red, white, green);`)

	botLeft := document.Call("getElementById", "bot-left")
	botLeft.Set("innerHTML", botLeft.Get("innerHTML").String()+"<br>Bye")

	center := document.Call("getElementById", "center")
	center.Set("innerHTML", "Hello <b>Wasm</b>")

	// window.Call("alert", "Hi")
}
