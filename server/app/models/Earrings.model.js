const mongoose = require("mongoose");
const Earrings = mongoose.model(
  "Earrings",
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
module.exports={Earrings}