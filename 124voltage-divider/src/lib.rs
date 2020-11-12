#[no_mangle]
pub extern "C" fn vin(r1: f64, r2: f64, vout: f64) -> f64 {
    vout * (r1 + r2) / r2
}

#[no_mangle]
pub extern "C" fn vout(r1: f64, r2: f64, vin: f64) -> f64 {
    vin * r2 / (r1 + r2)
}

#[no_mangle]
pub extern "C" fn r1(r2: f64, vin: f64, vout: f64) -> f64 {
    r2 * (vin - vout) / vout
}

#[no_mangle]
pub extern "C" fn r2(r1: f64, vin: f64, vout: f64) -> f64 {
    r1 * vout / (vin - vout)
}

#[no_mangle]
pub extern "C" fn p_r1(r1: f64, vin: f64, vout: f64) -> f64 {
    let v = vin - vout;
    v * v / r1
}

#[no_mangle]
pub extern "C" fn p_r2(r2: f64, vout: f64) -> f64 {
    vout * vout / r2
}

#[no_mangle]
pub extern "C" fn i_r1(r1: f64, vin: f64, vout: f64) -> f64 {
    (vin - vout) / r1
}

#[no_mangle]
pub extern "C" fn rth(r1: f64, r2: f64) -> f64 {
    r1 * r2 / (r1 + r2)
}
