import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.registerUser(name, email, password);
    res.status(201).json({ message: 'User created', user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
