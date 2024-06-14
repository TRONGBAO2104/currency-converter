function sum_to_n_a(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

console.log(sum_to_n_a(5));

function sum_to_n_b(n) {
    return Array(n).fill().map((_, index) => index + 1).reduce((acc, val) => acc + val, 0);
}
console.log(sum_to_n_b(5));

function sum_to_n_c(n) {
    let sum = 0;
    Array(n).fill().forEach((_, index) => {
        sum += index + 1;
    });
    return sum;
}

console.log(sum_to_n_c(5));

