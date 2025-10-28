"use client"

import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import ThreeSectionBg from "./three-section-bg"

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
    title: "BFUB CBT Website",
    description: "Competition-Based Testing platform for BFUB XXVII national biology and science olympiad with integrated registration and online examination system.",
    fullDescription:
      "Bakti Formica Untuk Bangsa (BFUB) XXVII is an annual program by BEM HMBF FPMIPA UPI, serving as a platform for developing the potential and competence of Indonesian youth in science and biology. The event includes various competition branches such as Science Olympiad (OSA), Biology Olympiad (OBI), Biology Quick Quiz Competition (LCTB), National Scientific Paper Competition (LKTIN), Microteaching, and National Biology Olympiad (OBN). To support more efficient, transparent, and modern competition implementation, the Official BFUB XXVII Website was developed as an integrated digital platform for all competition activities, from participant registration to online competition execution.",
    techStack: ["Laravel", "Node.js", "MySQL", "Bootstrap"],
    image: "/Project/bfub/Bfub 4.png",
    images: ["/Project/bfub/Bfub 1.png", "/Project/bfub/Bfub 2.png", "/Project/bfub/Bfub 3.png", "/Project/bfub/Bfub 4.png"],
    client: "HMBF FPMIPA UPI - Panitia BFUB",
    clientType: "Academic Organization",
    projectDate: "July 2025 - August 2025",
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
    title: "Phyfest UPI",
    description: "Digital platform for Physics Festival UPI featuring event registration, competition management, and real-time leaderboard system.",
    fullDescription:
      "Physics Festival (Phyfest) UPI is a prestigious annual physics competition organized by the Physics Education Student Association of UPI. The event brings together talented students from across Indonesia to compete in various physics-related competitions and activities. We developed a comprehensive web platform that streamlines the entire event lifecycle - from participant registration, competition administration, to live score tracking and winner announcements. The platform features a modern interface, secure payment integration, and real-time updates to enhance participant experience.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    client: "HMPS Pendidikan Fisika UPI",
    clientType: "Academic Organization",
    projectDate: "September 2025 - October 2025",
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
    id: 4,
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
      <section id="portfolio" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-mesh-alt">
        {/* Floating Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-shape top-10 right-10 w-96 h-96 text-secondary" />
          <div className="floating-shape-alt bottom-10 left-10 w-80 h-80 text-accent" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Our Portfolio</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Showcasing our latest projects and the innovative solutions we've built
            </p>
          </motion.div>

          <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                data-project-id={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.15,
                  ease: "easeOut" 
                }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                className="gradient-border rounded-lg overflow-hidden"
              >
                <div className="bg-card/50 backdrop-blur-sm p-6 hover-glow h-full">
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
              </motion.div>
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
