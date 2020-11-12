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
    unsafe {
        let _temp = Vec::from_raw_parts(ptr, 0, capacity);
    }
}

#[no_mangle]
pub extern "C" fn to_binary(nbits: u8, strz_ptr: *mut c_char) -> *mut c_char {
    unsafe {
        let st = CStr::from_ptr(strz_ptr).to_str().unwrap();
        let mut n = st.parse::<i128>().unwrap();
        let mut s = String::new();
        for _ in 0..nbits {
            s.push(if (n & 1) == 1 { '1' } else { '0' });
            n >>= 1;
        }
        let s = s.chars().rev().collect::<String>();
        let r = CString::new(s).unwrap();
        r.into_raw()
    }
}

#[no_mangle]
pub extern "C" fn ones_complement(strz_ptr: *mut c_char) -> *mut c_char {
    unsafe {
        let st = CStr::from_ptr(strz_ptr).to_str().unwrap();
        let mut s = String::new();
        for c in st.bytes() {
            s.push(if c == b'0' { '1' } else { '0' });
        }
        let r = CString::new(s).unwrap();
        r.into_raw()
    }
}

fn twos_complement_rs(st: &str) -> String {
    let mut s = String::new();
    let mut first = false;
    for c in st.bytes().rev() {
        if first {
            s.push(if c == b'0' { '1' } else { '0' });
        } else {
            s.push(c as char);
            first = c == b'1';
        }
    }
    let s = s.chars().rev().collect::<String>();
    s
}

#[no_mangle]
pub extern "C" fn twos_complement(strz_ptr: *mut c_char) -> *mut c_char {
    unsafe {
        let st = CStr::from_ptr(strz_ptr).to_str().unwrap();
        let s = twos_complement_rs(st);
        let r = CString::new(s).unwrap();
        r.into_raw()
    }
}

#[no_mangle]
pub extern "C" fn to_decimal(signed: bool, strz_ptr: *mut c_char) -> *mut c_char {
    unsafe {
        let st = CStr::from_ptr(strz_ptr).to_str().unwrap();
        let mut inp = st.to_string();
        let mut signed = signed;
        if signed {
            signed = st.chars().next().unwrap() == '1';
        }
        if signed {
            inp = twos_complement_rs(st);
        }
        let mut u: u128 = 0;
        let mut pos: u128 = 1;
        for c in inp.bytes().rev() {
            if c == b'1' {
                u += pos;
            }
            pos <<= 1;
        }
        let mut s = u.to_string();
        if signed {
            s.insert(0, '-');
        }
        let r = CString::new(s).unwrap();
        r.into_raw()
    }
}
#[no_mangle]
pub extern "C" fn to_hex(strz_ptr: *mut c_char) -> *mut c_char {
    unsafe {
        let st = CStr::from_ptr(strz_ptr).to_str().unwrap();
        let mut s = String::new();
        let mut u: u8 = 0;
        let mut pos: u8 = 1;
        let mut i: u8 = 0;
        for c in st.bytes().rev() {
            if c == b'1' {
                u += pos;
            }
            pos <<= 1;
            i += 1;
            if i == 4 {
                i = 0;
                pos = 1;
                s += format!("{:x}", u).as_str();
                u = 0;
            }
        }
        if u != 0 {
            s += format!("{:x}", u).as_str();
        }
        let s = s.chars().rev().collect::<String>();
        let r = CString::new(s).unwrap();
        r.into_raw()
    }
}
