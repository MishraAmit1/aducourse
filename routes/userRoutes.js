import express from "express";
import {
  addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfileho,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/authh.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();
// To Register a New User
router.route("/register").post(singleUpload, register);
// To login
router.route("/login").post(login);
// To Logout
router.route("/logout").get(logout);
// Get  Profile
router.route("/gettmee").get(isAuthenticated, getMyProfileho);
// delete MY  Profile
router.route("/deletemyprofile").delete(isAuthenticated, deleteMyProfile);

// Change Password
router.route("/changepassword").put(isAuthenticated, changePassword);
// Update Profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);
// Update Profle Picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);
// Forget Password
router.route("/forgetpassword").post(forgetPassword);
// Reset Password
router.route("/resetpassword/:token").put(resetPassword);
// Add TO Playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);
// Remove From Playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);
// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
