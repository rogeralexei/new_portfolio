"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
}

export default function AnimatedText({ text, className = "" }: AnimatedTextProps) {
  const controls = useAnimation()

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04 },
    }))
  }, [controls])

  return (
    <span className={`inline-block ${className}`}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-1.5">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              custom={wordIndex + charIndex * 0.1}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}

