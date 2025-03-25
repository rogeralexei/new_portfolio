"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  href: string
}

interface FloatingNavbarProps {
  navItems: NavItem[]
  activeSection: string
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export function FloatingNavbar({ navItems, activeSection, mobileMenuOpen, setMobileMenuOpen }: FloatingNavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  return (
    <motion.div
      className={cn(
        "fixed top-6 left-0 right-0 z-50 mx-auto w-fit px-4 transition-all duration-200",
        scrolled ? "opacity-100" : "opacity-90 hover:opacity-100",
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-4 py-2",
          scrolled ? "shadow-lg" : "",
        )}
      >
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeSection === item.href.substring(1)
                  ? "text-white bg-white/10"
                  : "text-white/70 hover:text-white hover:bg-white/5",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  )
}

