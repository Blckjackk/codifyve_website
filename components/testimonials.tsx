"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  image: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "CEO",
    company: "PT. Retail Nusantara",
    image: "/placeholder.svg",
    rating: 5,
    text: "Codifyve delivered beyond our expectations. The e-commerce platform they built has increased our sales by 150%!",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Product Manager",
    company: "TechStart Indonesia",
    image: "/placeholder.svg",
    rating: 5,
    text: "Professional team with great communication. They turned our complex requirements into a beautiful, functional product.",
  },
  {
    id: 3,
    name: "Ahmad Rahman",
    role: "Founder",
    company: "FitLife Asia",
    image: "/placeholder.svg",
    rating: 5,
    text: "The mobile app exceeded all our goals. User engagement is up 200%. Highly recommend Codifyve!",
  },
]

export default function Testimonials() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = Number.parseInt(entry.target.getAttribute("data-testimonial-id") || "0")
            setVisibleItems((prev) => [...new Set([...prev, itemId])])
          }
        })
      },
      { threshold: 0.2 },
    )

    const elements = sectionRef.current?.querySelectorAll("[data-testimonial-id]")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              data-testimonial-id={testimonial.id}
              className={`transition-all duration-500 ${
                visibleItems.includes(testimonial.id) ? "animate-fade-in-up opacity-100" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <Card className="h-full hover-glow gradient-border">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <Avatar className="border-2 border-primary/20">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
