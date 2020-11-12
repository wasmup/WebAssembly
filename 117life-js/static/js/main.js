'use strict';


// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
// Any on cell with two or three neighbors survives.
// Any off cell with three on neighbors becomes a on cell.
// All other on cells die in the next generation. Similarly, all other off cells stay off.

let timer;
let iterations = 0;
let totalTime = 0;
let t0 = 0;
let ms = 1;
let w = 32;
let h = 32;
let wh = w * h;
let a = new Uint8Array(wh);
let b = new Uint8Array(wh);
let c = new Uint8Array(wh);
let div1 = document.getElementById("div1");
let div2 = document.getElementById("div2");
let div3 = document.getElementById("div3");
let text1 = document.getElementById("text1");
let buttonApply = document.getElementById("buttonApply");
let buttonStart = document.getElementById("buttonStart");
let buttonClear = document.getElementById("buttonClear");
let buttonSave = document.getElementById("buttonSave");
let buttonLoad = document.getElementById("buttonLoad");
let checkbox1 = document.getElementById("checkbox1");

function btn_Click() {
    let yx = this.id.split("_");
    let y = Number(yx[0]);
    let x = Number(yx[1]);
    let index = x + y * w;
    a[index] ^= 1;
    if (this.getAttribute("class") == "on") {//if (a[index] == 0) { 
        this.setAttribute("class", "off");
    } else {
        this.setAttribute("class", "on");
    }
}

function clear() {
    stop();
    for (let i = 0; i < wh; i++) {
        a[i] = 0;
    }
}

function createTable1() {
    table1.innerHTML = ""; // while (table1.rows.length > 0) { table1.deleteRow(0); }
    for (let y = 0; y < h; y++) {
        let tr = document.createElement("tr")
        for (let x = 0; x < w; x++) {
            let td = document.createElement("td")
            td.setAttribute("id", y + "_" + x);
            if (a[x + y * w] === 1) {
                td.setAttribute("class", "on");
            } else {
                td.setAttribute("class", "off");
            }
            td.onclick = btn_Click;
            tr.appendChild(td);
        }
        table1.appendChild(tr);
    }
}

function buttonClear_Click() {
    clear();
    createTable1();
}

function buttonNew_Click() {
    clear();
    for (let i = 0; i < (wh / 3); i++) {
        a[Math.trunc(Math.random() * wh)] = 1;
    }
    createTable1();
}

function buttonApply_Click() {
    ms = text1.value;
    div1.innerText = `time set to ${ms}ms`;
}

function start() {
    buttonStart.value = "Stop";
    timer1_Tick();
}

function stop() {
    buttonStart.value = "Start";
    clearTimeout(timer);
}

function buttonStart_Click() {
    if (buttonStart.value == "Start") {
        if (checkbox1.checked) {
            for (let i = 0; i < wh; i++) {
                c[i] = a[i];
            }
        }
        totalTime = performance.now();
        iterations = 0;
        start();
    } else {
        stop();
    }
}

function predictNextState(x, y) {
    let v = a[x + y * w];
    let count = -v;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let xi = x + i;
            let yj = y + j;
            if (xi < 0 || xi >= w || yj < 0 || yj >= h) {
                continue;
            }
            count += a[xi + yj * w];
        }
    }
    if (count == 3 || (count == 2 && v == 1)) {
        return 1;
    }
    return 0;
}

function timer1_Tick() {
    let t1 = performance.now();
    div2.innerText = "interval = " + Math.trunc(t1 - t0) + "ms";
    t0 = t1;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            b[x + y * w] = predictNextState(x, y);
        }
    }
    iterations += 1;
    let done = true;
    // Show state:
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            let v = b[x + y * w]; // new
            if (a[x + y * w] !== v) {  // only toggle changed states:
                let td = document.getElementById(y + "_" + x);
                if (v === 1) {
                    td.setAttribute("class", "on");
                } else {
                    td.setAttribute("class", "off");
                }
                a[x + y * w] = v;
                done = false;
            }
        }
    }
    if (done) {
        stop();
        div1.innerText = "Total time = " + Math.trunc(performance.now() - totalTime) + "ms";
        div3.innerText = "Number of iterations = " + iterations;
    } else {
        timer = setTimeout(timer1_Tick, ms);
    }
}

function onkeyup(e) {
    e = e || window.event; // for IE to cover IEs window event-object
    let x = e.keyCode;
    switch (x) {
        case 27: // the ESC key
            stop();
            break;
        case 83: // s
            buttonStart_Click();
            break;
        case 78: // n
            buttonNew_Click();
            break;
        case 65: // a
            buttonApply_Click();
            break;
        case 84: // t
            text1.focus();
            break;
    }
}

function buttonSave_Click() {
    let src = a;
    if (checkbox1.checked) {
        src = c;
    }
    let blb = new Blob([src], { type: 'application/octet-stream' });
    let url = URL.createObjectURL(blb);
    let x = document.createElement("a");
    x.href = url;
    x.download = "all.bin";
    x.click();
    x.remove();
}

async function readFileAsArrayBuffer() {

    let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        reader.readAsArrayBuffer('js/main.wasm');
    });

    console.log(result_base64);
    return result_base64;
}

function buttonLoad_Click() {
    if (buttonLoad.files.length > 0) {
        let blob = buttonLoad.files[0];
        let reader = new FileReader();
        reader.addEventListener("loadend", function () {
            a = new Uint8Array(reader.result);
            createTable1();
        });
        reader.readAsArrayBuffer(blob);
    }
}

buttonApply.addEventListener("click", buttonApply_Click);
document.getElementById("buttonNew").addEventListener("click", buttonNew_Click);
buttonStart.addEventListener("click", buttonStart_Click);
document.addEventListener("keyup", onkeyup, false);
buttonClear.addEventListener("click", buttonClear_Click);
buttonSave.addEventListener("click", buttonSave_Click);
buttonLoad.addEventListener("change", buttonLoad_Click);
buttonNew_Click();
