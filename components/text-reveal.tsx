"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface TextRevealProps {
  text: string
  className?: string
}

export function TextReveal({ text, className }: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.1,
                    delay: wordIndex * 0.1 + charIndex * 0.03,
                  },
                },
              }}
              initial="hidden"
              animate={mainControls}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}

