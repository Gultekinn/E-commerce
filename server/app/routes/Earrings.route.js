const express = require("express");
const { earringsController } = require("../controllers/Earrings.controller");
const store = require("../middlewares/multer");
const earringsValidation = require("../validations/Earrings.validation");
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
router.get("/", earringsController.getAll);
//getById
router.route("/:id").get(earringsController.getById);
//post
router.post(
  "/",
  upload.fields([{ name: "mainimage", maxCount: 1 }]),
  earringsController.add
);

//edit
router.put(
  "/:id",
  upload.fields([{ name: "mainimage", maxCount: 1 }]),
  earringsController.edit
);
//delete
router.route("/:id").delete(earringsController.delete);
module.exports = router;
