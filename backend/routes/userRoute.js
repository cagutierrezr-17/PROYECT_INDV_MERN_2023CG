import express from "express";
import * as userStoreCtrl from "../controllers/userController.js";

const router = express.Router();

router.post("/api/register", userStoreCtrl.userStoreRegister);
router.post("/api/login", userStoreCtrl.userStoreLogin);

export { router };
