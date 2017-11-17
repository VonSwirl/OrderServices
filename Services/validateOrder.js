//Allows Parsing, validating, manipulation, and to display dates and times in JS.
const moment = require('moment');
const Order = require('../domainModels/orderModel');

/**
 * @description 
 * The purpose of this function is to establish if the post request orderRef 
 * matches an existing document in the order database.
 * This function is called by order.js rOut.post('/makeOrder',function(req,res,next)
 * @param {JSON} orderData This is the res.body passed in by the post request /makeOrder.
 */
function isOrderUnique(orderData) {
    return new Promise(function (resolve, reject) {
        if (orderData.body.custoRef != null) {
            //This variable creates the 2nd part of the unique Order Reference required my the orderModel
            var partTwo = moment().format('DDMMYYhm');
            //This variable creates the 1st part of unique ref
            var partOne = (orderData.body.custoRef);
            var unique = partOne + partTwo;

            //Checks if there is already an order making this reference number.
            Order.count({ orderRef: unique }, function (err, count) {

                if (count > 0) {
                    //console.log('Order Already Exists\n' + 'orderRef: ' + unique);
                    resolve('Failed! Reason = Order Already Exists');

                } else {
                    orderData.body.orderDate = moment().format('llll');
                    orderData.body.orderRef = unique;
                    resolve('Order Request Accepted');
                    checkIfProductsStocked(orderData);

                }
            }).catch(function (errMessage) {
                reject('error during Order.count orderRef');

            })
        } else {
            resolve('No Customer Reference provided');

        }
    })
}

/**
 * @description This function looks for any products which need to be ordered. If order forfilled then
 * Order is forwarded to invoicing service otherwise it is sent to purchasing service to forfill required stock. 
 * @function checkOrdersProductsStocked(orderData) 
 * @param {JSON} orderData This is the res.body passed in by the isOrderUnique fn.
 */
function checkIfProductsStocked(orderData) {
    try {
        var missingStock = { orderid: orderData.body.orderRef, itemsRequired: [] };
        var totalValue = 0.0;
        var queryOrder = orderData.body.products;

        queryOrder.forEach(function (element) {
            var qReq = parseInt(element.qtyReq);
            var value = (element.productPrice * qReq);
            totalValue = (totalValue + value);
            orderData.body.orderTotal = totalValue;
            var sQty = parseInt(element.stockQty);

            //This compares the stock vs the order requirement and sets
            //boolean available if the products are in stock. 
            if (qReq <= sQty) {
                element.nowAvailable = true;

            } else {
                var orderMoreStock = (qReq - sQty);
                element.nowAvailable = false;
                var ofEAN = element.ean;
                missingStock.itemsRequired.push({ "ean": ofEAN, "number": orderMoreStock });
            }
        }, this);

        orderForwarding(orderData, missingStock);

    } catch (error) {
        console.log('error @ checkIfProduct fn');
    }
}

/**
 * @description
 * This function is called by Fn checkIfProductsStocked().
 * The purpose of this function is to query the missingStock array to determine if it is ready
 * for the invoicing service to complete the order or whether it requires more products. If the 
 * latter is true then then order is pass to the purchasing service. 
 * @function orderForwarding(oD,mS)
 * @param {JSON} oD aka(orderData) This is the modified res.body passed in by Fn checkIfProductsStocked
 * @param {Array} mS aka(MissingStock) Is a list of all product Ean numbers and quantity missing from the order.
 */
function orderForwarding(oD, mS) {
    if (mS.itemsRequired.length == []) {
        oD.body.stocked = true;
        saveNewOrderToMongo(oD);
        //now send this to processing for completion

    } else {
        oD.body.stocked = false;
        saveNewOrderToMongo(oD);
        //send this to purchasing service
    }
}

/**
 * @description
 * The purpose of this function is to save a prevalidated order to the Mongo Database 
 * @function orderForwarding(orderD)
 * @param {JSON} orderD aka(orderData) This is the modified res.body passed in by Fn orderForwarding.
 */
function saveNewOrderToMongo(orderD) {
    try {
        //If there is no existing order with reference matching then 
        //the order is created
        Order.create(orderD.body);
        console.log('New Order saved to db', orderD.body);

    } catch (error) {
        console.log('error @ savingOrder');

    }
}

module.exports = { isOrderUnique, checkIfProductsStocked };
