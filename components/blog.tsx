"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import ParticlesBackground from "./particles-background"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
}

const posts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    excerpt:
      "Explore the latest trends and technologies shaping the future of web development, from AI integration to serverless architecture...",
    author: "Aurylia Taffana",
    date: "Oct 15, 2024",
    readTime: "5 min read",
    category: "Technology",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Why UI/UX Design Matters for Your Business",
    excerpt:
      "Learn how great design can increase conversions, improve user satisfaction, and give your business a competitive edge...",
    author: "Faiz Bayu Erlangga",
    date: "Oct 10, 2024",
    readTime: "4 min read",
    category: "Design",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Building Scalable Mobile Applications",
    excerpt:
      "Best practices for creating mobile apps that grow with your business, from architecture planning to performance optimization...",
    author: "Abdullah Hafizh Furqon",
    date: "Oct 5, 2024",
    readTime: "6 min read",
    category: "Mobile",
    image: "/placeholder.svg",
  },
]

export default function Blog() {
  const [visiblePosts, setVisiblePosts] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const postId = Number.parseInt(entry.target.getAttribute("data-post-id") || "0")
            setVisiblePosts((prev) => [...new Set([...prev, postId])])
          }
        })
      },
      { threshold: 0.2 },
    )

    const elements = sectionRef.current?.querySelectorAll("[data-post-id]")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="blog" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-mesh">
      {/* Floating Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape-alt top-20 right-20 w-80 h-80 text-secondary" />
        <div className="floating-shape bottom-20 left-20 w-72 h-72 text-primary" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Latest Insights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends and insights from our team
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={post.id}
              data-post-id={post.id}
              className={`transition-all duration-500 ${
                visiblePosts.includes(post.id) ? "animate-fade-in-up opacity-100" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <Card className="hover-glow cursor-pointer overflow-hidden group h-full flex flex-col gradient-border">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-primary/20 text-primary hover:bg-primary/30">{post.category}</Badge>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</h3>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <p className="text-sm font-semibold mb-3">By {post.author}</p>
                  <button className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
