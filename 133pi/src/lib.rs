use rand::distributions::{Distribution, Uniform};
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn version() -> String {
    "1.0.4".into()
}

#[wasm_bindgen]
pub fn pi(n: u32) -> f64 {
    let max: u64 = 1_000_000;
    let max2 = max * max;
    let between = Uniform::from(0..max);
    let mut rng = rand::thread_rng();
    let mut count = 0;
    for _ in 0..n {
        let x = between.sample(&mut rng);
        let y = between.sample(&mut rng);
        if x * x + y * y <= max2 {
            count += 1
        }
    }
    4.0 * (count as f64) / n as f64
}

#[wasm_bindgen]
pub fn pi2(n: u32) -> f64 {
    use rand::Rng;
    let mut rng = rand::thread_rng();
    let mut count = 0;
    for _ in 0..n {
        let x: f32 = rng.gen();
        let y: f32 = rng.gen();
        if x * x + y * y <= 1.0 {
            count += 1
        }
    }
    4.0 * (count as f64) / n as f64
}
