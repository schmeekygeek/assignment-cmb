import type { Task } from "@/network/task.service";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./ui/dropdown-menu";
import { EllipsisVertical, Loader2 } from "lucide-react";
import * as taskService from "../network/task.service";
import { useState } from "react";
import { useDialog } from "./dialog-provider";
import EditTaskSheet from "./edit-task-sheet";
import api from "@/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";


export const TaskCard = ({ props, refresh }: {
  props: Task;
  refresh: () => void;
}) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isStatusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const { showDialog } = useDialog();

  const getVariant = (status: string) => {
    switch (status.toUpperCase()) {
      case "DONE":
        return "default";
      case "IN-PROGRESS":
        return "secondary";
      case "TODO":
        return "destructive";
      default:
        return "default";
    }
  };

  const updateStatus = async (id: string, status: string) => {

    setStatusUpdateLoading(true);
    try {
      await api.put(
        "/task/update",
        { _id: id, status: status },
        { withCredentials: true }
      );
      showDialog("Success!", `Task marked as ${status.toUpperCase()}`);
    } catch (err: any) {
      console.log(err);
      showDialog("Error", `Failed to mark task as ${status.toUpperCase()}`);
    } finally {
      setStatusUpdateLoading(false);
      refresh();
    }
  }

  return (
    <div className="p-2">
      <Dialog>
        <DialogTrigger asChild>
          <Card className="w-[350px] h-[170px] flex flex-col justify-between overflow-hidden transform transition-transform duration-300 hover:scale-110 cursor-pointer">
            <CardHeader className="overflow-hidden pb-2">
              <div className="flex items-center space-y-0 overflow-hidden">
                <CardTitle className="text-xl font-bold tracking-tight truncate max-w-[200px]">
                  {props.title}
                </CardTitle>
                <div className="flex-1" />
                <Badge variant={getVariant(props.status)}>
                  {props.status.toUpperCase()}
                </Badge>
                <div className="w-2" />
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button asChild size="icon" variant="ghost">
                      <EllipsisVertical className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={6} align="start">
                    {isStatusUpdateLoading ? (
                      <DropdownMenuItem disabled>
                        Updating...
                      </DropdownMenuItem>
                    ) :
                      (
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            Mark as
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              onClick={
                                async () => await updateStatus(props._id, "done")
                              } >
                              Done
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={
                                async () => await updateStatus(props._id, "in-progress")
                              } >
                              In-Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={
                                async () => await updateStatus(props._id, "todo")
                              } >
                              Todo
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      )
                    }
                    <DropdownMenuItem onClick={() => setEditOpen(true)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={async () => {
                      setIsDeleteLoading(true);
                      try {
                        await taskService.deleteTask(props._id);
                        showDialog("Success!", "Task deleted");
                      } catch (err: any) {
                        console.log(err);
                        showDialog("Error", "Failed to delete task");
                      } finally {
                        setIsDeleteLoading(false);
                        refresh();
                      }
                    }}>
                      {isDeleteLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                          <>Delete</>
                        )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="h-2" />
              <div className="sm:h-[4px] md:h-[3px]" />
              <CardDescription className="truncate">
                Due Date: {props.dueDate}
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <p className="text-sm">
                {props.description}
              </p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tight">{props.title}</DialogTitle>
            <DialogDescription className="text-lg font-normal">{props.description}</DialogDescription>
          </DialogHeader>
          <div className="text-sm text-gray-400">
            Due Date: {props.dueDate}
          </div>
          <Badge variant={getVariant(props.status)}>
            {props.status.toUpperCase()}
          </Badge>
        </DialogContent>
      </Dialog>

      <EditTaskSheet
        open={isEditOpen}
        onOpenChange={setEditOpen}
        task={props}
        onSave={() => {
          setEditOpen(false);
          showDialog("Success!", "Task updated");
        }}
        refresh={refresh}
      />
    </div>
  );
};
