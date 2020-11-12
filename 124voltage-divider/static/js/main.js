var wasm = {};
fetch('js/main.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes))
  .then(results => {
    wasm = results.instance.exports;

    var Vin = document.getElementById("Vin");
    var Vout = document.getElementById("Vout");
    var R1 = document.getElementById("R1");
    var R2 = document.getElementById("R2");
    var PR1 = document.getElementById("PR1");
    var PR2 = document.getElementById("PR2");
    var IR1 = document.getElementById("IR1");
    var RTh = document.getElementById("RTh");
    var Isc = document.getElementById("Isc");

    function calc() {
      PR1.innerText = wasm.p_r1(R1.value, Vin.value, Vout.value);
      PR2.innerText = wasm.p_r2(R2.value, Vout.value);
      IR1.innerText = wasm.i_r1(R1.value, Vin.value, Vout.value);
      RTh.innerText = wasm.rth(R1.value, R2.value);
      Isc.innerText = Vin.value/R1.value;
    }

    document.getElementById("buttonVin").addEventListener("click", () => {
      Vin.value = wasm.vin(R1.value, R2.value, Vout.value);
      calc();
    });

    document.getElementById("buttonVout").addEventListener("click", () => {
      Vout.value = wasm.vout(R1.value, R2.value, Vin.value);
      calc();
    });

    function R1calc() {
      R1.value = wasm.r1(R2.value, Vin.value, Vout.value);
      calc();
    }
    document.getElementById("buttonR1").addEventListener("click", R1calc);

    document.getElementById("buttonR2").addEventListener("click", () => {
      R2.value = wasm.r2(R1.value, Vin.value, Vout.value);
      calc();
    });

    R1calc();

  }).catch(console.error);




var jsCalc = document.getElementById("jsCalc");
var jsCalcHistory = document.getElementById("jsCalcHistory");
document.getElementById("buttonCalc").addEventListener("click", () => {
  jsCalcHistory.value = jsCalc.value + "\n" + jsCalcHistory.value;
  jsCalc.value = eval(jsCalc.value);
});
