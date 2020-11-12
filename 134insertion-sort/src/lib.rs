use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn version() -> String {
    "1.0.2".into()
}

#[wasm_bindgen]
pub fn rand(min: u32, max: u32) -> u32 {
    use rand::Rng;
    rand::thread_rng().gen_range(min, max)
}

#[wasm_bindgen]
pub fn to_vec(s: String) -> Vec<i32> {
    let s: String = s.chars().filter(|&c| !"<>[]{}()".contains(c)).collect();
    s.split(|c: char| c == ',' || c == ' ')
        .filter_map(|s| s.parse().ok())
        .collect()
    // .map(|s| s.trim())
    // .filter(|s| !s.is_empty())
    // .map(|s| s.parse().unwrap())
    // .collect()
}

#[wasm_bindgen]
pub fn insertion_sort(a: &mut [i32]) {
    for j in 1..a.len() {
        let key = a[j];
        let mut i = j;
        while i > 0 && a[i - 1] > key {
            a[i] = a[i - 1];
            i -= 1;
        }
        a[i] = key;
    }
}
