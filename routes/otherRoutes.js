import express from "express";
import {
  contact,
  courseRequest,
  getDashboardStats,
} from "../controllers/otherControlllers.js";

import { authorizeAdmin, isAuthenticated } from "../middlewares/authh.js";
const router = express.Router();

// contact form
router.route("/contact").post(contact);

// contact form
router.route("/courserequest").post(courseRequest);
// Get Admin Dashboard Stats
router
  .route("/admin/stats")
  .get(isAuthenticated, authorizeAdmin, getDashboardStats);

export default router;
