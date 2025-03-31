"use client"

import type { SignUpSchema } from "@/apis/users/schemas"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { ButtonSpinner } from "./button-spinner"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form"

import { delay } from "@/lib/utils"
import { signUpSchema } from "@/apis/users/schemas"

export function SignUp() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const isTermsChecked = true
  const { errors, isSubmitting } = form.formState

  async function onSubmit(data: SignUpSchema) {
    await delay(2000)
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <div className="max-w-sm border border-gray-200 p-4">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="mt-0.5">
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      variant={errors.email ? "danger" : "default"}
                      disabled={isSubmitting}
                      placeholder="you@email.com"
                    />
                  </FormControl>
                </div>
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
                <div className="mt-0.5">
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      variant={errors.password ? "danger" : "default"}
                      disabled={isSubmitting}
                      placeholder="Enter your password..."
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <ButtonSpinner
              type="submit"
              size="md"
              title="Create Account"
              className="w-full"
              disabled={isSubmitting || !isTermsChecked}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
