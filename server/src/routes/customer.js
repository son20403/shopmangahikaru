import express from "express";
import middlewareAuth from "../middlewares/auth";
let router = express.Router();

import cusController from "../controllers/CusController";

router.post("/create", middlewareAuth.verifyToken, cusController.create);
router.get("/update", middlewareAuth.verifyToken, cusController.edit);
router.get("/detail", middlewareAuth.verifyToken, cusController.detail);
router.delete("/", middlewareAuth.verifyTokenAdmin, cusController.delete);
router.put("/", middlewareAuth.verifyToken, cusController.update);
router.get("/", middlewareAuth.verifyToken, cusController.show);

module.exports = router;
