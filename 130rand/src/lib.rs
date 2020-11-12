use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn version() -> String {
    "1.0.0".into()
}

#[wasm_bindgen]
pub fn rand(min: u32, max: u32) -> u32 {
    use rand::Rng;
    rand::thread_rng().gen_range(min, max)
}
