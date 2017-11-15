//Allows Parsing, validating, manipulation, and to display dates and times in JS.
const moment = require('moment');

//rOut.post('/makeOrder', function (req, res, next) 

function isOrderUnique(newOrderRequest){

}

function readyItemForStockUpdate(ean, number){
    return new Promise(function(resolve, reject){
        if(isNaN(number) || number <= 0){
            reject('incorrect incoming');
        }
    Product.findOne({Ean : ean}).then(function(item){
        
        
        var productDTO = new ProductDTO(item, number);
        resolve(productDTO.jsonVersion);

    }).catch(function(err){
        reject('no such item found');
    })
});
}
/* 
    //This variable creates 1 part of the unique Order Reference required my the orderModel
    var partTwo = moment().format('DDMMYYhm');
    //Adds date to the order
    req.body.orderDate = moment().format('llll');
    //This variable creates the 2nd part of unique ref
    var partOne = (req.body.custoRef);
    var unique = partOne + partTwo;
    req.body.orderRef = unique;
    var oRef = req.body.orderRef;
    var missingStock = { orderid: unique, itemsRequired: [] };
    var sendResponse;
    var totalValue = 0.0;

    //Checks if there is already an order making this reference number.
    Order.count({ orderRef: oRef }, function (err, count) {
        if (count > 0) {
            res.send('Order Already Exists\n' + 'orderRef: ' + unique);

        } else {
            var queryOrder = req.body.products;
            queryOrder.forEach(function (element) {
                var qReq = parseInt(element.qtyReq);
                var value = (element.productPrice * qReq);
                totalValue = (totalValue + value);

                console.log('Total price = £' + totalValue);
                var sQty = parseInt(element.stockQty);

                //This compares the stock vs the order requirement and sets
                //boolean available if the products are in stock. 
                if (qReq <= sQty) {
                    element.nowAvailable = true;
                    console.log('1----------------------------');
                    console.log('REQ = ' + qReq);
                    console.log('INS = ' + sQty);
                    console.log('AVAILABLE = TRUE');
                    console.log(missingStock);

                } else {
                    var orderMoreStock = (qReq - sQty);
                    console.log('2----------------------------');
                    console.log('REQ = ' + qReq);
                    console.log('IN = ' + sQty);
                    console.log('AVAILABLE = FALSE');
                    console.log('RE-ORDER VALUE = ' + orderMoreStock);

                    element.nowAvailable = false;
                    var ofEAN = element.ean;
                    var orderMoreStock = (qReq - sQty);
                    missingStock.itemsRequired.push({ "ean": ofEAN, "number": orderMoreStock });

                    console.log('\nADDING TO MISSING LIST:');
                    console.log(missingStock);
                    console.log('NEXT ELEMENT');

                }
            }, this);

            if (missingStock.length == 0) {
                stocked = true;
                //now send this to processing for completion
                console.log('RESULT OF ORDER == STOCK AVAIABLE');
                sendResponse = ('Order Stocked. Forwarding to processing service\n' + 'orderRef: ' + unique);

            } else {
                //send this to purchasing
                console.log('RESULT OF ORDER == STOCK MISSING ');
                sendResponse = ('Stock for this order is unavailabe. Forwarding order to purchasing service \n' + missingStock);
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!NOW   pass missing stock to chris!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 
            }

            //If there is no existing order with reference matching then 
            //the order is created
            Order.create(req.body).then(function (order) {
                res.send(sendResponse);
                console.log('Saving Order to db');
            }).catch(next);
        }
    }); */
