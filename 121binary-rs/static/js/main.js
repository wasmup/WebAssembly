var wasm = {};
fetch('js/main.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes))
  .then(results => {
    wasm = results.instance.exports;

    let input1 = document.getElementById("input1ID");
    let bits1 = document.getElementById("bits1ID");
    let checkbox1 = document.getElementById("checkbox1ID");
    let button1 = document.getElementById("button1ID");

    function show(st, signed, id2, id10, id16) {
      document.getElementById(id2).textContent = st;
      document.getElementById(id10).textContent = cp2js(wasm.to_decimal(signed, cp2wasm(st)));
      document.getElementById(id16).textContent = cp2js(wasm.to_hex(cp2wasm(st)));
    }

    function onChange() {
      let signed = checkbox1.checked;

      let st = cp2js(wasm.to_binary(bits1.value, cp2wasm(input1.value)));
      show(st, signed, "divBase2ID", "divBase10ID", "divBase16ID");

      let ones = cp2js(wasm.ones_complement(cp2wasm(st)));
      show(ones, signed, "div1sCompBase2ID", "div1sCompBase10ID", "div1sCompBase16ID");

      let twos = cp2js(wasm.twos_complement(cp2wasm(st)));
      show(twos, signed, "div2sCompBase2ID", "div2sCompBase10ID", "div2sCompBase16ID");
    }

    input1.addEventListener("change", onChange);
    bits1.addEventListener("change", onChange);
    checkbox1.addEventListener("change", onChange);
    onChange();

    button1.addEventListener("click", () => {
      let signed = checkbox1.checked;
      let st = document.getElementById("text1ID").value
      input1.value = cp2js(wasm.to_decimal(signed, cp2wasm(st)));
      onChange();
    });
  }).catch(console.error);

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


var jsCalc = document.getElementById("jsCalc");
var jsCalcHistory = document.getElementById("jsCalcHistory");
document.getElementById("buttonCalc").addEventListener("click", () => {
  jsCalcHistory.value = jsCalc.value + "\n" + jsCalcHistory.value;
  jsCalc.value = eval(jsCalc.value);
});
