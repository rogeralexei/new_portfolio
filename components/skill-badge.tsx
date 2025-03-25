"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center rounded-full bg-primary/10 border border-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20 transition-colors duration-300"
    >
      {name}
    </motion.div>
  )
}

