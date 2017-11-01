const express = require('express');

//Setup express
const app = express();

//Route setup for requests
app.use('/order', require('./orderRoute/order'));

//Request Listener
app.listen(4000, function () {
    console.log("now listen");
});