const express = require("express");
const { necklacesController } = require("../controllers/Necklaces.controller");
const store = require("../middlewares/multer");
const necklacesValidation = require("../validations/Necklaces.validation");
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
router.get("/", necklacesController.getAll);
//getById
router.route("/:id").get(necklacesController.getById);
//post
router.post(
  "/",
  upload.fields([{ name: "mainimage", maxCount: 1 }]),
  necklacesController.add
);

//edit
router.put(
  "/:id",
  upload.fields([{ name: "mainimage", maxCount: 1 }]),
  necklacesController.edit
);
//delete
router.route("/:id").delete(necklacesController.delete);
module.exports = router;
