"use client"

import type { ButtonProps } from "@/components/ui/button"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import { cn } from "@/lib/utils"

type ButtonSpinnerProps = ButtonProps & {
  title: string
  isSubmitting: boolean
}

export const ButtonSpinner = React.forwardRef<HTMLButtonElement, ButtonSpinnerProps>(
  ({ title, isSubmitting, className, ...props }, ref) => {
    return (
      <Button
        type="button"
        disabled={isSubmitting}
        className={cn(className, "relative")}
        ref={ref}
        {...props}
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key="spinner"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: isSubmitting ? 0 : -15, opacity: isSubmitting ? 1 : 0 }}
            transition={{
              y: { type: "spring", mass: 0.8, damping: 10, stiffness: 400 },
              opacity: { duration: 0.12 },
            }}
            className="absolute"
          >
            <Spinner size="xs" className="duration-500 ease-linear" />
          </motion.div>
          <motion.span
            key="text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isSubmitting ? 20 : 0, opacity: isSubmitting ? 0 : 1 }}
            transition={{
              y: { type: "spring", mass: 0.8, damping: 10, stiffness: 400 },
              opacity: { duration: 0.12 },
            }}
          >
            {title}
          </motion.span>
        </AnimatePresence>
      </Button>
    )
  },
)

ButtonSpinner.displayName = "ButtonSpinner"
