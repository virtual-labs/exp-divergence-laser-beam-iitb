function verify_values(value, truevalue) {
    if (truevalue == 0 && truevalue == value) {
        return true;
    }
    let calculated_value = (truevalue - value) / truevalue * 100;
    if (calculated_value <= 4 && calculated_value >= -4) {
        return true;
    }
    else {
        return false;
    }
}
function random(min, max) {
    let num = (max - min) * Math.random() + min;
    return num;
}
function random1(min, max) {
    let num = (max - min) * Math.random() + min;
    return parseInt(num);
}
function std_deviation(num) {
    let std = 2 * num / 100.0;
    let dev = num - random(-std, std);
    return dev;
}
function regression_linear(x, y) {
    let sumx = 0;
    let sumy = 0;
    let sumxy = 0;
    let sumxx = 0;
    let n = x.length;
    for (let i = 0; i < n; i++) {
        sumx += x[i];
        sumy += y[i];
        sumxy += x[i] * y[i];
        sumxx += x[i] * x[i];
    }
    let pol = [];
    pol[0] = (sumx * sumy - n * sumxy) / (Math.pow(sumx, 2) - n * sumxx);
    pol[1] = (sumy - pol[0] * sumx) / n;
    return (pol);
}
function ascending_random_array() {
    let arr = new Array();
    while (true) {
        let x = random1(0, 40);
        let found = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == x) {
                found = true;
            }
        }
        if (!found) {
            arr.push(x);
            if (arr.length == 5) {
                arr.sort(function (a, b) { return a - b; });
                return arr;
            }
        }
    }
}
function regression_linear_2variable(x1, x2, y) {
    let sumx1 = 0;
    let sumx2 = 0;
    let sumx1sq = 0;
    let sumx1x2 = 0;
    let sumx2sq = 0;
    let sumy = 0;
    let sumx1y = 0;
    let sumx2y = 0;
    let n = x1.length;
    for (let i = 0; i < n; i++) {
        sumx1 += x1[i];
        sumx2 += x2[i];
        sumx1sq += x1[i] * x1[i];
        sumx1x2 += x1[i] * x2[i];
        sumx2sq += x2[i] * x2[i];
        sumy += y[i];
        sumx1y += x1[i] * y[i];
        sumx2y += x2[i] * y[i];
    }
    let pol = [];
    let a = [[n, sumx1, sumx2], [sumx1, sumx1sq, sumx1x2], [sumx2, sumx1x2, sumx2sq]];
    let c = [sumy, sumx1y, sumx2y];
    // console.log(a);
    // console.log(c);
    pol = gauss(a, c);
    return (pol);
}
function gauss(a, c) {
    let n = c.length;
    let x = [];
    for (let i = 0; i < n - 1; i++) {
        for (let k = i + 1; k < n; k++) {
            let m = a[k][i] / a[i][i];
            for (let j = 0; j < n; j++) {
                a[k][j] = a[k][j] - m * a[i][j];
            }
            c[k] = c[k] - m * c[i];
        }
        x[i] = 0;
    }
    for (let i = n - 1; i >= 0; i--) {
        let sum = c[i];
        for (let j = i + 1; j < n; j++) {
            sum = sum - x[j] * a[i][j];
        }
        x[i] = sum / a[i][i];
    }
    return (x);
}
//# sourceMappingURL=common.js.map