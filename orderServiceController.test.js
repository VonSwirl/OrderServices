const assert = require('chai').assert;
const expect = require('chai').expect;
const orderRoutAccess = require('../orderRoute/order');
const valOrderAccess = require('../Services/validateOrder');

//Results

describe('validateOrderFunctions', function (done) {

    it('ValidateOrder should only accept new structurally valid orders', function (done) {
        var jsonOrderStructure = {
            "products": [
                {
                    "ean": "1A",
                    "name": "A",
                    "description": "A",
                    "productPrice": "1.00",
                    "qtyReq": "1000",
                    "stockQty": "4",
                    "nowAvailable": "",
                    "custoRef": "zzzzzzzzzzzzzzzzz"
                }, {
                    "ean": "2B",
                    "name": "B",
                    "description": "B",
                    "productPrice": "2.00",
                    "qtyReq": "500",
                    "stockQty": "0",
                    "nowAvailable": ""
                }],
            "stocked": "",
            "orderStatus": "",
            "custoAuth": "true",
            "orderTotal": "0.00"
        };
        assert.typeOf(x, 'number');
    });

    it('Should find a single product, will check against ean', function () {
        assert.typeOf(x, 'string');
    });
    it('Updating a product price should only be a number passed', function () {
        assert.typeOf(x, 'number');
    });

});