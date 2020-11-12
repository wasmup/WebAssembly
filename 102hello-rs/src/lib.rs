use std::ffi::CString;
use std::os::raw::c_char;

static HELLO: &'static str = "Hello from <b>Rust WebAssembly.</b>";

#[no_mangle]
pub fn hello() -> *mut c_char {
    let s = CString::new(HELLO).unwrap();
    s.into_raw()
}

#[no_mangle]
pub extern "C" fn version() -> u32 {
    2
}
