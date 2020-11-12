// wasm2js generated:

function vin($0, $1, $2) {
    $0 = +$0;
    $1 = +$1;
    $2 = +$2;
    return +(($0 + $1) * $2 / $1);
}

function vout($0, $1, $2) {
    $0 = +$0;
    $1 = +$1;
    $2 = +$2;
    return +($1 * $2 / ($0 + $1));
}

function r1($0, $1, $2) {
    $0 = +$0;
    $1 = +$1;
    $2 = +$2;
    return +(($1 - $2) * $0 / $2);
}

function r2($0, $1, $2) {
    $0 = +$0;
    $1 = +$1;
    $2 = +$2;
    return +($0 * $2 / ($1 - $2));
}

function p_r1($0, $1, $2) {
    $0 = +$0;
    $1 = +$1;
    $2 = +$2;
    $1 = $1 - $2;
    return +($1 * $1 / $0);
}

function p_r2($0, $1) {
    $0 = +$0;
    $1 = +$1;
    return +($1 * $1 / $0);
}

function i_r1($0, $1, $2) {
    $0 = +$0;
    $1 = +$1;
    $2 = +$2;
    return +(($1 - $2) / $0);
}

function rth($0, $1) {
    $0 = +$0;
    $1 = +$1;
    return +($0 * $1 / ($0 + $1));
}

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
    PR1.innerText = p_r1(R1.value, Vin.value, Vout.value);
    PR2.innerText = p_r2(R2.value, Vout.value);
    IR1.innerText = i_r1(R1.value, Vin.value, Vout.value);
    RTh.innerText = rth(R1.value, R2.value);
    Isc.innerText = Vin.value / R1.value;
}

document.getElementById("buttonVin").addEventListener("click", () => {
    Vin.value = vin(R1.value, R2.value, Vout.value);
    calc();
});

document.getElementById("buttonVout").addEventListener("click", () => {
    Vout.value = vout(R1.value, R2.value, Vin.value);
    calc();
});

function R1calc() {
    R1.value = r1(R2.value, Vin.value, Vout.value);
    calc();
}
document.getElementById("buttonR1").addEventListener("click", R1calc);

document.getElementById("buttonR2").addEventListener("click", () => {
    R2.value = r2(R1.value, Vin.value, Vout.value);
    calc();
});

R1calc();



var jsCalc = document.getElementById("jsCalc");
var jsCalcHistory = document.getElementById("jsCalcHistory");
document.getElementById("buttonCalc").addEventListener("click", () => {
    jsCalcHistory.value = jsCalc.value + "\n" + jsCalcHistory.value;
    jsCalc.value = eval(jsCalc.value);
});
