package main

import "syscall/js"

func main() {
	window := js.Global()
	document := window.Get("document")

	body := document.Get("body")
	body.Set("innerHTML", `
	<input type="text" id="text1" value="World." />
	<input type="button" id="button1" value="Say Hello" 
	onclick="document.getElementById('div1').innerHTML = 'Hello ' + document.getElementById('text1').value;"/>

	<div id="div1">Hi</div>
	`)
	select {}
}
