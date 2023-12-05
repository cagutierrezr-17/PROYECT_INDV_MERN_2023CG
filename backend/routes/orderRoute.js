import express from "express";
import * as finalOrderCtrl from "../controllers/orderController.js";

const router = express.Router();

router.post("/api/createFinalOrder", finalOrderCtrl.createOrder);
router.post("/api/finalOder/email", finalOrderCtrl.sendEmailOrder);

export { router };
