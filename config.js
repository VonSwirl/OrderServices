var config = {}

config.databaseURL = 'mongodb://pserv:pserv1@ds241055.mlab.com:41055/purchase-service';
config.orderServiceURLtoUpdateWithPurchase = "http://localhost:3001/purchasing/test"; 
//"http://localhost:3004/PurchasingUpdate";
//config.testDatabaseURL = "mongodb://localhost:27017/MyDb";
config.AdminServicePurchaseURL = ":3001/purchasing/test";
//config.stockServiceUpdaterURL= ":3001/purchasing/test";
config.purchaseMissingStockURL = "http://theweefreeamigoz-papa.azurewebsites.net/purchasing/stockRequired";

module.exports = config;