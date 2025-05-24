import { Request, Response, NextFunction } from 'express';
import * as taskRepository from '../repositories/task.repository';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import { getUserIdFromToken } from '../util/jwtutil';

export const createTask = async (
  title: string,
  description: string,
  dueDate: string,
  status: string,
  userId: string
) => {
  try {
    await taskRepository.createTask({title, description, dueDate, status, userId})
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const getAllTasks = async (
  userId: string
) => {
  try {
    const tasks = await taskRepository.getAllTasksByUser(userId)
    return tasks
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const deleteTask = async (taskId: string) => {
  await taskRepository.deleteTask(taskId)
}

// auth middleware
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: 'Authentication token missing' });
    return
  }

  try {
    const decoded = jwt.verify(token, config.secretKey);
    const userId = getUserIdFromToken(decoded)
    req.body.userId = userId
    next();
  } catch (err: any) {
    console.log(err)
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
