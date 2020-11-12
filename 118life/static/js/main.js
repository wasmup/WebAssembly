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

// Call JS function window.JSfn from Wasm
function JSfn() {
    document.title = "JSfn called."
}

function buttonSave_Click() {
    let wh = getWh();
    let src = new Uint8Array(wh);

    if (checkbox1.checked) {
        for (let i = 0; i < src.length; i++) {
            src[i] = getWasmCindexValue(i);
        }
    } else {
        for (let i = 0; i < src.length; i++) {
            src[i] = getWasmAindexValue(i);
        }
    }

    let blb = new Blob([src], { type: 'application/octet-stream' });// 'text/plain'
    let url = URL.createObjectURL(blb);
    // window.open(url);
    let x = document.createElement("a");
    x.href = url;
    x.download = "all.bin";
    x.click();
    x.remove();
}

function buttonLoad_Click() {
    if (buttonLoad.files.length > 0) {
        let blob = buttonLoad.files[0];
        let reader = new FileReader();
        reader.addEventListener("loadend", function () {
            let a = new Uint8Array(reader.result);
            for (let i = 0; i < a.length; i++) {
                setWasmAindexValue(i, a[i]);
            }
            CreateTable1();
        });
        reader.readAsArrayBuffer(blob);
    }
    buttonLoad.value = "";
}

buttonSave.addEventListener("click", buttonSave_Click);
buttonLoad.addEventListener("change", buttonLoad_Click);
