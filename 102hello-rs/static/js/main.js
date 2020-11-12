'use strict';

fetch('js/main.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes))
  .then(results => {
    let wasm = results.instance.exports;
    document.title = "version:" + wasm.version();

    function wasm2StringZ(offset) {
      let str = '';
      const buf = new Uint8Array(wasm.memory.buffer, offset);
      for (let i = 0; buf[i] != 0; i++) {
        str += String.fromCharCode(buf[i]);
      }
      return str;
    }

    window.button1onclick = () => {
      div1.innerHTML = wasm2StringZ(wasm.hello());
    };
  }
  )
  .catch(console.error);

