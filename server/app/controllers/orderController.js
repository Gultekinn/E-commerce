// controllers/orderController.js
const Order = require('../models/orderModel');

// Sipariş oluşturma fonksiyonu
const createOrder = async (req, res) => {
  const { cart, totalAmount } = req.body; // Frontend'den gelen sepet ve toplam tutar

  // Sepetin boş olmaması ve doğru formatta olması gerektiğini kontrol et
  if (!Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ message: 'Cart cannot be empty' });
  }

  for (let item of cart) {
    if (!item._id || !item.quantity || !item.price) {
      return res.status(400).json({ message: 'Each cart item must have an _id, quantity, and price' });
    }
  }

  const orderId = 'ORD-' + Date.now(); // Sipariş ID'si oluştur

  try {
    const newOrder = new Order({
      orderId: orderId,
      totalAmount: totalAmount,
      items: cart.map(item => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price
      }))
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', orderId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

// Sipariş durumu sorgulama fonksiyonu
const getOrderStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order status', error: error.message });
  }
};

module.exports = { createOrder, getOrderStatus };
