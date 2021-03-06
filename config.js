
var development = {
    'databaseURL': 'mongodb://orderServiceUsr:osuser@ds042527.mlab.com:42527/orderservicedb',

    'sendOrderToInvoicingURL':
        "http://3amigosi.azurewebsites.net/api/invoice",

    'purchaseMissingStockURL':
        "http://3amigosp.azurewebsites.net/purchasing/stockRequired",

    'secret':
        'jwtsecret'
}

var test = {
    'databaseURL':
        'mongodb://orderServiceUsr:osuser@ds042527.mlab.com:42527/orderservicedb',

    'invoiceServicePurchaseURL':
        "http://3amigosi.azurewebsites.net/api/invoice",

    'purchaseMissingStockURL':
        "http://3amigosp.azurewebsites.net/purchasing/stockRequired",

    'secret':
        'jwtsecret'
}

var standard = {
    'databaseURL':
        'mongodb://orderServiceUsr:osuser@ds042527.mlab.com:42527/orderservicedb',

    'invoiceServicePurchaseURL':
        "http://3amigosi.azurewebsites.net/api/invoice",

    'purchaseMissingStockURL':
        "http://3amigosp.azurewebsites.net/purchasing/stockRequired",

    'secret':
        'jwtsecret'
}

var config = function () {
    switch (process.env.NODE_ENV) {

        case
            'development':
            return development;

        case
            'standard':
            return standard;

        default:
            return development;
    }
}

module.exports = config();

