// Package main implemets the Conway's game of life.
// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
// Any on cell with two or three neighbors remains on.
// Any off cell with three on neighbors becomes a on cell.
// All other on cells turns off in the next generation. Similarly, all other off cells stay off.
package main

import (
	"fmt"
	"math/rand"
	"strconv"
	"strings"
	"syscall/js"
	"time"
)

type slice []byte

var (
	window   = js.Global()
	document = window.Get("document")

	timer     *time.Timer
	totalTime time.Time
	t0        time.Time
	ms        = 1 * time.Millisecond

	w, h    int = 32, 32
	wh          = w * h
	a, b, c     = make(slice, w*h), make(slice, w*h), make(slice, w*h)

	table1      = getElementBy("table1")
	div1        = getElementBy("div1")
	div2        = getElementBy("div2")
	text1       = getElementBy("text1")
	buttonApply = getElementBy("buttonApply")
	buttonNew   = getElementBy("buttonNew")
	buttonStart = getElementBy("buttonStart")
	buttonClear = getElementBy("buttonClear")
	checkbox1   = getElementBy("checkbox1")
)

func btnClick(this js.Value, args []js.Value) interface{} {
	id := this.Get("id").String()
	yx := strings.Split(id, "_")
	y, err := strconv.ParseInt(yx[0], 10, 64)
	if err != nil {
		fmt.Println("String to int conversion error!")
	}
	x, err := strconv.ParseInt(yx[1], 10, 64)
	if err != nil {
		fmt.Println("String to int conversion error!")
	}
	index := int(x) + int(y)*w
	a[index] ^= 1
	if a[index] == 1 { // if (this.getAttribute("class") == "on") {
		this.Call("setAttribute", "class", "on")
	} else {
		this.Call("setAttribute", "class", "off")
	}
	return nil
}

func clear() {
	stop()
	for i := 0; i < wh; i++ {
		a[i] = 0
	}
}

func createTable1() {
	table1.Set("innerHTML", js.ValueOf(""))
	for y := 0; y < h; y++ {
		tr := createElement("tr")
		for x := 0; x < w; x++ {
			td := createElement("td")
			td.Call("setAttribute", "id", fmt.Sprintf("%d_%d", y, x))
			if a[x+y*w] == 1 {
				td.Call("setAttribute", "class", "on")
			} else {
				td.Call("setAttribute", "class", "off")
			}
			addEventListener(td, "click", btnClick)
			tr.Call("appendChild", td)
		}
		table1.Call("appendChild", tr)
	}
}

func buttonClearClick(this js.Value, args []js.Value) interface{} {
	clear()
	createTable1()
	return nil
}

func newBoard() {
	clear()
	for i := 0; i < wh/3; i++ {
		a[rand.Intn(wh)] = 1
	}
	createTable1()
}

func buttonNewClick(this js.Value, args []js.Value) interface{} {
	newBoard()
	return nil
}

func buttonApplyClick(this js.Value, args []js.Value) interface{} {
	n, err := strconv.ParseInt(text1.Get("value").String(), 10, 64)
	if err != nil {
		window.Call("alert", "Enter a number for time interval in ms.")
	}
	if n == 0 {
		n = 1
	}
	ms = time.Duration(n) * time.Millisecond

	text1.Set("value", fmt.Sprint(n))
	div1.Set("innerText", js.ValueOf(fmt.Sprintf("time set to %dms", n)))
	return nil
}

func start() {
	buttonStart.Set("value", "Stop")
	timer1Tick()
}

func stop() {
	buttonStart.Set("value", "Start")
	// clearTimeout(timer)
	if timer != nil {
		timer.Stop()
		// result := timer.Stop()
		// To ensure the channel is empty after a call to Stop, check the
		// return value and drain the channel.
		// if result == false {
		// <-timer.C
		// }
		timer = nil
	}
}

func buttonStartClick(this js.Value, args []js.Value) interface{} {
	if buttonStart.Get("value").String() == "Start" {
		if checkbox1.Get("checked").Bool() {
			for i := 0; i < wh; i++ {
				c[i] = a[i]
			}
		}
		totalTime = time.Now()
		start()
	} else {
		stop()
	}
	return nil
}

func predictNextState(x, y int) byte {
	v := a[x+y*w]
	count := -v
	for i := -1; i <= 1; i++ {
		for j := -1; j <= 1; j++ {
			xi, yj := x+i, y+j
			if xi < 0 || xi >= w || yj < 0 || yj >= h {
				continue
			}
			count += a[xi+yj*w]
		}
	}
	if count == 3 || (count == 2 && v == 1) {
		return 1
	}
	return 0
}

func timer1Tick() {
	t1 := time.Now()
	div2.Set("innerText", fmt.Sprintf("interval = %dms", t1.Sub(t0).Milliseconds()))
	t0 = t1

	for y := 0; y < h; y++ {
		for x := 0; x < w; x++ {
			b[x+y*w] = predictNextState(x, y)
		}
	}
	// a, b = b, a
	done := true
	for y := 0; y < h; y++ {
		for x := 0; x < w; x++ {
			v := b[x+y*w]      // new
			if a[x+y*w] != v { // only toggle changed states:
				td := getElementBy(fmt.Sprintf("%d_%d", y, x))
				if v == 1 {
					td.Call("setAttribute", "class", "on")
				} else {
					td.Call("setAttribute", "class", "off")
				}
				a[x+y*w] = v
				done = false
			}
		}
	}
	if done {
		stop()
		div1.Set("innerText", fmt.Sprintf("Total time = %dms", time.Now().Sub(totalTime).Milliseconds()))
	} else {
		timer = time.AfterFunc(ms, timer1Tick) // timer = setTimeout(timer1_Tick, ms);
	}
}

func getElementBy(id string) js.Value {
	return document.Call("getElementById", id)
}

func createElement(tag string) js.Value {
	return document.Call("createElement", tag)
}

func addEventListener(element js.Value, eventListenerName string, fn func(this js.Value, args []js.Value) interface{}) {
	element.Call("addEventListener", eventListenerName, js.FuncOf(fn))
}

func onkeyup(this js.Value, args []js.Value) interface{} {
	e := window.Get("event")
	x := e.Get("keyCode").Int()
	// altKey := e.Get("altKey").Bool()
	// if altKey {
	switch x {
	case 27: // ESC key
		stop()
		break
	case 83: // s
		buttonStartClick(this, args)
		break
	case 78: // n
		buttonNewClick(this, args)
		break
	case 65: // a
		buttonApplyClick(this, args)
		break
	case 84: // t
		text1.Call("focus")
		break
	}
	// }
	return nil
}

// CreateTable1 loads user view.
func CreateTable1(this js.Value, args []js.Value) interface{} {
	createTable1()
	return nil
}

func setWasmAindexValue(this js.Value, args []js.Value) interface{} {
	a[args[0].Int()] = byte(args[1].Int())
	return nil
}

func getWh(this js.Value, args []js.Value) interface{} {
	return wh
}

func getWasmAindexValue(this js.Value, args []js.Value) interface{} {
	return a[args[0].Int()]
}

func getWasmCindexValue(this js.Value, args []js.Value) interface{} {
	return c[args[0].Int()]
}

func main() {
	window.Set("getWh", js.FuncOf(getWh))
	window.Set("getWasmAindexValue", js.FuncOf(getWasmAindexValue))
	window.Set("getWasmCindexValue", js.FuncOf(getWasmCindexValue))
	window.Set("setWasmAindexValue", js.FuncOf(setWasmAindexValue))
	window.Set("CreateTable1", js.FuncOf(CreateTable1))
	addEventListener(buttonApply, "click", buttonApplyClick)
	addEventListener(buttonNew, "click", buttonNewClick)
	addEventListener(buttonStart, "click", buttonStartClick)
	addEventListener(document, "keyup", onkeyup)
	addEventListener(buttonClear, "click", buttonClearClick)
	newBoard()
	select {}
}
