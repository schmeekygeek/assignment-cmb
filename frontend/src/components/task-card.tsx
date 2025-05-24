import { Badge } from "./ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export const TaskCard = () => {
  return (
    <div className="p-2">
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex flex-row items-start space-y-0">
            <CardTitle className="text-lg flex items-center font-bold tracking-tight pr-2">
              Make blog post asoenth aoeu eo ooe oe
            </CardTitle>
            <div className="flex-1"></div>
            <Badge variant={"default"}>DONE</Badge>
          </div>
          <CardDescription> Due Date: May 25 </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="tracking-tight">
            Add headers and create a draft, write email to editor.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
