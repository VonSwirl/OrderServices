//Constraints below are dependencies required by this routing file.
const express = require('express');
const rOut = express.Router();

//Allows access to our order Data Model
const Order = require('../domainModels/orderModel');

//Allows Parsing, validating, manipulation, and to display dates and times in JS.
const moment = require('moment');

/** 
 * @const rOut.post  Recieves JSON some of the required data from the Stock service to 
 * create a new order
 */
rOut.post('/makeOrder', function (req, res, next) {

    //This variable creates 1 part of the unique Order Reference required my the orderModel
    var partTwo = moment().format('DDMMYYhmmss');

    Order.create(req.body).then(function (order) {
        //This variable creates the 2nd part of unique ref
        var partOne = order.custoRef;
        this.order.orderRef = partOne + partTwo;
        console.log(order.orderRef);

        console.log(order.orderRef);
        res.send(order);
    }).catch(next);

});
/* res.send({
                type: 'POST',
                orderRef: req.body.orderRef,
                custoName: req.body.custoName
}); */

//Accesses the db to allow the user or staff to view the customers order history.
rOut.get('/orderList/:custoRef', function (req, res, next) {
    res.send({ type: 'GET' });
});

/**
 * Recieves Order Complete from processing service, orderStatus updated in db.
 */
rOut.put('/PurchasingUpdate/:orderRef', function (req, res, next) {
    var oRef = req.params.orderRef;
    Order.findOne({ orderRef: oRef }).update(req.body).then(function () {
        res.send('Order Ref: ' + oRef + '\nSuccessfully Updated');
    }).catch(next);
});
/*     {
        order.update(req.body);
        order.save();


    }).catch(next);
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
