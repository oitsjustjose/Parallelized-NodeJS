/**
 * @author Jose Stovall | oitsjustjose
 * @description A file for creating an array of random prime integers, similar to Homework 3
 */

const Threads = require('webworker-threads');
const path = require("path");

const getPrimes = (arrSize) => {
    let threads = Threads.createPool(arrSize);

    let primes = [];

    threads.load(path.join(__dirname, "primefinder.js"), (err, data) => {
        if (err) {
            console.log(`ERROR: ${err}`);
        } else {
            primes.push(data);

            // Quit once we've gotten the right number of primes!
            if (primes.length == arrSize) {
                threads.destroy();
            }
        }
    });
};

module.exports = {
    "getPrimes": getPrimes
};