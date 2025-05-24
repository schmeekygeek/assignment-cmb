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
