import { Request, Response } from 'express';
import * as taskService from '../services/task.service';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, status, userId } = req.body;
    await taskService.createTask( title, description, dueDate, status, userId );
    res.status(201).json({ message: 'Task created successfully!'});
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const tasks = await taskService.getAllTasks(userId)
    res.status(200).json(tasks);
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.body;
    await taskService.deleteTask(taskId);
    res.status(200).json({message: "Successfully deleted task"})
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    })
  }
}
