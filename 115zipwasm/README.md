# Calculator

```sh
ls -lh static/js/*.wasm

GOOS=js GOARCH=wasm go build -o static/js/main.wasm
cd static/js/
wasm2zip main.wasm main.zip
ls -lh main.*
rm main.wasm
```