import express from "express";
import middlewareAuth from "../middlewares/auth";
let router = express.Router();
import uploadCloud from "../middlewares/uploader";

import bookController from "../controllers/BookController";

router.delete(
  "/delete",
  middlewareAuth.verifyTokenAdmin,
  bookController.delete
);
router.post(
  "/create",
  middlewareAuth.verifyTokenAdmin,
  uploadCloud.single("image"),
  bookController.create
);
router.get("/search", middlewareAuth.verifyToken, bookController.search);
router.get("/detail", middlewareAuth.verifyToken, bookController.detail);
router.put(
  "/update",
  middlewareAuth.verifyToken,
  uploadCloud.single("image"),
  bookController.update
);
router.get("/byCategory", bookController.showByCategory);
router.get("/filter", bookController.filter);
router.get("/", bookController.show);

module.exports = router;
