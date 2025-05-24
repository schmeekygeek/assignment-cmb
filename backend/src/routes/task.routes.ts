import express from 'express';
import { createTask, getAllTasks, deleteTask, updateTask } from '../controllers/task.controller';

const router = express.Router();

router.post('/create', createTask);
router.post('/getAll', getAllTasks)
router.post('/delete', deleteTask)
router.put('/update', updateTask)

export default router;
