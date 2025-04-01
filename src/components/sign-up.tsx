"use client"

import type { SignUpSchema } from "@/apis/users/schemas"

import NextLink from "next/link"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Circle, Eye, EyeClosed, X as IconX } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ButtonSpinner } from "@/components/button-spinner"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form"

import {
  signUpSchema,
  PASSWORD_MIN_CHARS,
  PASSWORD_MAX_CHARS,
} from "@/apis/users/schemas"

import {
  hasNumber,
  hasSpecialChar,
  hasLowercaseChar,
  hasUppercaseChar,
} from "@/tools/strings"

import { cn, delay } from "@/lib/utils"

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [isTermsChecked, setIsTermsChecked] = useState(true)
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false)

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
      // eslint-disable-next-line no-alert
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
                <div className="flex">
                  <div className="flex-1">
                    <FormLabel>Password</FormLabel>
                  </div>
                  <Popover
                    open={showPasswordCriteria}
                    onOpenChange={setShowPasswordCriteria}
                  >
                    <PopoverTrigger
                      className={cn(
                        "mr-1 text-sm font-medium",
                        isSubmitting
                          ? "pointer-events-none text-gray-400"
                          : "text-gray-500 hover:text-gray-700",
                      )}
                    >
                      Show criteria
                    </PopoverTrigger>
                    <PopoverContent
                      side="top"
                      align="end"
                      className="w-72"
                      onFocusOutside={e => e.preventDefault()}
                      onPointerDownOutside={e => e.preventDefault()}
                    >
                      <PasswordCriteria
                        password={field.value}
                        hasError={!!errors.password}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
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
                        : <EyeClosed className="size-6" />
                      }
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

type PasswordCriteriaProps = {
  password: string
  hasError: boolean
}

function PasswordCriteria({ password, hasError }: PasswordCriteriaProps) {
  return (
    <div className="mb-1">
      <div className="text-sm font-semibold text-black">Password Criteria</div>
      <div className="mt-1 text-[13px] leading-4 text-gray-800">
        Your password must meet the following requirements:
      </div>
      <div className="mt-2.5 border-t border-t-gray-200">
        <ul className="mt-2.5 space-y-1">
          <PasswordValidate
            isValid={hasNumber(password)}
            hasError={hasError}
            description="Contain a number"
          />
          <PasswordValidate
            isValid={hasSpecialChar(password)}
            hasError={hasError}
            description="Contain a special character"
          />
          <PasswordValidate
            isValid={hasLowercaseChar(password)}
            hasError={hasError}
            description="Contain a lowercase character"
          />
          <PasswordValidate
            isValid={hasUppercaseChar(password)}
            hasError={hasError}
            description="Contain an uppercase character"
          />
          <PasswordValidate
            isValid={
              password.length >= PASSWORD_MIN_CHARS
              && password.length <= PASSWORD_MAX_CHARS
            }
            hasError={hasError}
            // eslint-disable-next-line style/max-len
            description={`Between ${PASSWORD_MIN_CHARS} and ${PASSWORD_MAX_CHARS} characters long`}
          />
        </ul>
      </div>
    </div>
  )
}

type PasswordValidateProps = {
  isValid: boolean
  hasError: boolean
  description: string
}

function PasswordValidate({ isValid, hasError, description }: PasswordValidateProps) {
  return (
    <li className="flex items-center gap-x-1.5 text-sm text-black">
      <span className="flex size-5 items-center justify-center">
        {isValid ? (
          <Check className="size-5 text-green-500" />
        ) : hasError ? (
          <IconX className="size-5 h-full text-red-500" />
        ) : (
          <Circle className="size-3 h-full fill-gray-300 stroke-none" />
        )}
      </span>
      {description}
    </li>
  )
}
