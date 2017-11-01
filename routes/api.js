const express = require('express');
const rOut = express.Router();

//
rOut.get('/whatever', function (req, res) {
    res.send({ type: 'GET' });
});

//
rOut.put('/whatever/:id', function (req, res) {
    res.send({ type: 'PUT' });
});

//
rOut.post('/whatever', function (req, res) {
    res.send({ type: 'POST' });
});

rOut.delete('/whatever/:id', function (req, res) {
    res.send({ type: 'DELETE' });
});

rOut.get('/whatever', function (req, res) {
    res.send({ type: 'GET' });
});

module.exports = rOut;