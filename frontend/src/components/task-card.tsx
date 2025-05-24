import type { Task } from "@/network/task.service";
import { Badge } from "./ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

export const TaskCard = (props: Task) => {

  const getVariant = (status: string) => {
    switch (status.toUpperCase()) {
      case "DONE":
        return "default";
      case "IN-PROGRESS":
        return "secondary"
      case "TODO":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="p-2">
      <Card className="md:w-[400px] w-[300px]">
        <CardHeader>
          <div className="flex flex-row items-center space-y-0">
            <CardTitle className="text-xl flex items-center font-bold tracking-tight pr-2">
              {props.title}
            </CardTitle>
            <div className="flex-1"></div>
            <Badge variant={getVariant(props.status)}>{props.status.toUpperCase()}</Badge>
            <div className="w-2" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button asChild size="icon" variant="ghost"><EllipsisVertical className="h-6 w-6"/></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => {

                }}>Mark as done</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {

                }}>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => {alert("hi")}}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription>{props.dueDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="tracking-tight">
            {props.description}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
