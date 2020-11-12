use flate2::write::DeflateEncoder;
use flate2::Compression;
use std::fs::File;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    let args: Vec<String> = std::env::args().collect();
    let mut buffer = Vec::<u8>::new();
    if args.len() >= 2 {
        let mut file = File::open(args[1].clone())?;
        file.read_to_end(&mut buffer)?;
    } else {
        std::io::stdin().read_to_end(&mut buffer)?;
    }

    let mut w = DeflateEncoder::new(Vec::new(), Compression::default());
    w.write_all(&buffer)?;
    let zip = w.finish()?;

    if args.len() >= 3 {
        let mut w = File::create(args[2].clone())?;
        w.write_all(&zip)?;
    } else {
        std::io::stdout().write_all(&zip)?;
    }
    Ok(())
}
