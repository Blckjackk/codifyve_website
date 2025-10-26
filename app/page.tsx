"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import Stats from "@/components/stats"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import Team from "@/components/team"
import Testimonials from "@/components/testimonials"
import Blog from "@/components/blog"
import FAQ from "@/components/faq"
import About from "@/components/about"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="bg-background text-foreground overflow-hidden">
      <Navigation />
      <Hero scrollY={scrollY} />
      <Stats />
      <Services />
      <Portfolio />
      <Team />
      <Testimonials />
      <Blog />
      <FAQ />
      <About />
      <Contact />
    </main>
  )
}
