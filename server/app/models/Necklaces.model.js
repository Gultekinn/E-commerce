const mongoose = require("mongoose");
const Necklaces = mongoose.model(
  "Necklaces",
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
module.exports={Necklaces}