# Step by step Hello World from Go WebAssembly

```sh
# Run once for a new project:
cp $GOROOT/misc/wasm/wasm_exec.html ./static/
cp $GOROOT/misc/wasm/wasm_exec.js ./static/

# Run when main.go changed:
GOOS=js GOARCH=wasm go build -o ./static/test.wasm
ls -lh ./static/*.wasm
# GOOS=js GOARCH=wasm go build -ldflags "-s" -o ./static/test.wasm

# Run the static file server at background:
go run web/main.go &
# Now open the web page using your web browser at: http://127.0.0.1:8080/static/wasm_exec.html

firefox http://127.0.0.1:8080/static/wasm_exec.html
google-chrome http://127.0.0.1:8080/static/wasm_exec.html
opera http://127.0.0.1:8080/static/wasm_exec.html
```

Now Open the **Browser Console**
Right click inside Browser then select **Inspect** then select **Console** (Ctrl+Shift+I))
and now click on the `Run` button, then you will see the `Hello World`.
