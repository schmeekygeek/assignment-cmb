"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import api from "@/api"
import { useState } from "react"
import { Loader2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { useDialog } from "@/components/dialog-provider"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const today = new Date().toISOString().split("T")[0];

const formSchema = z.object({
  title: z.string().min(3, { message: "Title is too short" }),
  description: z.string().min(5, { message: "Description is too short" }),
  dueDate: z
  .string()
  .min(1, { message: "Due date is required" })
  .refine(
    (date) => {
      return date >= today;
    },
    { message: "Can't have due date in the past "}
  ),
  status: z.enum(["todo", "in-progress", "done"]),
})

type TaskFormProps = {
  className?: string
  refresh: () => void
}

function TaskForm({ className, refresh }: TaskFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      status: "todo",
    },
  })
  const [isLoading, setLoading] = useState(false)
  const { showDialog } = useDialog()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const response = await api.post("/task/create", values, {
        withCredentials: true,
      })
      if (response.status === 201) {
        showDialog("Success!", "Task created successfully")
      } else {
        showDialog("Error", response.data.error)
      }
    } catch (err: any) {
      showDialog("Error", err.response?.data?.error || "Unknown error")
    } finally {
      setLoading(false)
      refresh()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" min={new Date().toISOString().split("T")[0]} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isLoading ? (
          <Button className="w-full" type="submit">Create Task</Button>
        ) : (
          <Button className="w-full" disabled>
            <Loader2 className="animate-spin" /> Please wait
          </Button>
        )}
      </form>
    </Form>
  )
}

type Props = {
  refresh: () => void,
}

export function DrawerDialogTaskForm({ refresh }: Props) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="text-md"><Plus />Add Task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>Alright, let's get something done!</DialogDescription>
          </DialogHeader>
          <TaskForm refresh={refresh}/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="text-md"><Plus />Add Task</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Task</DrawerTitle>
          <DrawerDescription>Alright, let's get something done!</DrawerDescription>
        </DrawerHeader>
        <TaskForm refresh={refresh} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button className="w-full" variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
