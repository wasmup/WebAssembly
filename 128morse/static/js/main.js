'use strict';

let wasm = {};
fetch('js/main.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes))
  .then(results => {
    wasm = results.instance.exports;

    let button1 = document.getElementById("button1");
    let button2 = document.getElementById("button2");
    let textarea1 = document.getElementById("textarea1");
    let textarea2 = document.getElementById("textarea2");

    document.getElementById("button1").addEventListener("click", () => {
      let buf = utf16To8(textarea1.value);
      let ptr = wasm.encode(buf);
      wasm.free(buf);

      textarea2.value = utf8To16(ptr);
      wasm.free(ptr);
    });

    document.getElementById("button2").addEventListener("click", () => {
      let buf = utf16To8(textarea2.value);
      let ptr = wasm.decode(buf);
      wasm.free(buf);

      textarea1.value = utf8To16(ptr);
      wasm.free(ptr);
    });

  }).catch(console.error);


// utf16To8 copies the input string to Wasm UTF-8 stringZ and returns the Wasm memory pointer.
function utf16To8(str) {
  const utf8Encoder = new TextEncoder("UTF-8");
  let u8buf = utf8Encoder.encode(str)
  let len = u8buf.length
  let offset = wasm.malloc(len + 1)
  let memory = new Uint8Array(wasm.memory.buffer);
  for (let i = 0; i < len; i++) {
    memory[offset + i] = u8buf[i]
  }
  memory[offset + len] = 0;
  return offset;
}

// utf8To16 copies the UTF-8 string zero from Wasm.
function utf8To16(offset) {
  const collectSTZ = function* () {
    let memory = new Uint8Array(wasm.memory.buffer);
    while (memory[offset] !== 0) {
      if (memory[offset] === undefined) { throw new Error("undefined wasm mem") }
      yield memory[offset]
      offset += 1
    }
  }
  const utf8Decoder = new TextDecoder("UTF-8");
  const bytes = new Uint8Array(collectSTZ())
  const utf8buf = utf8Decoder.decode(bytes);
  return utf8buf
}