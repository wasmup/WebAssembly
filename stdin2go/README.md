# Convert stdin file stream to Go array at stdout

```sh
go install

stdin2go < favicon.ico > favary.go

```

Sample `favary.go` file:

```golang
package main

var favAry = [...]byte{0, 0, 1, 1}
```
