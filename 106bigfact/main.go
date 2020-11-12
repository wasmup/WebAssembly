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

func factorial(n int64) string {
	f := big.NewInt(1)
	one := big.NewInt(1)
	max := big.NewInt(n)
	for i := big.NewInt(2); i.Cmp(max) <= 0; i.Add(i, one) {
		f.Mul(f, i)
	}
	return f.String()
}

func button1Click(this js.Value, args []js.Value) interface{} {
	text1value := document.Call("getElementById", "text1").Get("value")
	n, err := strconv.ParseInt(text1value.String(), 10, 64)
	if err != nil {
		document.Call("alert", "Enter a number.")
		return nil
	}
	setInnerText("div1", factorial(n))
	return nil
}

func addEventListener(id, eventListenerName string, fn func(this js.Value, args []js.Value) interface{}) {
	document.Call("getElementById", id).Call("addEventListener", eventListenerName, js.FuncOf(fn))
}

func setInnerText(id string, html interface{}) {
	document.Call("getElementById", id).Set("innerText", js.ValueOf(html))
}

func innerText(id string) js.Value {
	return document.Call("getElementById", id).Get("innerText")
}

func main() {
	timeZero := time.Now()
	goTime := timeZero.UnixNano() / 1_000_000
	setInnerText("div3", fmt.Sprint(goTime))
	pageTime, err := strconv.ParseInt(innerText("div2").String(), 10, 64)
	if err != nil {
		fmt.Println(err)
	}
	goTime -= pageTime
	setInnerText("div4", "Go-page time:"+fmt.Sprint(goTime)+"ms")
	setInnerText("div1", "Push the factorial button, then you are good to go.")
	addEventListener("button1", "click", button1Click)
	select {}
}
