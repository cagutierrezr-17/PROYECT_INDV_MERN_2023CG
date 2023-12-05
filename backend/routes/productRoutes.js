import express from "express";
import * as productCtrl from "../controllers/productController.js";

const router = express.Router();

router.get("/api/product", productCtrl.listProductStore);

export { router };
