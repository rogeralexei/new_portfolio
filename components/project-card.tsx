"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  githubLink?: string
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative h-full rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-end gap-2">
            {project.githubLink && (
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full h-9 w-9 bg-white/10 backdrop-blur-sm hover:bg-white/20"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            )}
            {/* <Button
              size="icon"
              variant="secondary"
              className="rounded-full h-9 w-9 bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Live Demo</span>
            </Button> */}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="text-white/70 text-sm line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-medium text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* <Link
          href={project.link}
          className="inline-block mt-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
        >
          View Project →
        </Link> */}
      </div>
    </motion.div>
  )
}

