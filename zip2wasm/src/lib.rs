use wasm_bindgen::prelude::*;

use flate2::read::DeflateDecoder;
use std::io::Read;

#[wasm_bindgen]
pub extern "C" fn unzip(zip: &[u8]) -> Vec<u8> {
    let mut r = DeflateDecoder::new(&zip[..]);
    let mut buffer = Vec::new();
    r.read_to_end(&mut buffer).unwrap();
    return buffer;
}
