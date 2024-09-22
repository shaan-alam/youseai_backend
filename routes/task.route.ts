import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/task.controller";
import { verifyUser } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", verifyUser, getTasks);
router.post("/create", verifyUser, createTask);
router.get("/:id", verifyUser, getTaskById);
router.patch("/update/:id", verifyUser, updateTask);
router.delete("/delete/:id", verifyUser, deleteTask);

export default router;
