const express = require("express");
const { braceletsController } = require("../controllers/Bracelets.controller");
const store = require("../middlewares/multer");
const braceletsValidation = require("../validations/Bracelets.validation");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
//geT aLL
router.get("/", braceletsController.getAll);
//getById
router.route("/:id").get(braceletsController.getById);
//post
router.post(
  "/",
  upload.fields([{ name: "mainimage", maxCount: 1 }]),
  braceletsController.add
);

//edit
router.put(
  "/:id",
  upload.fields([{ name: "mainimage", maxCount: 1 }]),
  braceletsController.edit
);
//delete
router.route("/:id").delete(braceletsController.delete);
module.exports = router;
