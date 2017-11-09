//Constraints below are dependencies required by this routing file.
const express = require('express');
const rOut = express.Router();
//Allows Parsing, validating, manipulation, and to display dates and times in JS.
const moment = require('moment');
//Allows access to our order Data Model
const Order = require('../domainModels/orderModel');



var nextId = function (callback) {
    function prefix(date) {

        var blah = parseInt(moment(date).format('YYMMDD'));
        console.log();

        return blah;
    }
};




/** 
* Get information to create a new order from the purchasing service
*/
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
