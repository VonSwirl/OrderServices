var config = require('../config');
var req = require('request');

function sendOrderToPurchasingService(missingOrder) {
    console.log(missingOrder, ";sdkf;ldskf;sk;fldk");
    req.post({
        url: config.purchaseMissingStockURL,
        body: missingOrder.json,
        json: true

    }, function (err, res, body) {
        console.log(err);
        console.log(body, "i am here");

    });
}

module.exports = { sendOrderToPurchasingService };