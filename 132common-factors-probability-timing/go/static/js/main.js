if (!WebAssembly.instantiateStreaming) { // polyfill
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
        const source = await (await resp).arrayBuffer();
        return await WebAssembly.instantiate(source, importObject);
    };
}
const go = new Go();
WebAssembly.instantiateStreaming(fetch('js/main.wasm'), go.importObject)
    .then(result => {
        var mod = result.module;
        var inst = result.instance;
        go.run(inst);
        inst = WebAssembly.instantiate(mod, go.importObject); // reset instance
        console.log("JavaScript: Hello.");
    })
    .catch((err) => {
        console.error(err);
    });