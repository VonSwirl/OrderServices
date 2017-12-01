//Constraints below are dependencies required by this controller.
const bodPars = require('body-parser');
const express = require('express');
const mong = require('mongoose');
//const expressJwt = require('jsonwebtoken');

//Sets up an instance of Express.js .
const expressApp = express();


/* expressApp.get('/protected', expressJwt({
        secret: 'hello world !', getToken: function fromHeaderOrQueryString(req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
                return req.headers.authorization.split(' ')[1];

            else if (req.query && req.query.token)
                return req.query.token;
            
                return null;
        }
    })
); */

//Connection to my Local Mongodb via mongoose
//mong.connect('mongodb://localhost/orders', { useMongoClient: true });
//Connection to my Mlab connection string Mongodb via mongoose deployment server/
mong.connect('mongodb://orderServiceUsr:osuser@ds042527.mlab.com:42527/orderservicedb', { useMongoClient: true });

//This overrides the depricated mongoose Promise with node.js Promise
mong.Promise = global.Promise;

//Allows Express to use body-parser tool to handle our JSON data.
expressApp.use(bodPars.json());//

//Allows Express access to order.js for HTTP verb functions. 
expressApp.use('/order', require('./orderRoute/order'));

/**
 * Middleware which handles errors on the rejection of a promise
 * @param err this is the error message
 * @param req this is what was requested from the client
 * @param res is the response given back to client
 */
expressApp.use(function (err, req, res, next) {

    //Returns the error in String form to the user 
    res.status(422).send({ error: err.message });
    console.log(err);
});

//Request Listener
expressApp.listen(3004, function () {
    console.log("Argh! WebApp Listening on Port 3004 Captain");
});
