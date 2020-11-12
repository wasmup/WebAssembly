package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	p := new(arrayWriter)
	fmt.Print(preamble)
	io.Copy(p, os.Stdin)
	fmt.Println(end)
}

type arrayWriter struct {
	comma bool
}

func (p *arrayWriter) Write(buf []byte) (int, error) {
	for _, v := range buf {
		if p.comma {
			fmt.Printf(", %d", v)
		} else {
			fmt.Printf("%d", v)
			p.comma = true
		}
	}
	return len(buf), nil
}

const (
	preamble = `package main

var bytes = [...]byte{`
	end = `}`
)
