import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "./ui/card"

export const SkeletonDemo = () => {
  return (
    <div className="p-2">
      <Card className="w-[350px] p-4">
        <div className="flex flex items-start justify-start space-x-4">
          <div className="flex-row space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[120px]" />
            <div className="h-5"></div>
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <Skeleton className="h-6 w-12" />
        </div>
      </Card>
    </div>
  )
}
