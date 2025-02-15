// routes/orderRoutes.js
const express = require('express');
const { createOrder, getOrderStatus } = require('../controllers/orderController');
const { validateOrder } = require('../validations/orderValidator');
const router = express.Router();

// Sipariş oluşturma route'u
// Burada validateOrder middleware'ini kullanıyoruz. 
// Eğer geçerli bir sepet (cart) verisi yoksa, bu işlem çalışmayacak.
router.post('/create-order', validateOrder, createOrder);

// Sipariş durumu sorgulama route'u
// :orderId dinamik parametre olarak gelir, bu yüzden express bunu URL'den alabilir.
router.get('/order-status/:orderId', getOrderStatus);

module.exports = router;

