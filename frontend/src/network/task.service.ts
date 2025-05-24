import api from "@/api";

export interface Task {
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
