"use strict";
import init, { rand, version } from "./bindgen.js";

init("js/main.wasm")
  .then(() => {
    document.title = "version:" + version();

    let textareaRand = document.getElementById("textareaRand");
    let numberMin = document.getElementById("numberMin");
    let numberMax = document.getElementById("numberMax");
    let buttonRand = document.getElementById("buttonRand");

    function numberOnChange() {
      textareaRand.value = rand(numberMin.value, numberMax.value);
    }
    numberMin.addEventListener("change", numberOnChange);
    numberMax.addEventListener("change", numberOnChange);
    buttonRand.addEventListener("click", numberOnChange);
  })
  .catch(console.error);
