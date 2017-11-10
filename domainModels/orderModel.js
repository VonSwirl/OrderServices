const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creates a separate schema that allows the products to be stored as an array of object
const productSchema = new Schema({
    ean: { type: Number },
    name: { type: String },
    description: { type: String },
    productPrice: { type: Number },
    qtyReq: { type: Number },
    stockQty: { type: Number },
});

//Create order domain model and schema
const orderSchema = new Schema({
    orderRef: { type: String },
    orderDate: { type: Date },
    products: [productSchema],
    stocked: {type: Boolean},
    orderStatus: { type: String },
    custoRef: { type: String },
    custoAuth: { type: Boolean, required: (true, 'orderRef Attribute Required') },
    orderTotal: { type: Number }
});

//This creates the model.
const Order = mongoose.model('orderModel', orderSchema);

//This exports the model.
module.exports = Order;