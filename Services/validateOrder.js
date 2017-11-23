
//Allows Parsing, validating, manipulation, and to display dates and times in JS.
const moment = require('moment');
const Order = require('../domainModels/orderModel');
const forwardingService = require('./orderForwardingService.js');

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
                    console.log('Duplicate Order Rejected');
                    resolve('Failed! Reason = Order Already Exists');

                } else {
                    orderData.body.orderDate = moment().format('llll');
                    orderData.body.orderRef = unique;
                    console.log('New Order Accepted');
                    resolve('Order Request Accepted');
                    checkIfProductsStocked(orderData);

                }
            }).catch(function (err) {
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

        newOrderForwarding(orderData, missingStock);

    } catch (error) {
        console.log('error @ checkIfProduct fn ' + error);
    }
}

/**
 * @description
 * This function is called by Fn checkIfProductsStocked(). This runs inline with a new order creation.
 * The purpose of this function is to query the missingStock array to determine if it is ready
 * for the invoicing service to complete the order or whether it requires more products. If the 
 * latter is true then then order is pass to the purchasing service. 
 * @function orderForwarding(oD,mS)
 * @param {JSON} oD aka(orderData) This is the modified res.body passed in by Fn checkIfProductsStocked
 * @param {Array} mS aka(MissingStock) Is a list of all product Ean numbers and quantity missing from the order.
 */
function newOrderForwarding(oD, mS) {
    if (mS.itemsRequired.length == []) {
        oD.body.stocked = true;
        oD.body.orderStatus = "Pending Invoice";
        saveNewOrderToMongo(oD);
        //now send this to processing for completion

    } else {
        oD.body.stocked = false;
        oD.body.orderStatus = "Waiting for Stock";
        console.log('Missing Stock--------\n', mS, '\n');
        saveNewOrderToMongo(oD);
        forwardingService.sendOrderToPurchasingService(mS);
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

/**
 * @function confirmAllStockAvailableForInvoicing
 * @description
 * This Fn is triggered by a put request "PurchasingUpdate" from purchasing service.
 * It checks for the order matching the arg passed into the Fn.
 * Once found the method will look through all the products to find
 * if any are still awaiting a purchase update. If all stocked booleans
 * are true then the order is forwarded to the Invoicing service.
 * @argument {JSON} orderInbound This is the order to be used to query the db.
 */
function isOrderReadyForInvoicingService(orderInbound) {
    var orderProducts = orderInbound.products;
    var counter = 0;
    var messAge = "";
    orderProducts.forEach(function (element) {
        //This compares the stock vs the order requirement and sets
        //boolean available if the products are in stock. 
        if (!element.nowAvailable) {
            counter++;
        }
    }, this);

    if (counter == 0) {
        console.log('Order Complete forward to invoicing');
        orderInbound.orderStatus = "Pending Invoice";
        orderInbound.stocked = true;

    } else {

        if (counter > 1) {
            messAge = " More products are";
        } else {
            messAge = " More product is";
        }

        console.log(counter + messAge + ' awaiting Restock update');
        orderInbound.orderStatus = "Waiting for Stock";
        orderInbound.stocked = false;
    }
    orderInbound.save();
}

/**
 * @description 
 * This post recieves and update for a products availablity. It queries the document for 
 * sub-documents with a matching EAN. If fount this sub doc value nowAvailable is set to true.
 * @argument {JSON} reqData is the request make by the purchasing service
 * @function isOrderReadyForInvoicingService(order); 
 * This function is envoked if the correct ean and orderRef numbers match. 
 * @see isOrderReadyForInvoicingService(order); for more details
 */
function purchasingServUpdateHandler(reqData) {
    return new Promise(function (resolve, reject) {
        var count = 0;
        Order.findOne({ orderRef: reqData.params.orderRef }).then(function (order) {
            if (order != null) {
                order.products.forEach(function (element) {
                    if (element.ean == reqData.body.ean && count == 0) {
                        if (element.nowAvailable) {
                            count++;
                            resolve('Product Already Updated');

                        } else {
                            element.nowAvailable = true;
                            order.save();
                            count++;
                            isOrderReadyForInvoicingService(order);
                            resolve('Update Successful');
                        }
                    }
                }, this);

            } else {
                console.log('Invalid OrderRef: Provided ');
                resolve('Invalid OrderRef: Provided ');
                count++;
            }

            if (count < 1) {
                console.log('No Matching EAN: found for this Order');
                resolve('No Matching EAN: found for this Order');
            }
        })
    })
}

module.exports = {
    isOrderUnique,
    isOrderReadyForInvoicingService,
    purchasingServUpdateHandler
};
