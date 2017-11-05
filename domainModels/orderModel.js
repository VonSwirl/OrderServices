const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create order domain model and schema
const orderSchema = new Schema({
    orderRef: { type: Number, required: (true, 'Order reference number required') },
    orderDate: { type: Date },
    orderStatus: { type: String },
    orderPrice: { type: Number },
    products: [],
    custoRef: { type: String },
    custoName: { type: String },
    custoAddress: { type: String },
    custoAuth: { type: Boolean, default: false }
});

//This creates the model.
const Order = mongoose.model('orderModel', orderSchema);

//This exports the model.
module.exports = Order;

//MONGOD DIR DELETE
//   "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"