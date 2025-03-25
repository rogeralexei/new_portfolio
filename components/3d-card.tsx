"use client"

import type React from "react"

import { useState, useRef, type ReactNode, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ThreeDCardProps {
  children: ReactNode
  className?: string
}

export function ThreeDCard({ children, className }: ThreeDCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)

    mouseX.set(percentX * 10)
    mouseY.set(percentY * 10)
  }

  const springConfig = { damping: 20, stiffness: 300 }
  const rotateXInput = useTransform(mouseY, [-1, 1], [10, -10])
  const rotateYInput = useTransform(mouseX, [-1, 1], [-10, 10])
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)

  useEffect(() => {
    if (hovering) {
      rotateX.set(rotateXInput.get())
      rotateY.set(rotateYInput.get())
    } else {
      rotateX.set(0)
      rotateY.set(0)
    }
  }, [hovering, rotateXInput, rotateYInput, rotateX, rotateY])

  const handleMouseEnter = () => {
    setHovering(true)
    if (!ref.current) return

    // rotateX.set(useTransform(mouseY, [-1, 1], [10, -10]).get())
    // rotateY.set(useTransform(mouseX, [-1, 1], [-10, 10]).get())
  }

  const handleMouseLeave = () => {
    setHovering(false)
    mouseX.set(0)
    mouseY.set(0)
    // rotateX.set(0)
    // rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{
        perspective: 800,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        {children}

        {hovering && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 100%)",
              transformStyle: "preserve-3d",
              transform: "translateZ(1px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

