'use strict';
import { pi2, pi, version, default as init } from './bindgen.js';

init('js/main.wasm').then(() => {
  document.title = "version:" + version();

  let numberRun = document.getElementById("numberRun");
  document.getElementById("buttonRun").addEventListener("click", () => {
    let t0 = performance.now();
    let s = pi(numberRun.value);
    let t1 = performance.now();
    document.getElementById("textareaRun").value = s + " (" + Math.PI + ")\nSimulation time = " + Math.trunc(t1 - t0) + "ms";
  });

  document.getElementById("buttonRun2").addEventListener("click", () => {
    let t0 = performance.now();
    let s = pi2(numberRun.value);
    let t1 = performance.now();
    document.getElementById("textareaRun2").value = s + " (" + Math.PI + ")\nSimulation time = " + Math.trunc(t1 - t0) + "ms";
  });

}).catch(console.error);

