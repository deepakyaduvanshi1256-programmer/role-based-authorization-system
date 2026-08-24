import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

import {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  allowUser,
  blockUser,
} from "../controllers/userController.js";

const router = express.Router();

// Admin - Create User
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createUser
);

// Admin - Get All Users
router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

// Admin - Get Single User
router.get(
  "/:id",
  protect,
  authorizeRoles("admin"),
  getUserById
);

// Admin - Delete User
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

// Admin - Update User
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateUser
);

// Admin - Allow User
router.patch(
  "/:id/allow",
  protect,
  authorizeRoles("admin"),
  allowUser
);

// Admin - Block User
router.patch(
  "/:id/block",
  protect,
  authorizeRoles("admin"),
  blockUser
);

export default router;











