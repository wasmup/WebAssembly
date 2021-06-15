# Simple static file server

```sh
go get
go install -ldflags=-s
file $(which goserve)

# Start the server inside wasmup folder or set your URL to your index.html file inside your web browser:
goserve
```
