"use client"

import { useEffect, useRef, useState } from "react"
import { Users, Briefcase, Award, Coffee } from "lucide-react"
import ParticlesBackground from "./particles-background"

interface Stat {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
}

const stats: Stat[] = [
  { icon: <Briefcase className="w-8 h-8" />, value: 2, label: "Projects Completed", suffix: "" },
  { icon: <Users className="w-8 h-8" />, value: 2, label: "Happy Clients", suffix: "" },
  { icon: <Award className="w-8 h-8" />, value: 15, label: "Awards Won", suffix: "+" },
  { icon: <Coffee className="w-8 h-8" />, value: 1000, label: "Cups of Coffee", suffix: "+" },
]

export default function Stats() {
  const [counts, setCounts] = useState(stats.map(() => 0))
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          stats.forEach((stat, index) => {
            let current = 0
            const increment = stat.value / 50
            const timer = setInterval(() => {
              current += increment
              if (current >= stat.value) {
                setCounts((prev) => {
                  const newCounts = [...prev]
                  newCounts[index] = stat.value
                  return newCounts
                })
                clearInterval(timer)
              } else {
                setCounts((prev) => {
                  const newCounts = [...prev]
                  newCounts[index] = Math.floor(current)
                  return newCounts
                })
              }
            }, 30)
          })
        }
      },
      { threshold: 0.5 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-mesh-alt">
      {/* Floating Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape top-10 right-20 w-72 h-72 text-primary" />
        <div className="floating-shape-alt bottom-10 left-20 w-64 h-64 text-secondary" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 hover-glow">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">
                {counts[index]}
                {stat.suffix}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
