import type { Task } from "@/network/task.service";
import { Badge } from "./ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { EllipsisVertical, Loader2 } from "lucide-react";
import * as taskService from '../network/task.service';
import { useState } from "react";
import { useDialog } from "./dialog-provider";
import EditTaskSheet from "./edit-task-sheet";
import api from "@/api";

export const TaskCard = ({ props, refresh }: { props: Task, refresh: () => void }) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const [isMarkDoneLoading, setMarkDoneLoading] = useState(false)
  const [isEditOpen, setEditOpen] = useState(false)
  const { showDialog } = useDialog();

  const getVariant = (status: string) => {
    switch (status.toUpperCase()) {
      case "DONE": return "default";
      case "IN-PROGRESS": return "secondary";
      case "TODO": return "destructive";
      default: return "default";
    }
  }

  return (
    <div className="p-2">
      <Card className="md:w-[400px] w-[300px] h-[170px]">
        <CardHeader>
          <div className="flex flex-row items-center space-y-0">
            <CardTitle className="text-xl flex items-center font-bold tracking-tight pr-2">
              {props.title}
            </CardTitle>
            <div className="flex-1" />
            <Badge variant={getVariant(props.status)}>{props.status.toUpperCase()}</Badge>
            <div className="w-2" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button asChild size="icon" variant="ghost"><EllipsisVertical className="h-6 w-6" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={async () => {
                  setMarkDoneLoading(true)
                  try {
                    await api.put('/task/update', { _id: props._id, status: "done" }, { withCredentials: true })
                    showDialog("Success!", "Task marked as done")
                  } catch (err: any) {
                    console.log(err)
                    showDialog("Error", "Failed to mark task as done")
                  } finally {
                    setMarkDoneLoading(false)
                    refresh()
                  }
                }}>
                  {isMarkDoneLoading ? <Loader2 className="animate-spin" /> : <>Mark as done</>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setEditOpen(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={async () => {
                  setIsDeleteLoading(true)
                  try {
                    await taskService.deleteTask(props._id)
                    showDialog("Success!", "Task deleted")
                  } catch (err: any) {
                    console.log(err)
                    showDialog("Error", "Failed to delete task")
                  } finally {
                    setIsDeleteLoading(false)
                    refresh()
                  }
                }}>
                  {isDeleteLoading ? <Loader2 className="animate-spin" /> : <>Delete</>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription>Due Date: {props.dueDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="tracking-tight">
            {props.description}
          </p>
        </CardContent>
      </Card>
      <EditTaskSheet
        open={isEditOpen}
        onOpenChange={setEditOpen}
        task={props}
        onSave={() => {
          setEditOpen(false)
          showDialog("Success!", "Task updated")
        }}
        refresh={refresh}
      />
    </div>
  )
}
