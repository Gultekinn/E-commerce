const express = require("express");
const { ringController } = require("../controllers/Ring.controller");
const store = require("../middlewares/multer");
const ringValidation = require("../validations/Ring.validation");
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
router.get("/", ringController.getAll);
//getById
router.route("/:id").get(ringController.getById);
//post
router.post(
  "/",
  upload.fields([{ name: "mainimage", maxCount: 1 }]),
  ringController.add
);

//edit
router.put(
  "/:id",
  upload.fields([{ name: "mainimage", maxCount: 1 }]),
  ringController.edit
);
//delete
router.route("/:id").delete(ringController.delete);
module.exports = router;
