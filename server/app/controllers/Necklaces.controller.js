const mongoose = require("mongoose");
const { Necklaces } = require("../models/Necklaces.model");
const necklacesController = {
  getAll: async (req, res) => {
    try {
      const target = await Necklaces.find();
      res.status(200).json(target);
    } catch (error) {
      console.error("Error fetching Necklaces:", error);
      res.status(500).json({ error: "Failed to fetch Necklaces" });
    }
  },
  
  getById: async (req, res) => {
    const { id } = req.params;
    const target = await Necklaces.findById(id);
    res.send(target);
  },
  add: async (req, res) => {
    try {
      const mainImageFile = req.files?.["mainimage"]; // Optional chaining ile hata önlenir
      if (!mainImageFile) {
        return res.status(400).json({ error: "Main image is required" });
      }
      const mainImage = mainImageFile[0].filename;
      const newNecklaces = new Necklaces({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category.split(","),
        description: req.body.description,
        mainimage: mainImage,
      });
      await newNecklaces.save();
      res.status(201).json(newNecklaces);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add Necklaces" });
    }
  },
  
  edit: async (req, res) => {
    const { id } = req.params; 
    const { title, price, category, description } = req.body;
    const mainImageFile = req.files["mainimage"];
    try {
      const necklaces = await Necklaces.findById(id);
      if (!necklaces) {
        return res.status(404).json({ error: "Necklaces not found" });
      }
      necklaces.title = title;
      necklaces.price = price;
      necklaces.category = category;
      necklaces.description = description;
      // Update the mainImage if uploaded
      if (mainImageFile) {
        necklaces.mainimage = mainImageFile[0].filename;
      }

      await necklaces.save();
      res.status(200).json({ message: "Necklaces update succesfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failled to update Necklaces" });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    await Necklaces.findByIdAndDelete(id);
    res.send(`${id} 's element has been delete`);
  },
};
module.exports = { necklacesController };
