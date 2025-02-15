// models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],  // Sabit durumlar
    default: 'Processing' 
  },
  totalAmount: { type: Number, required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },  // Product modeline referans
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
