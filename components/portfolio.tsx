"use client"

import { useEffect, useRef, useState } from "react"

interface Project {
  id: number
  title: string
  description: string
  techStack: string[]
  image: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with real-time inventory management and seamless checkout experience.",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "/ecommerce-dashboard.png",
  },
  {
    id: 2,
    title: "SaaS Analytics Dashboard",
    description: "Comprehensive analytics platform providing real-time insights and data visualization for businesses.",
    techStack: ["Next.js", "TypeScript", "Recharts", "Supabase"],
    image: "/analytics-dashboard.png",
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    description:
      "Cross-platform fitness application with workout tracking, social features, and AI-powered recommendations.",
    techStack: ["React Native", "Firebase", "Python", "TensorFlow"],
    image: "/fitness-app-interface.png",
  },
  {
    id: 4,
    title: "Content Management System",
    description: "Headless CMS built for developers with powerful APIs and intuitive content management interface.",
    techStack: ["Next.js", "GraphQL", "MongoDB", "Docker"],
    image: "/cms-interface.png",
  },
]

export default function Portfolio() {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = Number.parseInt(entry.target.getAttribute("data-project-id") || "0")
            setVisibleProjects((prev) => [...new Set([...prev, projectId])])
          }
        })
      },
      { threshold: 0.2 },
    )

    const projectElements = sectionRef.current?.querySelectorAll("[data-project-id]")
    projectElements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Our Portfolio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing our latest projects and the innovative solutions we've built
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              data-project-id={project.id}
              className={`gradient-border rounded-lg overflow-hidden transition-all duration-500 ${
                visibleProjects.includes(project.id) ? "animate-fade-in-up opacity-100" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="bg-card p-6 hover-glow">
                <div className="mb-4 rounded-lg overflow-hidden h-48">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
