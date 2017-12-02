var config = {}

config.databaseURL = 'mongodb://orderServiceUsr:osuser@ds042527.mlab.com:42527/orderservicedb';
config.orderServiceURLtoUpdateWithPurchase = "http://localhost:3001/purchasing/test";
//"http://localhost:3004/PurchasingUpdate";
//config.testDatabaseURL = "mongodb://localhost:27017/MyDb";
config.sendOrderToInvoicingService = "http://localhost:3007/api/Invoice";
config.stockServiceUpdaterURL = ":3001/purchasing/test";

config.purchaseMissingStockURL = "http://3amigosp.azurewebsites.net/purchasing/stockRequired";
//config.purchaseMissingStockURL = "http://localhost:3001/purchasing/stockRequired";

module.exports = config;
