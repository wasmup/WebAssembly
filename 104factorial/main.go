package main

import "fmt"

func main() {
	fmt.Println(factorial(5))
}

func factorial(n int32) int32 {
	var f int32 = 1
	for i := int32(2); i <= n; i++ {
		f *= i
	}
	return f
}
