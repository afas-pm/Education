import express from "express";
import { checkout, paymentVerification } from "../controllers/paymentController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/checkout", isAuth, checkout);
router.post("/verification/:id", isAuth, paymentVerification);

export default router;
