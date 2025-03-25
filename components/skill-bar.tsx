"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface SkillBarProps {
  name: string
  level: number
}

export function SkillBar({ name, level }: SkillBarProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start({
        width: `${level}%`,
        transition: { duration: 1, ease: "easeOut" },
      })
    }
  }, [isInView, controls, level])

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">{name}</h4>
        <span className="text-white/60 text-sm">{level}%</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={controls}
        />
      </div>
    </div>
  )
}

