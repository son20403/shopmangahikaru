import express from "express";
import middlewareAuth from "../middlewares/auth";
let router = express.Router();

import commentController from "../controllers/CommentController";

// router.get("/search", middlewareAuth.verifyToken, bookController.search);
// router.put("/update", middlewareAuth.verifyToken, bookController.update);

router.post("/create", middlewareAuth.verifyToken, commentController.create);
router.get("/detail", middlewareAuth.verifyToken, commentController.showById);
router.get("/", middlewareAuth.verifyToken, commentController.show);

module.exports = router;
