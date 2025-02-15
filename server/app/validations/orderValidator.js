// validators/orderValidator.js
const { body, validationResult } = require('express-validator');

const validateOrder = [
  body('cart')
    .isArray({ min: 1 }).withMessage('Cart cannot be empty')
    .custom((value) => {
      return value.every(item => item._id && item.quantity && item.price);
    }).withMessage('Each cart item must have an _id, quantity, and price'),

  body('totalAmount').isFloat({ min: 0 }).withMessage('Total amount must be a positive number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateOrder };
