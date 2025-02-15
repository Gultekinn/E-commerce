const mongoose = require("mongoose");
const { Bracelets } = require("../models/Bracelets.model");
const braceletsController = {
  getAll: async (req, res) => {
    try {
      const target = await Bracelets.find();
      res.status(200).json(target);
    } catch (error) {
      console.error("Error fetching bracelets:", error);
      res.status(500).json({ error: "Failed to fetch bracelets" });
    }
  },
  
  getById: async (req, res) => {
    const { id } = req.params;
    const target = await Bracelets.findById(id);
    res.send(target);
  },
  add: async (req, res) => {
    try {
      const mainImageFile = req.files?.["mainimage"]; // Optional chaining ile hata önlenir
      if (!mainImageFile) {
        return res.status(400).json({ error: "Main image is required" });
      }
      const mainImage = mainImageFile[0].filename;
      const newBracelets = new Bracelets({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category.split(","),
        description: req.body.description,
        mainimage: mainImage,
      });
      await newBracelets.save();
      res.status(201).json(newBracelets);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add bracelets" });
    }
  },
  
  edit: async (req, res) => {
    const { id } = req.params; 
    const { title, price, category, description } = req.body;
    const mainImageFile = req.files["mainimage"];
    try {
      const bracelets = await Bracelets.findById(id);
      if (!bracelets) {
        return res.status(404).json({ error: "Bracelets not found" });
      }
      bracelets.title = title;
      bracelets.price = price;
      bracelets.category = category;
      bracelets.description = description;
      
      // Update the mainImage if uploaded
      if (mainImageFile) {
        bracelets.mainimage = mainImageFile[0].filename;
      }
      
      await bracelets.save();
      
      res.status(200).json({ message: "Bracelets update succesfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failled to update Bracelets" });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    await Bracelets.findByIdAndDelete(id);
    res.send(`${id} 's element has been delete`);
  },
};
module.exports = { braceletsController };
