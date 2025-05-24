import { Task } from "../models/task";

export const createTask = async (data: {
  title: string,
  description: string,
  dueDate: string,
  status: string,
  userId: string,
}) => {
  const task = new Task(data)
  return await task.save();
}

export const getAllTasksByUser = async (userId: string) => {
  const tasks = await Task.find({ userId: userId })
  return tasks
}

export const updateTask = async (data: {
  _id: string,
  title: string,
  description: string,
  dueDate: string,
  status: string,
  userId: string,
}) => {
  const task = await Task.findOne({ _id: data._id })
  if (!task) {
    throw new Error("Task not found")
  }
  task.title = data.title || task.title;
  task.description = data.description || task.description;
  task.dueDate = data.dueDate || task.dueDate;
  task.status = data.status || task.status;

  await task.save();
  return true
}

export const deleteTask = async (taskId: string) => {
  await Task.deleteOne({ _id: taskId })
}
