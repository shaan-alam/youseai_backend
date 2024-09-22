import Task, { ITask } from "../models/task.model";
import { TaskFilter } from "../types";

export const createTask = async (taskData: Partial<ITask>) => {
  const task = new Task(taskData);
  return await task.save();
};

export const getTasks = async (filters: TaskFilter, sortBy: string) => {
  const query: TaskFilter = {};

  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;

  const tasks = await Task.find(query).sort({ [sortBy]: 1 });

  return await tasks;
};

export const getTaskById = async (taskId: string) => {
  return await Task.findById(taskId);
};

export const updateTask = async (taskId: string, taskData: Partial<ITask>) => {
  return await Task.findByIdAndUpdate(taskId, taskData, { new: true });
};

export const deleteTask = async (taskId: string) => {
  return await Task.findByIdAndDelete(taskId);
};
