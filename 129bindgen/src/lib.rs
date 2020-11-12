use num_bigint::BigUint;
use num_traits::{One, Zero};
use std::mem::replace;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn version() -> String {
    "1.0.2".into()
}

#[wasm_bindgen]
pub fn hello(name: String) -> String {
    format!("Hello <b>{}</b> from <b>Rust WebAssembly</b>", name)
}

#[wasm_bindgen]
pub fn fib(n: usize) -> String {
    let mut f0: BigUint = Zero::zero();
    let mut f1: BigUint = One::one();
    for _ in 0..n {
        let f2 = f0 + &f1;
        // This is a low cost way of swapping f0 with f1 and f1 with f2.
        f0 = replace(&mut f1, f2);
    }
    f0.to_str_radix(10)
}

#[wasm_bindgen]
pub fn factorial(n: u32) -> u64 {
    let mut f = 1;
    for i in 2..=(n as u64) {
        f *= i;
    }
    f
}

#[wasm_bindgen]
pub fn factorial_big(n: u32) -> String {
    let big_1: BigUint = 1u32.into();
    let mut f: BigUint = 1u32.into();
    let mut i: BigUint = 2u32.into();
    for _ in 2..=n {
        f = f * &i;
        i = i + &big_1;
    }
    f.to_str_radix(10)
}

#[wasm_bindgen]
pub fn separate_thousands(st: String) -> String {
    let mut s = String::new();
    for (i, v) in st.chars().rev().enumerate() {
        if ((i % 3) == 0) && (i != 0) {
            s.insert(0, '_');
        }
        s.insert(0, v);
    }
    s
}

#[wasm_bindgen]
pub fn range(n: u32) -> Vec<u32> {
    (0..n).collect()
}

#[wasm_bindgen]
pub fn square(v: Vec<u32>) -> Vec<u32> {
    v.iter().map(|x| x * x).collect()
}
