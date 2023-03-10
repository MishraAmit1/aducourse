import express from "express";
import {
  addLecture,
  delteCourse,
  delteLecture,
  getCourseLecturess,
} from "../controllers/courseControllers.js";
import { createCourse } from "../controllers/courseControllers.js ";
import { getAllCourses } from "../controllers/courseControllers.js ";
authorizeSubscribers;
import {
  authorizeAdmin,
  isAuthenticated,
  authorizeSubscribers,
} from "../middlewares/authh.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();
// Get All Courses without lectures
router.route("/courses").get(getAllCourses);
// create a new course only admin
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);
//    Add lecture Delete Course    Get Course Details
router
  .route("/course/:id")
  .get(isAuthenticated, authorizeSubscribers, getCourseLecturess)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizeAdmin, delteCourse);
// Delete Lecture
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, delteLecture);
export default router;
