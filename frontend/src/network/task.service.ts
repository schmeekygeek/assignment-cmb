import api from "@/api";

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  userId: string;
}

export const getAllTasks = async (): Promise<Task[] | []> => {
  try {
    const response = await api.post<Task[]>('/task/getAll', {}, { withCredentials: true });
    console.log(response.data);
    return response.data
  } catch (err: any) {
    console.log(err);
    return [];
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    await api.post('/task/delete', { taskId: taskId }, { withCredentials: true })
  } catch(err: any) {
    console.log(err.message)
  }
}
