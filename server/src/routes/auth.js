import express from "express";
let router = express.Router();
import middlewareAuth from "../middlewares/auth";

import AuthController from "../controllers/AuthController";

router.post("/login", AuthController.login);
router.get(
  "/getCustomer",
  middlewareAuth.verifyToken,
  AuthController.getDataCustomer
);
router.post("/register", AuthController.register);

module.exports = router;
