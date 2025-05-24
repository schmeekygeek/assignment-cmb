import type { Task } from "@/network/task.service";
import { Badge } from "./ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

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
          <div className="flex flex-row items-start space-y-0">
            <CardTitle className="text-xl flex items-center font-bold tracking-tight pr-2">
              {props.title}
            </CardTitle>
            <div className="flex-1"></div>
            <Badge variant={getVariant(props.status)}>{props.status.toUpperCase()}</Badge>
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
