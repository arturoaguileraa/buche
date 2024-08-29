"use client"

import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import SessionButton from '@/components/ui/SessionButton';
 
const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  password: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
})



const Login: NextPage = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Login</title>
      </Head>
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inicio Sesión</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
            <Button type="submit">
              <Link href={'/establishment/menu'}>Submit</Link>
            </Button>
          
        </form>
      </Form>
      <SessionButton></SessionButton>
      </div>
    </div>
  );
};

export default Login;
