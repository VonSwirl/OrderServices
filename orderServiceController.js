//Constraints below are dependencies required by this controller.
const bodPars = require('body-parser');
const express = require('express');
const mong = require('mongoose');

//Sets up an instance of Express.js .
const app = express();

//Connection to Mongodb via mongoose
mong.connect('mongodb://localhost/orders');

//This overrides the depricated mongoose Promise with node.js Promise
mong.Promise = global.Promise;

//Allows Express to use body-parser tool to handle our JSON data.
app.use(bodPars.json());

//Allows Express access to order.js for HTTP verb functions. 
app.use('/order', require('./orderRoute/order'));


//Middleware error handler
app.use(function (err, req, res, next) {
    
    //Returns the error in String form to the user 
    res.status(422).send({ error: err.message });
    console.log(err);
});

//Request Listener
app.listen(4000, function () {
    console.log("Response from orderServiceController");
});
