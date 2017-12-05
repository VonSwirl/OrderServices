//Constraints below are dependencies required by this routing file.
const express = require('express');
const rOut = express.Router();
const validateOrder = require('../Services/validateOrder.js');
const forwardingService = require('../Services/orderForwardingService.js');

//Retrieves values from JSON objects for data binding. 
//Offers params, nested queries, deep queries, custom reduce/filter functions and simple boolean logic.
var jsonQuery = require('json-query')

//Allows access to our order Data Model
const Order = require('../domainModels/orderModel');

//Allows Parsing, validating, manipulation, and to display dates and times in JS.
const moment = require('moment');

rOut.post('/makeOrder', function (req, res, next) {
    validateOrder.isOrderUnique(req).then(function (messageResponse) {
        //console.log(messageResponse);
        res.send(messageResponse);

    }).catch(next);
});

//Accesses the db to allow the user or staff to view the customers order history.
rOut.get('/', function (req, res, next) {
    //res.send({ type: 'PING PONG PING PONG' });
    res.render('viewOrder.pug', { 'products': req.body.products });
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
 * This put request receives a update from processing service. The request
 * should contain a customer reference number and also a boolean value.
 * The boolean value sets the customers purchase approvale to true or false
 */
rOut.put('/CustomerApprovalUpdate/customer?approved=', function (req, res, next) {
    forwardingService.customerAuthUpdate(req.param.id, req.query.approved)
        .then(function (messageResponse) {
            res.send(messageResponse);

        }).catch(next);
});

//Delete available for future use, not required at this stage.
rOut.delete('', function (req, res, next) {
    res.send({ type: 'DELETE' });

});

/**
 * @todo Update the legacy DB
 */
rOut.get('/UpdateLegancyDatabase', function (req, res, next) {
    res.send();
 
});

module.exports = rOut;
