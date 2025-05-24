import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const token = await userService.registerUser(username, email, password);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(201).json({ message: 'Account created successfully!' });
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await userService.authenticateUser(email, password);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({ message: 'Logged in successfully!' });
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export const checkAuth = async (req: Request, res: Response) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: 'Not logged in' });
    return
  }

  try {
    const decoded = jwt.verify(token, config.secretKey.toString());
    res.status(200).json({ message: 'Authenticated', user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export const logout = async (_: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  })
  res.status(200).json({ message: 'Logged out' });
}
