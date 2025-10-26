"use client"

import ThreeBackground from "./three-background"

interface HeroProps {
  scrollY: number
}

export default function Hero({ scrollY }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-linear-to-b from-background via-background/95 to-background">
      {/* 3D Background with React Three Fiber */}
      <ThreeBackground />
      
      {/* Floating Animated Shapes (kept for additional depth) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="floating-shape top-10 left-[10%] w-96 h-96 text-primary" />
        <div className="floating-shape-alt top-20 right-[15%] w-[500px] h-[500px] text-secondary" />
        <div className="floating-shape bottom-20 right-[10%] w-80 h-80 text-accent" />
        <div className="floating-shape-alt bottom-10 left-[20%] w-96 h-96 text-primary" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 gradient-text">
            Transforming Code into Experiences
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're a creative software development team specializing in web and app solutions that bring your vision to
            life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#portfolio"
              className="px-8 py-3 bg-linear-to-r from-primary via-secondary to-accent text-primary-foreground font-semibold rounded-lg hover-glow inline-block"
            >
              View Our Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all inline-block"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
