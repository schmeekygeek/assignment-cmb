import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await userService.registerUser(username, email, password);
    res.status(201).json({ message: 'User created', user });
  } catch (err: any) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      res.status(400).json({
        error: `${duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)} is already in use`,
      });
    } else {
      res.status(400).json({
        error: err.message
      });
    }
  }
};
