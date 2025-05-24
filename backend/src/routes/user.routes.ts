import express from 'express';
import { registerUser, authenticateUser, checkAuth, logout } from '../controllers/user.controller';

const router = express.Router();

router.post('/register', registerUser);
router.post('/authenticate', authenticateUser);
router.get('/checkauth', checkAuth);
router.get('/logout', logout);

export default router;
