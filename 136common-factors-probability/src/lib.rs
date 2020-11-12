use std::collections::HashSet;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn version() -> String {
    "2.0.0".into()
}

#[wasm_bindgen]
pub fn rand(min: u32, max: u32) -> u32 {
    use rand::Rng;
    rand::thread_rng().gen_range(min, max)
}

#[wasm_bindgen]
pub fn intersection(a: &[u32], b: &[u32]) -> Vec<u32> {
    let mut v: Vec<u32> = Vec::new();
    let mut b_iter = b.iter();
    if let Some(mut bi) = b_iter.next() {
        for ai in a {
            while bi < ai {
                bi = match b_iter.next() {
                    Some(bi) => bi,
                    None => return v,
                };
            }
            if ai == bi {
                v.push(*ai);
            }
        }
    }
    v
}

#[wasm_bindgen]
pub fn factors(n: u32) -> Vec<u32> {
    let mut v: Vec<u32> = factors_set(n).into_iter().collect();
    v.sort();
    v
}

fn factors_set(n: u32) -> HashSet<u32> {
    let mut v = HashSet::new();
    let q = (n as f64).sqrt() as u32;
    for i in 2..=q {
        if n % i == 0 {
            v.insert(i);
            v.insert(n / i);
        }
    }
    v
}

#[wasm_bindgen]
pub fn count_common_factor(min: u32, max: u32, n: u32) -> String {
    let cfp = 100.0 * (1.0 - 6.0 / std::f64::consts::PI.powf(2.0));
    let mut common_factors = 0;
    for _ in 0..n {
        let a = rand(min, max);
        let b = rand(min, max);
        let a_set = factors_set(a);
        let b_set = factors_set(b);
        let mut intersection = a_set.intersection(&b_set);
        if let Some(_) = intersection.next() {
            common_factors += 1;
        }
    }
    let probability = (common_factors as f64) * 100.0 / (n as f64);
    format!(
        "common factors probability = {:.2}% for {} pairs of random numbers.\ncommon factors probability = 1 - 6/π² = {:.2}%",
        probability, separate_thousands(n.to_string()), cfp,
    )
}

// What is the probability that they have common prime factor?
#[wasm_bindgen]
pub fn count_prime_factor(min: u32, max: u32, n: u32) -> String {
    let cfp = 100.0 * (1.0 - 6.0 / std::f64::consts::PI.powf(2.0));
    let mut common_factors = 0;
    let mut count_prime_factor = 0;
    for _ in 0..n {
        let a = rand(min, max);
        let b = rand(min, max);
        let a_set = factors_set(a);
        let b_set = factors_set(b);
        let ab = a_set.intersection(&b_set);
        let fab: Vec<_> = ab.into_iter().collect();
        if fab.len() > 0 {
            common_factors += 1;
            let mut all_prime = true;
            for &i in fab {
                if !is_prime(i) {
                    all_prime = false;
                    break;
                }
            }
            if all_prime {
                count_prime_factor += 1;
            }
        }
    }
    let probability = (common_factors as f64) * 100.0 / (n as f64);
    let probability_count_prime_factor = (count_prime_factor as f64) * 100.0 / (n as f64);
    format!(
        r#"common factor probability = {:.4}% for {} pairs of random numbers.
common factors probability = 1 - 6/π² = {:.4}%
all prime common factors probability = {:.4}%"#,
        probability,
        separate_thousands(n.to_string()),
        cfp,
        probability_count_prime_factor
    )
}

#[wasm_bindgen]
pub fn is_prime(n: u32) -> bool {
    if n == 2 {
        return true;
    }
    if n < 2 {
        return false;
    }
    if (n & 1) == 0 {
        return false; // there is no even prime except 2
    }
    let q = (n as f64).sqrt() as u32;
    for i in (3..=q).step_by(2) {
        if (n % i) == 0 {
            return false;
        }
    }
    true
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
