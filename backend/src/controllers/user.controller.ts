import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const jwt = await userService.registerUser(username, email, password);
    res.status(201).json({ message: 'Account created successfully!', jwt: jwt});
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const jwt = await userService.authenticateUser(email, password)
    res.status(200).json({ message: 'Logged in successfully!', jwt: jwt});
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}
