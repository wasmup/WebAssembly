# Rust 


```sh
cargo clean
RUSTFLAGS='-C link-arg=-s' cargo build --release --target x86_64-unknown-linux-musl
# Finished release [optimized] target(s) in 2m 53s 1_996_456 bytes
ll /dev/shm/target/x86_64-unknown-linux-musl/release/rsserve
# sudo lsof -i | code -
# kill -9 pid
cp /dev/shm/target/x86_64-unknown-linux-musl/release/rsserve ~/.cargo/bin/
which rsserve
```