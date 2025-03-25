"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <section id={id} className={className} ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </section>
  )
}

