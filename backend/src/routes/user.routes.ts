import express from 'express';
import { registerUser, authenticateUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/register', registerUser);
router.post('/authenticate', authenticateUser);

export default router;
