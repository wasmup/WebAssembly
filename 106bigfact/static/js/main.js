
var d = new Date();
var mainTime0 = d.getTime();
document.getElementById('div2').innerText = mainTime0;

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
    })
    .catch((err) => {
        console.error(err);
    });