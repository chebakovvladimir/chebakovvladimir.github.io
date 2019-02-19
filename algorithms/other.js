function factorial(n) {
    var res = 1;
    for (var i = 2; i <= n; i++) {
        res *= i;
    }
    return res;
}

function factorialReq(n) {
    if (n < 2) return 1;
    return n * factorialReq(n - 1);
}
