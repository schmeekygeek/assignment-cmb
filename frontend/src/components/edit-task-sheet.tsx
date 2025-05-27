"use client"

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Task } from "@/network/task.service";
import { useDialog } from "./dialog-provider";
import api from "@/api";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  _id: z.string().min(0, {}),
  title: z.string().min(3, { message: "Title is too short" }),
  description: z.string().min(5, { message: "Description is too short" }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
  status: z.enum(["todo", "in-progress", "done"]),
})

type Props = {
  open: boolean
  onOpenChange: (val: boolean) => void
  task: Task
  onSave?: () => void
  refresh: () => void
}

export default function EditTaskSheet({ open, onOpenChange, task, onSave, refresh }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: task._id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.split("T")[0],
      status: task.status as "todo" | "in-progress" | "done",
    },
  })

  const [isLoading, setLoading] = useState(false)
  const { showDialog } = useDialog()

  useEffect(() => {
    form.reset({
      _id: task._id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.split("T")[0],
      status: task.status as "todo" | "in-progress" | "done",
    })
  }, [task, open, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const res = await api.put(`/task/update`, values, {
        withCredentials: true,
      })
      if (res.status === 200) {
        showDialog("Success!", "Your task was updated")
        onOpenChange(false)
        onSave?.()
      } else {
        showDialog("Error", res.data.error || "Failed to update task.")
      }
    } catch (err: any) {
      showDialog("Error", err.response?.data?.error || "Unknown error occurred.")
    } finally {
      setLoading(false)
      refresh()
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>
          <SheetDescription>Make changes and save your task.</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
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
                    <FormControl><Textarea {...field} /></FormControl>
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
                        <SelectTrigger><SelectValue /></SelectTrigger>
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <><Loader2 className="animate-spin mr-2" /> Saving...</> : "Save Changes"}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
