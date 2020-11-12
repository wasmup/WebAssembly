#[no_mangle]
pub extern "C" fn factorial(n: u32) -> u32 {
    let mut f = 1;
    for i in 2..=n {
        f *= i;
    }
    f
}

#[no_mangle]
pub extern "C" fn version() -> u32 {
    2
}
