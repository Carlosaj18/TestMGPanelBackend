import express from "express";
import {
  getUsers,
  getUserFilter,
  updateProfile,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/all", getUsers);
router.get("/filter", getUserFilter);
router.put("/updateProfile/:userId", updateProfile); // middleware -> auth
router.delete("/delete/:userId", deleteUser);
export default router;
