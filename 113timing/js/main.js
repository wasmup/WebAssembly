function isOddPrime(p) {
    for (let i = 3n; i * i <= p; i += 2n) {
        if (p % i === 0n) return false;
    }
    return true;
}

let big = (1n << 64n) - 1n; //  MaxUint64
console.log("big:", big) // 18446744073709551615n

// find maxPrime
while (!isOddPrime(big)) {
    big -= 2n;
}
console.log("Prime:", big) // 18446744073709551557n

/*
big: 18446744073709551615n
Prime: 18446744073709551557n

real    10m28.528s
user    10m28.170s
sys     0m6.403s
 */
