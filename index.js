const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + "/lib"));

const serial = require("./serial");
const parallel = require("./parallel");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/main.html"));
});

app.post("/primes", (req, res) => {
    let numPrimes;
    try {
        numPrimes = parseInt(req.query.num);
    } catch (ex) {
        numPrimes = 5;
    }

    let results = {
        "serial": {},
        "parallel": {}
    };

    let serialStart = process.hrtime();
    serial.getPrimes(numPrimes);
    let serialEnd = process.hrtime(serialStart);
    results.serial.time = serialEnd;


    let parallelStart = process.hrtime();
    parallel.getPrimes(numPrimes);
    let parallelEnd = process.hrtime(parallelStart);
    results.parallel.time = parallelEnd;

    res.send(results);
});


app.listen(port, () => console.log("Listening on port " + port));
