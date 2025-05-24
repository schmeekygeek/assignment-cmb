import { LoadingSkeleton } from "@/components/loading-skeleton";
import * as taskService from "../network/task.service"
import { useEffect, useState } from "react";
import type { Task } from "../network/task.service";
import { TaskCard } from "@/components/task-card";
import { DrawerDialogTaskForm } from "@/components/create-task-drawer";

export const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllTasks = async () => {
    try {
      const tasks = await taskService.getAllTasks()
      setTasks(tasks)
    } catch (err) {
      console.error("Cannot fetch tasks", err);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllTasks();
  }, [])

  return (
    <div className="items-center justify-center">
      <div className="flex flex-row justify-around mb-4">
        <h1 className="text-2xl font-bold tracking-tight lg:text-2xl">
          Your Tasks
        </h1>
        <DrawerDialogTaskForm refresh={getAllTasks} />
      </div>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-4">
          {isLoading ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : tasks.length === 0 ? (
            <h1 className="text-gray-500 text-center col-span-full lg:text-xl text-lg">You have no tasks currently</h1>
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task._id}
                props={{
                  _id: task._id,
                  title: task.title,
                  description: task.description,
                  dueDate: task.dueDate,
                  status: task.status,
                  userId: task.userId,
                }}
                refresh={getAllTasks}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
