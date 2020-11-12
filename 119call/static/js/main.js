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

        // document.getElementById("div1").innerText = add(10, 20);
        div1.innerText = add(1000, 2000);

        // setTitle("JS"); // ReferenceError: setTitle is not defined. Note: It's available on document(index.html).

        jsFun = function () {
            console.log(inst);
            div1.innerHTML = "Right click <b>Inspect</b> then click <b>Console</b> tab";
        }
        jsFun();
    })
    .catch((err) => {
        console.error(err);
    });

// Call JS function window.JSfn from Wasm
function JSfn() {
    document.title = "JSfn called."
}