'use strict';
import { to_vec, insertion_sort, rand, version, default as init } from './bindgen.js';

init('js/main.wasm').then(() => {
  document.title = "version:" + version();

  let textarea1 = document.getElementById("textarea1");
  let textarea2 = document.getElementById("textarea2");
  let button1 = document.getElementById("button1");
  button1.addEventListener("click", () => {
    let r = to_vec(textarea1.value);
    insertion_sort(r);
    textarea2.value = r;
  });


}).catch(console.error);
