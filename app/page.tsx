"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Spotlight } from "@/components/ui/spotlight"
import { TextReveal } from "@/components/text-reveal"
import { FloatingNavbar } from "@/components/floating-navbar"
import { ProjectCard } from "@/components/project-card"
import { SkillBar } from "@/components/skill-bar"
import { ContactForm } from "@/components/contact-form"
import { ThreeDCard } from "@/components/3d-card"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and secure checkout.",
      image: "/ecommerce_app.png?height=600&width=800",
      tags: ["Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
      link: "#",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team collaboration features.",
      image: "/task_app.png?height=600&width=800",
      tags: ["React", "Node.js", "Socket.io", "PostgreSQL"],
      link: "#",
    },
    {
      title: "Portfolio Website",
      description:
        "A modern portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and responsive design.",
      image: "/portfolio_app.png?height=600&width=800",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      link: "#",
    },
    {
      title: "Ticketing App",
      description: "An app that allows the users from an airline to create tickets and scan the generated tickets to track their passagers trips",
      image: "/qr_app.png?height=600&width=800",
      tags: ["React", "Next.js", "Supabase"],
      link: "#",
    },
  ]

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "React", level: 92 },
    { name: "Next.js", level: 88 },
    { name: "Node.js", level: 80 },
    { name: "HTML/CSS", level: 95 },
    { name: "Tailwind CSS", level: 90 },
    { name: "UI/UX Design", level: 75 },
    { name: "MongoDB", level: 70 },
    { name: "PostgreSQL", level: 65 },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const sectionId = section.getAttribute("id")

        if (sectionTop < window.innerHeight / 3 && sectionId) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  return (
    <div ref={containerRef} className="relative bg-black text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-violet-600/20 via-black to-black -z-10" />

      {/* Animated particles background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Floating Navbar */}
      <FloatingNavbar
        navItems={navItems}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
          >
            <div className="flex flex-col h-full justify-center items-center">
              <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-white">
                <X className="w-8 h-8" />
              </button>

              <nav className="flex flex-col items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-3xl font-bold transition-colors hover:text-primary",
                      activeSection === item.href.substring(1) ? "text-primary" : "text-white/70",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="flex gap-6 mt-12">
                <motion.a
                  href="https://github.com/rogeralexei"
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                  rel="noreferrer"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/roger-urrutia"
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                  rel="noreferrer"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="mailto:rogeralexei.freelance@gmail.com"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

          <motion.div className="container px-4 relative z-10 text-center" style={{ opacity, scale }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 inline-block"
            >
              <span className="px-4 py-2 rounded-full border border-white/10 text-sm font-medium bg-white/5 backdrop-blur-sm">
                Software Developer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-7xl md:text-9xl p-5 font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
            >
              <TextReveal text="Roger  Urrutia" />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10"
            >
              Creating modern, efficient, and user-friendly web applications based in Panama.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {/* <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-full group"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button> */}
              <Link href='https://www.github.com/rogeralexei' target="blank">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full">
                <Github className="mr-2 h-5 w-5" />
                GitHub Profile
              </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              <Link href="#about" className="flex flex-col items-center">
                <span className="text-sm text-white/60 mb-2">Scroll Down</span>
                <div className="w-8 h-12 rounded-full border-2 border-white/20 flex justify-center p-1">
                  <motion.div
                    animate={{ y: [0, 16, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-white"
                  />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-32 relative">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="px-4 py-2 rounded-full border border-white/10 text-sm font-medium bg-white/5 backdrop-blur-sm">
                About Me
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">Who I Am</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <ThreeDCard className="w-full h-[400px] bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl overflow-hidden border border-white/10 p-1">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src="/placeholder.jpg?height=300&width=600"
                      alt="Roger Urrutia"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold mb-2">Roger Urrutia</h3>
                      <p className="text-white/80">Software Developer</p>
                    </div>
                  </div>
                </ThreeDCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">Hello, I'm Roger!</h3>
                <div className="space-y-4 text-white/80">
                  <p>
                    I'm a passionate software developer with a strong foundation in modern web technologies. I
                    specialize in building responsive and performant web applications that deliver exceptional user
                    experiences.
                  </p>
                  <p>
                    My journey in software development began with a curiosity about how digital products work, which led
                    me to pursue a career in this ever-evolving field. I enjoy the challenge of solving complex problems
                    and continuously learning new technologies.
                  </p>
                  <p>
                    When I'm not coding, you can find me exploring new technologies, contributing to open-source
                    projects, or enjoying the beautiful landscapes of Panama.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { label: "Name", value: "Roger Urrutia" },
                    { label: "Email", value: "rogeralexei.freelance@gmail.com" },
                    { label: "Location", value: "Panama" },
                    { label: "Availability", value: "Full-time" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <p className="text-white/60 text-sm">{item.label}:</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
                <Link href="https://drive.google.com/file/d/1olG6Bf68DSlvWl9yBGlzQ7Hhib5tAVdX/view?usp=sharing" target="blank">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-full mt-4">
                  Download CV
                </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 md:py-32 relative bg-black/50">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-900/10 to-black/0"></div>
          </div>

          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="px-4 py-2 rounded-full border border-white/10 text-sm font-medium bg-white/5 backdrop-blur-sm">
                My Skills
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">Technical Expertise</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SkillBar name={skill.name} level={skill.level} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { title: "6+", subtitle: "Years Experience" },
                { title: "30+", subtitle: "Projects Completed" },
                { title: "15+", subtitle: "Happy Clients" },
                { title: "99%", subtitle: "Client Satisfaction" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
                >
                  <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    {stat.title}
                  </h3>
                  <p className="text-white/70 mt-2">{stat.subtitle}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 md:py-32 relative">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="px-4 py-2 rounded-full border border-white/10 text-sm font-medium bg-white/5 backdrop-blur-sm">
                My Work
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">Featured Projects</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mt-12"
            >
              <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full group">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div> */}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32 relative bg-black/50">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-900/10 to-black/0"></div>
          </div>

          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="px-4 py-2 rounded-full border border-white/10 text-sm font-medium bg-white/5 backdrop-blur-sm">
                Get In Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">Contact Me</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">Let's Connect</h3>
                <p className="text-white/80">
                  I'm always open to new opportunities and collaborations. Feel free to reach out if you have a project
                  in mind or just want to connect.
                </p>

                <div className="space-y-6 pt-4">
                  {[
                    {
                      icon: <Mail className="w-5 h-5" />,
                      title: "Email",
                      value: "rogeralexei.freelance@gmail.com",
                      link: "mailto:rogeralexei.freelance@gmail.com",
                    },
                    {
                      icon: <Linkedin className="w-5 h-5" />,
                      title: "LinkedIn",
                      value: "linkedin.com/in/roger-urrutia",
                      link: "https://linkedin.com/in/roger-urrutia",
                    },
                    {
                      icon: <Github className="w-5 h-5" />,
                      title: "GitHub",
                      value: "github.com/rogeralexei",
                      link: "https://github.com/rogeralexei",
                    },
                  ].map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-white/60 text-sm">{item.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div className="pt-6">
                  <h4 className="font-bold mb-4">Follow Me</h4>
                  <div className="flex gap-4">
                    {[Github, Linkedin, Mail].map((Icon, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        whileHover={{ y: -5 }}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                <span className="font-bold text-white">R</span>
              </div>
              <span className="font-bold">Roger Urrutia</span>
            </div>

            <p className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Roger Urrutia. All rights reserved.
            </p>

            <div className="flex gap-4">
              {[Github, Linkedin, Mail].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

