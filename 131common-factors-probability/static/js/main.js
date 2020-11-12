"use strict";
import init, {
  count_prime_factor,
  count_common_factor,
  intersection,
  factors,
  rand,
  version
} from "./bindgen.js";

init("js/main.wasm")
  .then(() => {
    document.title = "version:" + version();

    let textareaRand = document.getElementById("textareaRand");
    let numberMin = document.getElementById("numberMin");
    let numberMax = document.getElementById("numberMax");
    let buttonRand = document.getElementById("buttonRand");
    function doIt(a, b) {
      let fa = factors(a);
      let fb = factors(b);
      let fab = intersection(fa, fb);
      textareaRand.value =
        "a: " +
        a +
        ", factors: " +
        fa +
        "\n\nb: " +
        b +
        ", factors: " +
        fb +
        "\n\nCommon factors: " +
        fab;
    }
    function numberOnChange() {
      let a = rand(numberMin.value, numberMax.value);
      let b = rand(numberMin.value, numberMax.value);
      doIt(a, b);
    }
    numberMin.addEventListener("change", numberOnChange);
    numberMax.addEventListener("change", numberOnChange);
    buttonRand.addEventListener("click", numberOnChange);

    let numberA = document.getElementById("numberA");
    let numberB = document.getElementById("numberB");
    let buttonAB = document.getElementById("buttonAB");
    function numberAbOnChange() {
      let a = numberA.value;
      let b = numberB.value;
      doIt(a, b);
    }
    numberA.addEventListener("change", numberAbOnChange);
    numberB.addEventListener("change", numberAbOnChange);
    buttonAB.addEventListener("click", numberAbOnChange);

    let buttonN = document.getElementById("buttonN");
    let numberIterations = document.getElementById("numberIterations");
    let textareaIterations = document.getElementById("textareaIterations");
    buttonN.addEventListener("click", () => {
      let t0 = performance.now();
      let s = count_common_factor(
        numberMin.value,
        numberMax.value,
        numberIterations.value
      );
      let t1 = performance.now();
      textareaIterations.value =
        s + "\nSimulation time = " + Math.trunc(t1 - t0) + "ms";
    });

    let buttonPrime = document.getElementById("buttonPrime");
    buttonPrime.addEventListener("click", () => {
      let t0 = performance.now();
      let s = count_prime_factor(
        numberMin.value,
        numberMax.value,
        numberIterations.value
      );
      let t1 = performance.now();
      textareaIterations.value =
        s + "\nSimulation time = " + Math.trunc(t1 - t0) + "ms";
    });

    let buttonN2 = document.getElementById("buttonN2");
    let numberIterations2 = document.getElementById("numberIterations2");
    let textareaIterations2 = document.getElementById("textareaIterations2");
    buttonN2.addEventListener("click", () => {
      textareaIterations2.value = "";
      let n = Number(numberIterations2.value);
      let s = "";
      let j = 1;
      for (let i = 0; i < n; i++) {
        let a = rand(numberMin.value, numberMax.value);
        let b = rand(numberMin.value, numberMax.value);
        let fa = factors(a);
        let fb = factors(b);
        let fab = intersection(fa, fb);
        if (fab.length > 0) {
          s =
            j +
            ": a: " +
            a +
            ",b: " +
            b +
            ", Common factors: " +
            fab +
            "\n" +
            s;
          j += 1;
        }
      }
      textareaIterations2.value = s;
    });
  })
  .catch(console.error);
