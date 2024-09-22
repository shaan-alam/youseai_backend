import express from "express";
import {
  getCurrentProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controller";
import { verifyUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/whoami", verifyUser, getCurrentProfile);
router.post("/logout", verifyUser, logout);

export default router;
