
import * as taskRepository from '../repositories/task.repository';

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
