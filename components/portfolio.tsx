"use client"

import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface TeamMember {
  role: string
  name: string
}

interface Project {
  id: number
  title: string
  description: string
  fullDescription: string
  techStack: string[]
  image: string
  images: string[]
  client: string
  clientType: string
  projectDate: string
  team: TeamMember[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with real-time inventory management and seamless checkout experience.",
    fullDescription:
      "Developed a comprehensive e-commerce platform with advanced features including real-time inventory tracking, intelligent product recommendations, and streamlined checkout process. The platform handles thousands of daily transactions with 99.9% uptime and provides detailed analytics for business insights.",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    client: "PT. Retail Nusantara",
    clientType: "Retail Company",
    projectDate: "January 2024 - March 2024",
    team: [
      { role: "Project Manager", name: "Ahmad Izzuddin Azzam" },
      { role: "UI/UX Designer", name: "Faiz Bayu Erlangga" },
      { role: "Frontend Developer", name: "Aurylia Taffana" },
      { role: "Backend Developer", name: "Muhammad Alfi Fariz" },
      { role: "QA Engineer", name: "Abdurrahman Al Ghifari" },
    ],
  },
  {
    id: 2,
    title: "SaaS Analytics Dashboard",
    description: "Comprehensive analytics platform providing real-time insights and data visualization for businesses.",
    fullDescription:
      "Built an enterprise-grade analytics dashboard that processes millions of data points in real-time. Features include customizable reports, predictive analytics, automated alerts, and seamless integration with popular business tools. The platform helps businesses make data-driven decisions faster.",
    techStack: ["Next.js", "TypeScript", "Recharts", "Supabase"],
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    client: "TechStart Indonesia",
    clientType: "Technology Startup",
    projectDate: "April 2024 - June 2024",
    team: [
      { role: "Project Manager", name: "Ahmad Izzuddin Azzam" },
      { role: "UI/UX Designer", name: "Faiz Bayu Erlangga" },
      { role: "Frontend Developer", name: "Muhammad Isa Abdullah" },
      { role: "Backend Developer", name: "Julian Dwi Satrio" },
      { role: "QA Engineer", name: "Abdurrahman Al Ghifari" },
    ],
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    description:
      "Cross-platform fitness application with workout tracking, social features, and AI-powered recommendations.",
    fullDescription:
      "Created an innovative fitness application that combines workout tracking, nutrition planning, and social networking. The AI-powered recommendation engine creates personalized workout plans based on user goals, fitness level, and available equipment. The app has helped over 10,000 users achieve their fitness goals.",
    techStack: ["React Native", "Firebase", "Python", "TensorFlow"],
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    client: "FitLife Asia",
    clientType: "Health & Wellness",
    projectDate: "July 2024 - September 2024",
    team: [
      { role: "Project Manager", name: "Ahmad Izzuddin Azzam" },
      { role: "UI/UX Designer", name: "Faiz Bayu Erlangga" },
      { role: "Mobile Developer", name: "Abdullah Hafizh Furqon" },
      { role: "Backend Developer", name: "Muhammad Alfi Fariz" },
      { role: "QA Engineer", name: "Abdurrahman Al Ghifari" },
    ],
  },
  {
    id: 4,
    title: "Content Management System",
    description: "Headless CMS built for developers with powerful APIs and intuitive content management interface.",
    fullDescription:
      "Developed a flexible headless CMS that empowers content creators while giving developers full control. Features include version control, multi-language support, custom content types, and RESTful/GraphQL APIs. The system serves content to web, mobile, and IoT devices seamlessly.",
    techStack: ["Next.js", "GraphQL", "MongoDB", "Docker"],
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    client: "MediaCorp Digital",
    clientType: "Media & Publishing",
    projectDate: "October 2024 - December 2024",
    team: [
      { role: "Project Manager", name: "Ahmad Izzuddin Azzam" },
      { role: "UI/UX Designer", name: "Faiz Bayu Erlangga" },
      { role: "Frontend Developer", name: "Aurylia Taffana" },
      { role: "Backend Developer", name: "Julian Dwi Satrio" },
      { role: "QA Engineer", name: "Abdurrahman Al Ghifari" },
    ],
  },
]

export default function Portfolio() {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
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
    <>
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
                      <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full px-4 py-2 bg-linear-to-r from-primary via-secondary to-accent text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] p-0">
          {selectedProject && (
            <div className="flex flex-col max-h-[90vh]">
              <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
                <DialogTitle className="text-3xl font-bold gradient-text">{selectedProject.title}</DialogTitle>
              </DialogHeader>

              <div className="overflow-y-auto px-6 py-6 space-y-6 scrollbar-hidden">
                {/* Image Carousel */}
                <div className="w-full">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {selectedProject.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="rounded-lg overflow-hidden border-2 border-border">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`${selectedProject.title} - Image ${index + 1}`}
                              className="w-full h-[350px] object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </Carousel>
                </div>

                {/* Project Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="gradient-border">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Client</h4>
                      <p className="font-bold text-xl mb-1">{selectedProject.client}</p>
                      <p className="text-sm text-muted-foreground">{selectedProject.clientType}</p>
                    </CardContent>
                  </Card>
                  <Card className="gradient-border">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Project Timeline</h4>
                      <p className="font-bold text-xl">{selectedProject.projectDate}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-bold text-xl mb-3">Project Description</h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedProject.fullDescription}</p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-bold text-xl mb-3">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <Badge key={tech} variant="default" className="px-4 py-2 text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Team Members */}
                <div>
                  <h4 className="font-bold text-xl mb-3">Development Team</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.team.map((member, index) => (
                      <Card key={index} className="gradient-border">
                        <CardContent className="pt-4 pb-4">
                          <p className="font-semibold text-primary text-sm">{member.role}</p>
                          <p className="font-bold">{member.name}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
