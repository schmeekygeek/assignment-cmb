"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import api from "../api"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import { useAuth } from "@/components/auth-provider"

const formSchema = z
  .object({
    username: z.string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(20, { message: "Username must be at most 20 characters" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores",
      }),
    email: z.string()
      .email({ message: "Invalid email address" }),
    password: z.string()
      .min(2, { message: "Password must be at least 2 characters.", })
      .max(20, { message: "Password limit exceeded", }),
    confirm: z.string()
      .min(2, { message: "Password must be at least 2 characters.", })
      .max(20, { message: "Password limit exceeded", })
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export default function SignUp() {
  const [ isLoading, setLoading ] = useState(false);
  const { login } = useAuth();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await api.post("/user/register", values);
      if ( response.status === 201 ) {
        toast("Logged in successfully")
        login(response.data.jwt)
      } else {
        toast(response.data.error)
      }
    } catch (err: any) {
      if (isAxiosError(err)) {
        toast(err.response?.data.error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="gokulover13" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@doe.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="superstrongpassword" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="superstrongpassword" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            { !isLoading ?
              ( <Button type="submit">Sign Up</Button> ) :
              (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
              )
            }
          </form>
        </Form>
      </div>
    </>
  )
}
