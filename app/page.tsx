"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import Team from "@/components/team"
import Portfolio from "@/components/portfolio"
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
      <Team />
      <Portfolio />
      <About />
      <Contact />
    </main>
  )
}
