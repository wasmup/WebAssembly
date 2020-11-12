let wasm = null;

let retry = 0;
for (; retry < 3; retry++) {
  try {
    WebAssembly.instantiateStreaming(fetch('js/zip2wasm.wasm'))
      .then(result => wasm = result.instance.exports);// .catch(console.error);
    retry = 99;
  } catch (e) {
    console.error(e)
  }
}
if (retry !== 100) {
  alert("Reload page: Error loading js/zip2wasm.wasm");
}

let cachegetUint8Memory = null;
function getUint8Memory() {
  if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm(arg) {
  const ptr = wasm.__wbindgen_malloc(arg.length * 1);
  getUint8Memory().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

let cachegetInt32Memory = null;
function getInt32Memory() {
  if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory;
}

function getArrayU8FromWasm(ptr, len) {
  return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

function unzipUint8Array(zip) {
  if (!wasm) {
    alert("Reload page: js/zip2wasm.wasm not loaded correctly!");
  }
  const retptr = 8;
  const ret = wasm.unzip(retptr, passArray8ToWasm(zip), WASM_VECTOR_LEN);
  const memi32 = getInt32Memory();
  const v0 = getArrayU8FromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
  wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
  return v0;
}

const go = new Go();
try {
  fetch('js/main.zip')
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(unzipUint8Array(new Uint8Array(bytes)), go.importObject))
    .then(result => go.run(result.instance));
} catch (e) {
  alert("Reload page: Error loading js/main.zip" + e);
}

const res = document.getElementById("result")
const his = document.getElementById("history")
const bits = document.getElementById("bits")

function addToHistory(v) {
  his.value = v + "\n" + his.value;
}

function solve() {
  addToHistory(res.value);
  res.value = eval(res.value);
}

function apnd(v) {
  res.value += v
}

function clr() {
  res.value = ''
}

function clrHistory() {
  his.value = ''
}

function bracket(v) {
  res.value = v + "(" + res.value + ")";
}

function bigToDecimal() {
  big = BigInt(res.value);
  res.value = big.toString(10);
}

function bigToOctal() {
  big = BigInt(res.value);
  res.value = "0o" + big.toString(8);
}

function bigToBinary() {
  big = BigInt(res.value);
  if (big < 0) {
    big = bitNot(-big);
  }
  res.value = "0b" + big.toString(2);
}

function bitCut() {
  big = BigInt(res.value);
  if (big < 0) {
    big = bitNot(-big);
  }
  v = big.toString(2);
  n = bits.value;
  len = v.length
  if (len > n) {
    v = v.substr(len - n, n); // v.substr(- n, n);
  }
  res.value = "0b" + v;
}

function bitwiseNot() {
  big = BigInt(res.value);
  big += 1n;
  big = -big;
  res.value = big;
}

function bigToHex() {
  big = BigInt(res.value);
  if (big < 0) {
    big = bitNot(-big);
  }
  res.value = '0x' + big.toString(16);
}

function bitNot(v) {
  v = (v).toString(2)
  while (v.length % 8) { v = '0' + v; }
  var prefix = '';
  if ('1' === v[0] && -1 !== v.slice(1).indexOf('1')) {
    prefix = '11111111';
  }
  v = v.split('').map(function (i) {
    return '0' === i ? '1' : '0';
  }).join('');
  return BigInt('0b' + prefix + v) + BigInt(1);
}

function shiftRight() {
  res.value = BigInt(res.value) >> 1n;
}

function shiftLeft() {
  res.value = BigInt(res.value) << 1n;
}
