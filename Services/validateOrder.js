//Allows Parsing, validating, manipulation, and to display dates and times in JS.
const moment = require('moment');
const Order = require('../domainModels/orderModel');

function isOrderUnique(orderData) {
    return new Promise(function (resolve, reject) {
        //This variable creates the 2nd part of the unique Order Reference required my the orderModel
        var partTwo = moment().format('DDMMYYhm');
        //This variable creates the 1st part of unique ref
        var partOne = (orderData.body.custoRef);
        var unique = partOne + partTwo;

        //Checks if there is already an order making this reference number.
        Order.count({ orderRef: unique }, function (err, count) {
            if (count > 0) {
                resolve('Order Already Exists\n' + 'orderRef: ' + unique);
            } else {
                orderData.body.orderDate = moment().format('llll');
                orderData.body.orderRef = unique;
                resolve();
                checkOrdersProductsStocked(orderData);
            }
        }).catch(function (errMessage) {
            reject(errMessage);
        })
    })
}

function checkOrdersProductsStocked(orderData, forwardToProcessing) {
    return new Promise(function (resolve, reject) {
        var missingStock = { orderid: orderData.body.orderRef, itemsRequired: [] };
        var sendResponse;
        var totalValue = 0.0;
        var queryOrder = orderData.body.products;

        queryOrder.forEach(function (element) {
            var qReq = parseInt(element.qtyReq);
            var value = (element.productPrice * qReq);
            totalValue = (totalValue + value);
            orderData.body.orderTotal = totalValue;
            var sQty = parseInt(element.stockQty);

            //This compares the stock vs the order requirement and sets
            //boolean available if the products are in stock. 
            if (qReq <= sQty) {
                element.nowAvailable = true;

            } else {
                var orderMoreStock = (qReq - sQty);
                element.nowAvailable = false;
                var ofEAN = element.ean;
                var orderMoreStock = (qReq - sQty);
                missingStock.itemsRequired.push({ "ean": ofEAN, "number": orderMoreStock });
            }
        }, this);

        if (missingStock.itemsRequired.length == []) {
            orderData.body.stocked = true;
            forwardToProcessing = true;
            console.log(missingStock);
            //now send this to processing for completion
            sendResponse = ('Order Stocked. Forwarding to processing service.' 
            + 'orderRef = ' + orderData.body.orderRef);

        } else {
            //send this to purchasing service
            orderData.body.stocked = false;
            forwardToProcessing = false;
            console.log(missingStock);
            sendResponse = ('Stock for this order is unavailabe. Forwarding order to purchasing service.'
            + 'orderRef = ' + orderData.body.orderRef);
        }

        //If there is no existing order with reference matching then 
        //the order is created
        Order.create(orderData.body).then(function (order) {
            resolve(order);
            console.log('Saving Order to db');
        }).catch(function (errMessage) {
            reject(errMessage);
        })
    })
}

module.exports = { isOrderUnique, checkOrdersProductsStocked };