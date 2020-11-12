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
pub extern "C" fn sha1_digest(data: *mut c_char) -> *mut c_char {
    unsafe {
        let data = CStr::from_ptr(data);
        let mut m = sha1::Sha1::new();
        m.update(data.to_bytes());
        let dgst = m.digest().to_string();
        let s = CString::new(dgst).unwrap();
        s.into_raw()
    }
}
