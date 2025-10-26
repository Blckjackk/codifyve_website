"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Smartphone, Palette, Server, TestTube, Cloud } from "lucide-react"
import { motion } from "framer-motion"
import ThreeSectionBg from "./three-section-bg"

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
    <section id="services" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background/50">
      {/* 3D Background */}
      <ThreeSectionBg variant="primary" particleCount={600} />
      
      {/* Floating Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="floating-shape-alt top-20 left-10 w-80 h-80 text-accent" />
        <div className="floating-shape bottom-20 right-10 w-72 h-72 text-primary" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions to bring your ideas to life
          </p>
        </motion.div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              data-service-id={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover-glow gradient-border group cursor-pointer backdrop-blur-sm bg-card/50">
                <CardHeader>
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {service.icon}
                  </motion.div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
