var config = require('../config');
var req = require('request');

function sendOrderToPurchasingService(missingOrder) {
    //here we are posting to the order service with the details to make the order 
    var http = require('http');
    
    var bodyString = JSON.stringify({
        username: 'thefourtheye',
        password: '********'
    });
    
    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': bodyString.length
    };
    
    var options = {
        host: 'localhost',
        path: '/users/1',
        port: 3000,
        method: 'PUT',
        headers: headers
    };
 
    http.request(options, callback).write(bodyString);

    var http = require('http');
    
    var options = {
    host: 'localhost',
    path: '/users/1',
    port: 3000,
    method: 'PUT'
    };
    
    var callback = function(response) {
    var str = '';
    
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function(chunk) {
    str += chunk;
    });
    
    //the whole response has been recieved, so we just print it out here
    response.on('end', function() {
    console.log(str);
    });
    };
    
    http.request(options, callback).end();

   /*  var useThis = missingOrder.itemsRequired;
    console.log(useThis);
    try {
        req.post({
            url: config.purchaseMissingStockURL + missingOrder.orderid,
            body: { useThis },
            json: true

        }).catch(function (err) {
            console.log('Cant post missing order ' + err);
        });
    } catch (err) {
        console.log('tried to post fail' + err); 
    }*/
}

module.exports = sendOrderToPurchasingService;