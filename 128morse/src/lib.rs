#[macro_use]
extern crate lazy_static;

use std::ffi::{CStr, CString};
use std::mem;
use std::os::raw::{c_char, c_void};

#[no_mangle]
pub extern "C" fn malloc(capacity: usize) -> *mut c_void {
    let mut buf = Vec::with_capacity(capacity);
    let ptr = buf.as_mut_ptr();
    mem::forget(buf);
    return ptr as *mut c_void;
}

#[no_mangle]
pub extern "C" fn free(ptr: *mut c_void, capacity: usize) {
    let _ = unsafe { Vec::from_raw_parts(ptr, 0, capacity) };
}

#[no_mangle]
pub extern "C" fn decode(strz_ptr: *mut c_char) -> *mut c_char {
    let s = unsafe { CStr::from_ptr(strz_ptr) }.to_str().unwrap();
    let mut sb = String::new();
    let lines = s.lines();
    for line in lines {
        let s = line.trim();
        let letters = s.split_whitespace();
        for st in letters {
            match MORSE.get_by_right(&st) {
                Some(&c) => sb.push(c),
                _ => {}
            }
        }
        sb.push(' ');
    }
    let r = CString::new(sb).unwrap();
    r.into_raw()
}

#[no_mangle]
pub extern "C" fn encode(strz_ptr: *mut c_char) -> *mut c_char {
    let s = unsafe { CStr::from_ptr(strz_ptr) }.to_str().unwrap();
    let s = s.to_lowercase();
    let mut space = false;
    let mut sb = String::new();
    for c in s.chars() {
        if space {
            sb.push(' '); //print_letters_space();
        } else {
            space = true;
        }
        if c == ' ' || c == '\n' {
            sb.push('\n'); // print_words_space();
            space = false;
            continue;
        }
        match MORSE.get_by_left(&c) {
            Some(st) => sb.push_str(st),
            _ => {}
        }
    }
    sb.push('\n'); // print_words_space();
    let r = CString::new(sb).unwrap();
    r.into_raw()
}

// use std::collections::HashMap;
use bimap::BiMap;

lazy_static! {
    static ref MORSE: BiMap<char, &'static str> = {
        // let mut m = HashMap::new();
        let mut m = BiMap::new();
        m.insert('a', "01");
        m.insert('b', "1000");
        m.insert('c', "1010");
        m.insert('d', "100");
        m.insert('e', "0");
        m.insert('f', "0010");
        m.insert('g', "110");
        m.insert('h', "0000");
        m.insert('i', "00");
        m.insert('j', "0111");
        m.insert('k', "101");
        m.insert('l', "0100");
        m.insert('m', "11");
        m.insert('n', "10");
        m.insert('o', "111");
        m.insert('p', "0110");
        m.insert('q', "1101");
        m.insert('r', "010");
        m.insert('s', "000");
        m.insert('t', "1");
        m.insert('u', "001");
        m.insert('v', "0001");
        m.insert('w', "011");
        m.insert('x', "1001");
        m.insert('y', "1011");
        m.insert('z', "1100");
        m.insert('1', "01111");
        m.insert('2', "00111");
        m.insert('3', "00011");
        m.insert('4', "00001");
        m.insert('5', "00000");
        m.insert('6', "10000");
        m.insert('7', "11000");
        m.insert('8', "11100");
        m.insert('9', "11110");
        m.insert('0', "11111");
        m.insert('.', "010101");
        m.insert(',', "110011");
        m.insert('?', "001100");
        m.insert('\'', "011110");
        m.insert('!', "101011");
        m.insert('/', "10010");
        m.insert('(', "10110");
        m.insert(')', "101101");
        m.insert('&', "01000");
        m.insert(':', "111000");
        m.insert(';', "101010");
        m.insert('=', "10001");
        m.insert('+', "01010");
        m.insert('-', "100001");
        m.insert('_', "001101");
        m.insert('"', "010010");
        m.insert('$', "0001001");
        m.insert('@', "0110101");
        m
    };
}

/*
https://en.wikipedia.org/wiki/Morse_code

let t_dot = 1; // unit
let t_dash = 3 ;
let t_space = 1;
let t_letters = 3 ;
let t_words = 7 ;
*/
