import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/task.controller";

const router = Router();

router.get("/", getTasks);
router.post("/create", createTask);
router.get("/:id", getTaskById);
router.patch("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
