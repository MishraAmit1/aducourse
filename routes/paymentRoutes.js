import express from "express";
import {
  buySubscription,
  cancelSubscription,
  getRazorPayKey,
  paymentVerification,
} from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/authh.js";

const router = express.Router();
// Buy Subscription
router.route("/subscribe").get(isAuthenticated, buySubscription);
// Verify Payment save REfrence in database
router.route("/paymentverification").post(isAuthenticated, paymentVerification);
// get razor pay key
router.route("/razorpaykey").get(getRazorPayKey);

// Cancel subscription
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription);

export default router;
