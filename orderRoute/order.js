//Constraints below are dependencies required by this routing file.
const express = require('express');
const rOut = express.Router();
const validateOrder = require('../Services/validateOrder.js');
const forwardingService = require('../Services/orderForwardingService.js');
const legacyHandler = require('../Services/legacyDataManager.js');

//Retrieves values from JSON objects for data binding. 
//Offers params, nested queries, deep queries, custom reduce/filter functions and simple boolean logic.
var jsonQuery = require('json-query')

//Allows access to our order Data Model
const Order = require('../domainModels/orderModel');

//Allows Parsing, validating, manipulation, and to display dates and times in JS.
const moment = require('moment');

rOut.post('/makeOrder', function (req, res, next) {
    validateOrder.isOrderUnique(req).then(function (orderValid) {

        if (orderValid) {
            var order = req.body;
            res.render('viewOrder', { orderList: order });
        }
    }).catch(next);
});

//Get a single item to be able to edit prices
rOut.get('/viewProducts/:orderRef', function (req, res, next) {
    var count = 0;
    //Get their current id and compare to check who they are then call another function
    //console.log(req.params.ean);
    Order.findOne({ orderRef: req.params.orderRef }).then(function (order) {
        var productsList = [];
        var count = 0;
        order.products.forEach(() => {
            productsList.push(order.products[count]);
            count++;
        }, this);
        console.log(count, productsList);
        res.render('viewProductsInOrder', { productsList });
    }).catch(next);
});

/**
 * 
 * This post recieves and update for a products availablity. It queries the document for 
 * sub-documents with a matching EAN. If fount this sub doc value nowAvailable is set to true.
 */
rOut.put('/PurchasingUpdate/', function (req, res, next) {
    validateOrder.purchasingServUpdateHandler(req).then(function (messageResponse) {
        res.send(messageResponse);

    }).catch(next);
});

/**
 * This returns a view for the staff to see all of a customers orders 
 */
rOut.get('/displayorders/:custoRef', function (req, res, next) {
    Order.find({ custoRef: req.params.custoRef }).then(function (order) {
        res.render('viewOrder', { orderList: order });
    }).catch(next);
});

/**
 * This put request receives a update from processing service. The request
 * should contain a customer reference number and also a boolean value.
 * The boolean value sets the customers purchase approvale to true or false
 */
rOut.put('/CustomerApprovalUpdate', function (req, res, next) {
    forwardingService.customerAuthUpdate(req.param.id, req.query.approved)
        .then(function (messageResponse) {
            res.send(messageResponse);

        }).catch(next);
});

//Delete available for future use, not required at this stage.
rOut.delete('', function (req, res, next) {
    res.send(200);
});

/**
 * Allows the legancy database system access to the mongodb documents
 * a secret code is handed over for access approval before data is released
 */
rOut.put('/UpdateLegancyDatabase', function (req, res, next) {
    legacyHandler.pullDataFromMongoDB(req.body.accessCode).then(function (dbData) {
        res.send(dbData);

    }).catch(next);

});

module.exports = rOut;
