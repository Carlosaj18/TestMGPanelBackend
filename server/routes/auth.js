import express from "express";
import { register, registerAdmin } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/registerAdmin", registerAdmin);

export default router;
