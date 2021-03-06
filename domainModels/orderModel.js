const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creates a separate schema that allows the products to be stored as an array of object
const productSchema = new Schema({
    ean: { type: String },
    name: { type: String },
    description: { type: String },
    productPrice: { type: Number },
    qtyReq: { type: Number },
    nowAvailable: { type: Boolean, default: false }
});

//Create order domain model and schema
const orderSchema = new Schema({
    orderRef: { type: String },
    orderDate: { type: Date },
    products: [productSchema],
    stocked: { type: Boolean },
    orderStatus: { type: String },
    custoAddress: { type: String },
    custoRef: { type: String },
    custoAuth: { type: Boolean },
    orderTotal: { type: Number }
});

//This creates the model.
const Order = mongoose.model('orderModel', orderSchema);

//This exports the model.
module.exports = Order;
