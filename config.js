

//config.databaseURL = 'mongodb://orderServiceUsr:osuser@ds042527.mlab.com:42527/orderservicedb';
//config.orderServiceURLtoUpdateWithPurchase = "http://localhost:3001/purchasing/test";
//"http://localhost:3004/PurchasingUpdate";
//config.testDatabaseURL = "mongodb://localhost:27017/MyDb";
//config.sendOrderToInvoicingService = "http://localhost:3007/api/Invoice";
//config.stockServiceUpdaterURL = ":3001/purchasing/test";
//config.purchaseMissingStockURL = "http://3amigoso.azurewebsites.net/";
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