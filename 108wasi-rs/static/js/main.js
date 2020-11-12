'use strict';

fetch('js/main.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes))
  .then(results => {
    let wasm = results.instance.exports;
    window.factorial = wasm.factorial;
    document.title = "version:" + wasm.version();
  })
  .catch(console.error);

function button1onclick() {
  let number1 = document.getElementById("number1");
  let result1 = document.getElementById("result1");
  result1.textContent = factorial(number1.value);
}