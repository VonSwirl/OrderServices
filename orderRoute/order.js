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

//Accesses the db to allow the user or staff to view the customers order history.
rOut.get('/orderList/:custoRef', function (req, res, next) {
    res.send({ type: 'GET' });
});

//Recieves Order Complete from processing service, orderStatus updated in db.
rOut.put('/update/:orderRef', function (req, res, next) {
    Order.findOneAndUpdate({ orderRef: req.params.orderRef }, req.body).then(function (order) {
        Order.findOne({ orderRef: req.params.orderRef }.then(function (order) {
            res.send(order);
        }));
    });
});
/* //Recieves Order Complete from processing service, orderStatus updated in db.
rOut.put('/orderComplete/:orderRef', function (req, res, next) {
    Order.findByIdAndUpdate({ orderRef: req.params.orderRef }, req.body).then(function () {
        Order.findOne({ orderRef: req.params.orderRef }.then(function (order) {
            res.send(order);
        }));
    });
}); */

//This post request hands the processing service an Order which needs to be completed
rOut.post('/completeOrder/:id', function (req, res, next) {
    res.send({ type: 'POST' });
});

//Delete available for future use, not required at this stage.
rOut.delete('', function (req, res, next) {
    res.send({ type: 'DELETE' });
});

module.exports = rOut;
