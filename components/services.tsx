"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Smartphone, Palette, Server, TestTube, Cloud } from "lucide-react"

interface Service {
  id: number
  icon: React.ReactNode
  title: string
  description: string
}

const services: Service[] = [
  {
    id: 1,
    icon: <Code className="w-10 h-10" />,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks like React, Next.js, and TypeScript.",
  },
  {
    id: 2,
    icon: <Smartphone className="w-10 h-10" />,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps for iOS and Android using React Native and Flutter.",
  },
  {
    id: 3,
    icon: <Palette className="w-10 h-10" />,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces designed to engage users and drive conversions.",
  },
  {
    id: 4,
    icon: <Server className="w-10 h-10" />,
    title: "Backend Development",
    description: "Robust server-side solutions with Node.js, Python, and scalable database architectures.",
  },
  {
    id: 5,
    icon: <TestTube className="w-10 h-10" />,
    title: "Quality Assurance",
    description: "Comprehensive testing to ensure your application works flawlessly across all platforms.",
  },
  {
    id: 6,
    icon: <Cloud className="w-10 h-10" />,
    title: "Cloud Solutions",
    description: "Deploy and scale your applications on AWS, Google Cloud, or Azure infrastructure.",
  },
]

export default function Services() {
  const [visibleServices, setVisibleServices] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const serviceId = Number.parseInt(entry.target.getAttribute("data-service-id") || "0")
            setVisibleServices((prev) => [...new Set([...prev, serviceId])])
          }
        })
      },
      { threshold: 0.2 },
    )

    const elements = sectionRef.current?.querySelectorAll("[data-service-id]")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions to bring your ideas to life
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-service-id={service.id}
              className={`transition-all duration-500 ${
                visibleServices.includes(service.id) ? "animate-fade-in-up opacity-100" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <Card className="h-full hover-glow gradient-border group cursor-pointer">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
