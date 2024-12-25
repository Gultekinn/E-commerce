const mongoose = require("mongoose");
const Ring = mongoose.model(
  "Ring",
  new mongoose.Schema(
    {
      title: String,
      price: Number,
      category: Array,
      description: String,
      mainimage: String,
    },
    {
      timestamps: true,
    }
  )
);
module.exports={Ring}