import express from "express";
const router = express.Router();
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  createUser,
  checkUserExists,
} from "./userController.js";
import { protect, admin } from "../../middleware/authMiddleware.js";

// router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/").get(protect, admin, getUsers);
router.post("/login", authUser);
router.post("/sign-up", registerUser);
router.get("/check-user/:phone", checkUserExists);
router.route("/add").post(createUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
