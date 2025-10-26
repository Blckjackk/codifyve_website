"use client"

import { useEffect, useRef, useState } from "react"
import { Instagram, Github, Linkedin } from "lucide-react"
import { motion } from "framer-motion"
import ThreeSectionBg from "./three-section-bg"

interface TeamMember {
  id: number
  name: string
  role: string
  tagline: string
  image: string
  socials: {
    instagram?: string
    github?: string
    linkedin?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ahmad Izzuddin Azzam",
    role: "Project Manager",
    tagline: "Leading projects with vision and precision",
    image: "/Azzam.png",
    socials: {
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: 2,
    name: "Abdurrahman Al Ghifari",
    role: "QA",
    tagline: "Ensuring quality in every line of code",
    image: "/Ghifari.png",
    socials: {
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: 3,
    name: "Muhammad Alfi Fariz",
    role: "Backend Developer",
    tagline: "Building robust and scalable systems",
    image: "/Alfi.png",
    socials: {
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: 4,
    name: "Aurylia Taffana",
    role: "Frontend Developer",
    tagline: "Crafting beautiful user experiences",
    image: "/Auryl.png",
    socials: {
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: 5,
    name: "Faiz Bayu Erlangga",
    role: "UI/UX Designer",
    tagline: "Designing intuitive and engaging interfaces",
    image: "/Faiz.png",
    socials: {
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: 6,
    name: "Muhammad Isa Abdullah",
    role: "Frontend Developer",
    tagline: "Bringing designs to life with code",
    image: "/Isa.png",
    socials: {
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: 7,
    name: "Abdullah Hafizh Furqon",
    role: "Mobile Developer",
    tagline: "Creating seamless mobile experiences",
    image: "/Abdul.png",
    socials: {
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: 8,
    name: "Julian Dwi Satrio",
    role: "Backend Developer",
    tagline: "Engineering powerful server solutions",
    image: "/Julian.png",
    socials: {
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
]

export default function Team() {
  const [visibleMembers, setVisibleMembers] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const memberId = Number.parseInt(entry.target.getAttribute("data-member-id") || "0")
            setVisibleMembers((prev) => [...new Set([...prev, memberId])])
          }
        })
      },
      { threshold: 0.3 },
    )

    const memberElements = sectionRef.current?.querySelectorAll("[data-member-id]")
    memberElements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="team" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background/40">
      {/* 3D Background */}
      <ThreeSectionBg variant="accent" particleCount={800} />
      
      {/* Floating Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
        <div className="floating-shape-alt top-20 right-20 w-80 h-80 text-primary" />
        <div className="floating-shape bottom-20 left-20 w-96 h-96 text-secondary" />
        <div className="floating-shape top-1/2 left-1/2 w-64 h-64 text-accent" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Talented individuals united by a passion for creating exceptional digital solutions
          </p>
        </motion.div>

        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              data-member-id={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.08,
                ease: "easeOut" 
              }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div 
                className="mb-4 relative inline-block"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/30 hover-glow">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div 
                  className="absolute inset-0 rounded-full bg-linear-to-br from-primary/20 to-accent/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-semibold mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground mb-3">{member.tagline}</p>
              
              {/* Social Media Links */}
              <div className="flex justify-center gap-3 mt-4">
                {member.socials.instagram && (
                  <a
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
