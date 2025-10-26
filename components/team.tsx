"use client"

import { useEffect, useRef, useState } from "react"

interface TeamMember {
  id: number
  name: string
  role: string
  tagline: string
  image: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Lead Developer",
    tagline: "Full-stack wizard crafting seamless digital experiences",
    image: "/professional-developer-portrait.png",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "UI/UX Designer",
    tagline: "Creating beautiful interfaces that users love",
    image: "/professional-designer-portrait.png",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Project Lead",
    tagline: "Turning ideas into reality with precision and passion",
    image: "/professional-project-manager.png",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Backend Engineer",
    tagline: "Building robust systems that scale",
    image: "/professional-engineer-portrait.png",
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
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Talented individuals united by a passion for creating exceptional digital solutions
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              data-member-id={member.id}
              className={`text-center transition-all duration-500 ${
                visibleMembers.includes(member.id) ? "animate-fade-in-up opacity-100" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="mb-4 relative inline-block">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/30 hover-glow">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-semibold mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.tagline}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
