"use strict";
import init, {
  square,
  range,
  separate_thousands,
  factorial_big,
  factorial,
  fib,
  hello,
  version
} from "./bindgen.js";

init("js/main.wasm")
  .then(() => {
    document.title = "version:" + version();

    // let buttonRange = document.getElementById("buttonRange");
    function numberOnChange() {
      let v = range(numberRange.value);
      let sqr = square(v);
      textareaRange.value = v + "\n" + sqr;
    }
    numberRange.addEventListener("change", numberOnChange);
    buttonRange.addEventListener("click", numberOnChange);

    let text1 = document.getElementById("text1");
    let div1 = document.getElementById("div1");
    let button1 = document.getElementById("button1");
    button1.addEventListener("click", () => {
      div1.innerHTML = hello(text1.value);
    });

    let number1 = document.getElementById("number1");
    let span1 = document.getElementById("span1");
    let button2 = document.getElementById("button2");
    function number1OnChange() {
      span1.innerText = separate_thousands(String(factorial(number1.value)));
    }
    number1.addEventListener("change", number1OnChange);
    button2.addEventListener("click", number1OnChange);

    let number3 = document.getElementById("number3");
    let textarea1 = document.getElementById("textarea1");
    let button3 = document.getElementById("button3");
    let spanLength = document.getElementById("spanLength");

    function digits() {
      let n = String(textarea1.value.length);
      spanLength.innerText = separate_thousands(n);
    }
    digits();

    button3.addEventListener("click", () => {
      textarea1.value = fib(number3.value);
      digits();
    });

    let button4 = document.getElementById("button4");
    button4.addEventListener("click", () => {
      textarea1.value = factorial_big(number3.value);
      digits();
    });

    let button5 = document.getElementById("button5");
    button5.addEventListener("click", () => {
      textarea1.value = "";
      spanLength.innerText = "0";
    });

    let buttonSeparateThousands = document.getElementById(
      "buttonSeparateThousands"
    );
    buttonSeparateThousands.addEventListener("click", () => {
      textarea1.value = separate_thousands(textarea1.value);
    });
  })
  .catch(console.error);
