import express from "express";
import middlewareAuth from "../middlewares/auth";
let router = express.Router();
import uploadCloud from "../middlewares/uploader";

import categoryController from "../controllers/CategoryController";

router.post(
  "/create",
  middlewareAuth.verifyTokenAdmin,
  uploadCloud.single("image"),
  categoryController.create
);
router.get("/detail", middlewareAuth.verifyToken, categoryController.detail);
router.delete(
  "/delete",
  middlewareAuth.verifyTokenAdmin,
  categoryController.delete
);
router.put(
  "/update",
  middlewareAuth.verifyTokenAdmin,
  uploadCloud.single("image"),
  categoryController.update
);
router.get("/", middlewareAuth.verifyToken, categoryController.show);

module.exports = router;
