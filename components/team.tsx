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
    name: "Ahmad Izzuddin Azzam",
    role: "Project Manager",
    tagline: "Leading projects with vision and precision",
    image: "/Azzam.png",
  },
  {
    id: 2,
    name: "Abdurrahman Al Ghifari",
    role: "QA",
    tagline: "Ensuring quality in every line of code",
    image: "/Ghifari.png",
  },
  {
    id: 3,
    name: "Muhammad Alfi Fariz",
    role: "Backend Developer",
    tagline: "Building robust and scalable systems",
    image: "/Alfi.png",
  },
  {
    id: 4,
    name: "Aurylia Taffana",
    role: "Frontend Developer",
    tagline: "Crafting beautiful user experiences",
    image: "/Auryl.png",
  },
  {
    id: 5,
    name: "Faiz Bayu Erlangga",
    role: "UI/UX Designer",
    tagline: "Designing intuitive and engaging interfaces",
    image: "/Faiz.png",
  },
  {
    id: 6,
    name: "Muhammad Isa Abdullah",
    role: "Frontend Developer",
    tagline: "Bringing designs to life with code",
    image: "/Isa.png",
  },
  {
    id: 7,
    name: "Abdullah Hafizh Furqon",
    role: "Mobile Developer",
    tagline: "Creating seamless mobile experiences",
    image: "/Abdul.png",
  },
  {
    id: 8,
    name: "Julian Dwi Satrio",
    role: "Backend Developer",
    tagline: "Engineering powerful server solutions",
    image: "/Julian.png",
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
                animationDelay: `${index * 80}ms`,
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
