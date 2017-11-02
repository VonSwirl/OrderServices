const express = require('express');
const rOut = express.Router();

//Get information to create a new order from the purchasing service
rOut.get('/makeOrder/:orderDetails', function (req, res, next) {
    res.send({ type: 'GET' });
});

//
rOut.get('/orderList/:custDetails', function (req, res, next) {
    res.send({ type: 'GET' });
});

//Purely testing
rOut.get('/testGet', function (req, res, next) {
    res.send({ type: 'GET' });
});

//
rOut.put('/orderComplete/:id', function (req, res, next) {
    res.send({ type: 'PUT' });
});

module.exports = rOut;