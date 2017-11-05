//Constraints below are dependencies required by this controller.
const express = require('express');
const rOut = express.Router();

//Allows access to our order Data Model
const Order = require('../domainModels/orderModel');

//Get information to create a new order from the purchasing service
rOut.post('/makeOrder', function (req, res, next) {
    Order.create(req.body).then(function (order) {
        console.log(req.body);
        res.send(order);
        /* res.send({
            type: 'POST',
            orderRef: req.body.orderRef,
            custoName: req.body.custoName
        }); */
    }).catch(next);
    //var orderDM = new Order(req.body);
    //orderDM.save();
});

//
rOut.get('/orderList/:custDetails', function (req, res, next) {
    res.send({ type: 'GET' });
});

//
rOut.put('/orderComplete/:id', function (req, res, next) {
    res.send({ type: 'PUT' });
});

//
rOut.post('/orderComplete/:id', function (req, res, next) {
    res.send({ type: 'POST' });
});

//Testing
rOut.get('/testGet', function (req, res, next) {
    res.send({ type: 'GET' });
});

//TESTING
rOut.post('/orderComplete', function (req, res, next) {
    res.send({ type: 'POST' });
});

//Testing
rOut.put('/testComplete/:id', function (req, res, next) {
    res.send({ type: 'PUT' });
});

//Testing
rOut.delete('/testComplete/:id', function (req, res, next) {
    res.send({ type: 'DELETE' });
});

module.exports = rOut;

//JSON OBJECT TESTING
/* {
{
"orderRef": "123456789",
"orderDate": "01/01/2001",
"orderStatus": "Delivered",
"orderPrice": "1.23",
"products": [ "electronics", "sports", "music" ],
"custoRef": "ABC123",
"custoName": "john smith",
"custoAddress": "10 downing street TW1 1AA",
"custoAuth": "true"
} */