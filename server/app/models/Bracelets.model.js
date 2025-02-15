const mongoose = require("mongoose");
const Bracelets = mongoose.model(
  "Bracelets",
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
module.exports={Bracelets}