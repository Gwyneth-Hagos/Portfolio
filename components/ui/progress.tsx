"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"
import { MotionValue } from "framer-motion"

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  value?: number | MotionValue<number>
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, ...props }, ref) => {
  const [progress, setProgress] = React.useState(0)
  
  React.useEffect(() => {
    if (typeof value === 'number') {
      setProgress(value)
    } else if (value && typeof value === 'object' && 'onChange' in value && typeof value.onChange === 'function') {
      // Handle MotionValue safely
      const unsubscribe = value.onChange((latest: number) => {
        setProgress(latest)
      })
      
      // Initialize with current value if get method exists
      if ('get' in value && typeof value.get === 'function') {
        setProgress(value.get())
      }
      
      return () => unsubscribe()
    }
  }, [value])

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }