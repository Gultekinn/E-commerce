const mongoose = require("mongoose");
const { Earrings } = require("../models/Earrings.model");

const earringsController = {
  getAll: async (req, res) => {
    try {
      const target = await Earrings.find();
      res.status(200).json(target);
    } catch (error) {
      console.error("Error fetching Earrings:", error);
      res.status(500).json({ error: "Failed to fetch Earrings" });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const target = await Earrings.findById(id);
    res.send(target);
  },

  add: async (req, res) => {
    try {
      const mainImageFile = req.files?.["mainimage"]; // Optional chaining ile hata önlenir
      if (!mainImageFile) {
        return res.status(400).json({ error: "Main image is required" });
      }
      const mainImage = mainImageFile[0].filename;
      const newEarrings = new Earrings({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category.split(","),
        description: req.body.description,
        mainimage: mainImage,
      });
      await newEarrings.save();
      res.status(201).json(newEarrings);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add Earrings" });
    }
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const { title, price, category, description } = req.body;
    const mainImageFile = req.files?.["mainimage"];
    
    try {
      const earrings = await Earrings.findById(id);
      if (!earrings) {
        return res.status(404).json({ error: "Earrings not found" });
      }
      
      earrings.title = title;
      earrings.price = price;
      earrings.category = category;
      earrings.description = description;

      // Update the mainImage if uploaded
      if (mainImageFile) {
        earrings.mainimage = mainImageFile[0].filename;
      }

      await earrings.save();
      res.status(200).json({ message: "Earrings updated successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to update Earrings" });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await Earrings.findByIdAndDelete(id);
    res.send(`${id} 's element has been deleted`);
  },
};

module.exports = { earringsController };
