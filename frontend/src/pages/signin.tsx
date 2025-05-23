"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useDialog } from "@/components/dialog-provider"

const formSchema = z
  .object({
    email: z.string()
      .email({ message: "Invalid email address" }),
    password: z.string()
      .min(2, { message: "Password must be at least 2 characters.", })
      .max(20, { message: "Password limit exceeded", }),
  })

export default function SignIn() {
  const [ isLoading ] = useState(false);
  const { showDialog } = useDialog();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    showDialog("hi", values.email)
  }
  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   try {
  //     setLoading(true);
  //     const response = await api.post("/user/authenticate", values);
  //     if ( response.status === 200 ) {
  //       showDialog("Success!", "You're now logged in")
  //       login(response.data.jwt)
  //     } else {
  //       showDialog("Error", response.data.error)
  //     }
  //   } catch (err: any) {
  //     if (isAxiosError(err)) {
  //       showDialog("Error", err.response?.data.error);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            { !isLoading ?
              ( <Button type="submit">Log In</Button> ) :
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
