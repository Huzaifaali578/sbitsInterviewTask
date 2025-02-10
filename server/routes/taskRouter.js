import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";
import { createTask, daleteTask, getTask, updateTask } from "../controller/taskController.js";

const taskRouter = express.Router();

// create Task
taskRouter.post("/create", createTask);
// Get task
taskRouter.get("/", getTask);
// update task
taskRouter.put("/update/:id", updateTask);
// delete task
taskRouter.delete("/delete/:id", daleteTask);

export default taskRouter;