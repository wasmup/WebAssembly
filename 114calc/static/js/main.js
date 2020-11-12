if (!WebAssembly.instantiateStreaming) { // polyfill
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
        const source = await (await resp).arrayBuffer();
        return await WebAssembly.instantiate(source, importObject);
    };
}
const go = new Go();
WebAssembly.instantiateStreaming(fetch('js/main.wasm'), go.importObject)
    .then(result => {
        var mod = result.module;
        var inst = result.instance;
        go.run(inst);
        inst = WebAssembly.instantiate(mod, go.importObject); // reset instance
    })
    .catch((err) => {
        console.error(err);
    });

const res = document.getElementById("result")
const his = document.getElementById("history")
const bits = document.getElementById("bits")

function solve() {
    his.value = res.value + "\n" + his.value;
    res.value = eval(res.value)
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