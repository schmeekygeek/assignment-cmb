import { Schema, model, Types } from 'mongoose';

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  dueDate: { type: String, required: true },
  status: { 
    type: String, 
    default: 'todo',
    required: true
  },
  userId: { type: Types.ObjectId, ref: 'User', required: true }
})

export const Task = model('Task', taskSchema)
