const { body, validationResult } = require('express-validator')
const ringValidation = [
  body("title").notEmpty().withMessage("Title is required !"),
  body("price").notEmpty().withMessage("Price is required !"),
  body("category").notEmpty().withMessage("Category is required !"),
  body("description").notEmpty().withMessage("Description is required !"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ message: errors.array()[0].msg });
    }
    next();
  },
];
module.exports=ringValidation