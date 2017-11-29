var config = require('../config');
var req = require('request');

function sendOrderToPurchasingService(missingOrder) {
    console.log(missingOrder);
    req.post({
        url: config.purchaseMissingStockURL,
        body: missingOrder.json,
        json: true

    }, function (err, res, body) {
        console.log(err);
        console.log(body, "Attempting to connect to purchasing service");

    });
}

/**
 * @description This issues a post request to the invoicing service with a valid order.
 * @param {JSON} order This sends a nicely validated order to invoicing service 
 */
function sendOrderToInvoicing(order) {
    console.log(order);
    req.post({
        url: config.sendOrderToInvoicing,
        body: order.json,
        json: true

    }, function (err, res, body) {
        console.log(err);
        console.log(body, "Attempting to connect to Invoicing service");

    });
}

/**
 * 
 * @param {*} cID 
 * @param {*} approved 
 */
function customerAuthUpdate(cID, approved) {
    return new Promise(function (resolve, reject) {
        Order.find({ custoRef: cID }).then(function (orderOrListOf) {
            var count = 0;

            orderOrListOf.forEach(function (element) {
                count++;
                element.custoAuth = approved;

            }, this);

            if (count > 0) {
                resolve('Customer Approval Updated. ' + count + ' Orders forwarded to Invoicing Service');
            } else {
                reject('No Customer orders found matching the Id provided');
            }

        }).catch(function (err) {
            reject('error occured. check customerId or Params. customer authorisation not updated');
        });
    })
}

module.exports = {
    sendOrderToPurchasingService,
    customerAuthUpdate,
    sendOrderToInvoicing
};