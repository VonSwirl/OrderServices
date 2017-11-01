const express = require('express');

//Setup express
const app = express();

//Request Listener
app.listen(4000, function () {
    console.log("now listen");
});


app.get('/api', function (req, res) {
    console.log('GET request');
    //res.end();
    res.send({name: 'Paper'});
});