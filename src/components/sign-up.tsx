"use client"

import type { SignUpSchema } from "@/apis/users/schemas"

import NextLink from "next/link"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeClosed } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ButtonSpinner } from "./button-spinner"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form"

import { cn, delay } from "@/lib/utils"
import { signUpSchema } from "@/apis/users/schemas"

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [isTermsChecked, setIsTermsChecked] = useState(true)

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState

  async function onSubmit(data: SignUpSchema) {
    if (!isTermsChecked) {
      // TODO: Add a toast instead of an alert.
      alert("[ERROR]: You must accept terms and conditions")
      return
    }
    setShowPassword(() => false)
    await delay(2000)
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <div className="max-w-sm border border-gray-200 px-7 py-6">
      <h2 className="text-xl font-black text-black">Sign up</h2>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-1 gap-y-4"
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
                <div className="relative mt-0.5">
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      variant={errors.password ? "danger" : "default"}
                      disabled={isSubmitting}
                      placeholder="Enter your password..."
                      className="pr-12"
                    />
                  </FormControl>
                  <div
                    className={cn(
                      "absolute inset-y-0 right-0 flex items-center pr-3",
                    )}
                  >
                    <div
                      role="button"
                      onClick={() => setShowPassword(() => !showPassword)}
                      className={cn(
                        isSubmitting
                          ? "pointer-events-none text-gray-300"
                          : "text-gray-400",
                      )}
                    >
                      {showPassword
                        ? <Eye className="size-6" />
                        : <EyeClosed className="size-6" />}
                    </div>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sign-up-terms-and-conditions"
              disabled={isSubmitting}
              checked={isTermsChecked}
              onCheckedChange={() => setIsTermsChecked(() => !isTermsChecked)}
            />
            <Label
              htmlFor="sign-up-terms-and-conditions"
              className={cn(
                "text-[13px] font-medium peer-disabled:cursor-not-allowed",
                isSubmitting && "text-gray-400",
              )}
            >
              Accept terms and conditions
            </Label>
          </div>
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
          <div
            className={cn(
              "mb-2.5 mt-4 space-x-1 text-center text-sm font-medium",
              isSubmitting ? "pointer-events-none text-gray-400" : "text-black",
            )}
          >
            <span>Already have an account?</span>
            <NextLink
              href="/sign-in"
              className="font-bold hover:underline hover:underline-offset-4"
            >
              Sign in
            </NextLink>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
