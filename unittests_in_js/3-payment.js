const Utils = require("./utils");

function sendPaymentRequestToApi(totalAmount, totalShipping) {
    let result = Utils.calculateNumber("SUM", totalAmount, totalShipping)
    process.stdout.write(`The total is: ${result}`)
    return result
}

module.exports = sendPaymentRequestToApi
