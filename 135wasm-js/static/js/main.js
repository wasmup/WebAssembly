function hi() {
    result1 = document.getElementById("result1");
    result1.textContent = "Hi from JS called from Wasm."
}

var importObj = {
    js: {
        import1: () => console.log("Hello world. (called from Wasm main)"),
        import2: () => hi(),
    }
};

fetch('js/demo.wasm').then(response =>
    response.arrayBuffer()
).then(buffer =>
    WebAssembly.instantiate(buffer, importObj)
).then(({ module, instance }) =>
    instance.exports.f()
);