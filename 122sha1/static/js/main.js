var wasm = {};
fetch('js/main.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes))
  .then(results => {
    wasm = results.instance.exports;

    var text1 = document.getElementById("text1");
    var div1 = document.getElementById("div1");

    text1.addEventListener("keyup", () => { div1.innerText = Sha1Digest(text1.value); });

  }).catch(console.error);

function Sha1Digest(str) {
  let buf = cp2wasm(str);
  let ptr = wasm.sha1_digest(buf);
  let r = cp2js(ptr);
  wasm.free(buf);
  return r;
}

// cp2wasm copies the input UTF-8 string to Wasm and returns the Wasm memory pointer.
function cp2wasm(str) {
  const utf8Encoder = new TextEncoder("UTF-8");
  let u8buf = utf8Encoder.encode(str)
  let len = u8buf.length
  let ptr = wasm.malloc(len + 1)
  let memory = new Uint8Array(wasm.memory.buffer);
  for (i = 0; i < len; i++) {
    memory[ptr + i] = u8buf[i]
  }
  memory[ptr + len] = 0;
  return ptr;
}

// cp2js copies the UTF-8 string zero from Wasm and makes the Wasm memory free.
function cp2js(ptr) {
  let freePtr = ptr;
  const collectSTZ = function* () {
    let memory = new Uint8Array(wasm.memory.buffer);
    while (memory[ptr] !== 0) {
      if (memory[ptr] === undefined) { throw new Error("undefined wasm mem") }
      yield memory[ptr]
      ptr += 1
    }
  }
  const bytes = new Uint8Array(collectSTZ())
  const utf8Decoder = new TextDecoder("UTF-8");
  const utf8buf = utf8Decoder.decode(bytes);
  wasm.free(freePtr);
  return utf8buf
}
