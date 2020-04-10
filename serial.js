const upperLimit = 4294967295;

const getPrimes = (arrSize) => {
    let ret = [];

    while (ret.length != arrSize) {
        let prime = -1;
        while (prime === -1) {
            let num = Math.round(Math.random() * upperLimit);

            if (num === 0 || num === 1 || num % 2 === 0) {
                continue;
            }
            if (num === 2 || num === 3) {
                continue;
            }

            let divisor = 3;
            let isValid = true;
            while (divisor <= (num / 2)) {
                if (num % divisor == 0) {
                    isValid = false;
                    break;
                }
                divisor += 2;
            }
            if (isValid) {
                prime = num;
            }
        }
        ret.push(prime);
    }
    return ret;
};

module.exports = {
    "getPrimes": getPrimes
};