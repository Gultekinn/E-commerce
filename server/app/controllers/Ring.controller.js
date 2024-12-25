const mongoose = require("mongoose");
const { Ring } = require("../models/Ring.model");
const ringController = {
  getAll: async (req, res) => {
    const target = await Ring.find();
    res.send(target);
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const target = await Ring.findById(id);
    res.send(target);
  },
  add: async (req, res) => {
    try {
      const mainImageFile = req.files?.["mainimage"]; // Optional chaining ile hata önlenir
      if (!mainImageFile) {
        return res.status(400).json({ error: "Main image is required" });
      }
      const mainImage = mainImageFile[0].filename;
      const newRing = new Ring({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category.split(","),
        description: req.body.description,
        mainimage: mainImage,
      });
      await newRing.save();
      res.status(201).json(newRing);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add ring" });
    }
  },
  
  edit: async (req, res) => {
    const { id } = req.params; 
    const { title, price, category, description } = req.body;
    const mainImageFile = req.files["mainimage"];
    try {
      const ring = await Ring.findById(id);
      if (!ring) {
        return res.status(404).json({ error: "Film not found" });
      }
      ring.title = title;
      ring.price = price;
      ring.category = category;
      ring.description = description;
      // Update the mainImage if uploaded
      if (mainImageFile) {
        ring.mainimage = mainImageFile[0].filename;
      }

      await ring.save();
      res.status(200).json({ message: "Ring update succesfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failled to update ring" });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    await Ring.findByIdAndDelete(id);
    res.send(`${id} 's element has been delete`);
  },
};
module.exports = { ringController };
