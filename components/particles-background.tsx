"use client"

import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { type Container, type ISourceOptions } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"

interface ParticlesBackgroundProps {
  variant?: "hero" | "section" | "subtle"
}

export default function ParticlesBackground({ variant = "section" }: ParticlesBackgroundProps) {
  const [init, setInit] = useState(false)

  // Initialize particles engine ONCE
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // Particles loaded
  }

  // Optimized config - ENHANCED with COOL EFFECTS
  const options: ISourceOptions = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 120,
      detectRetina: true,
      particles: {
        number: {
          value: variant === "hero" ? 100 : variant === "section" ? 70 : 50,
          density: { enable: true },
        },
        color: {
          value: variant === "hero" 
            ? ["#8b5cf6", "#d946ef", "#06b6d4", "#a855f7", "#ec4899"] 
            : ["#8b5cf6", "#d946ef", "#a855f7"],
        },
        shape: {
          type: ["circle", "triangle"],
        },
        opacity: {
          value: { min: 0.2, max: 0.7 },
          animation: {
            enable: true,
            speed: 0.8,
            minimumValue: 0.1,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: variant === "hero" ? 5 : 4 },
          animation: {
            enable: true,
            speed: 3,
            minimumValue: 0.5,
            sync: false,
          },
        },
        links: {
          enable: true,
          distance: variant === "hero" ? 180 : 150,
          color: "#8b5cf6",
          opacity: variant === "hero" ? 0.3 : variant === "section" ? 0.2 : 0.15,
          width: 1.5,
          triangles: {
            enable: variant === "hero",
            opacity: 0.08,
            color: "#d946ef",
          },
        },
        move: {
          enable: true,
          speed: variant === "hero" ? 2 : variant === "section" ? 1.5 : 1,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "bounce" },
          attract: {
            enable: true,
            rotateX: 800,
            rotateY: 1600,
          },
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: true,
            mode: variant === "hero" ? ["grab", "bubble"] : "grab",
            parallax: {
              enable: true,
              force: 80,
            },
          },
          onClick: {
            enable: true,
            mode: "push",
          },
          resize: {
            enable: true,
            delay: 0.5,
          },
        },
        modes: {
          grab: {
            distance: variant === "hero" ? 250 : 180,
            links: {
              opacity: variant === "hero" ? 0.6 : 0.4,
              color: "#d946ef",
            },
          },
          bubble: {
            distance: 250,
            size: 8,
            duration: 2,
            opacity: 0.9,
            color: "#ec4899",
          },
          push: {
            quantity: 4,
          },
        },
      },
    }),
    [variant],
  )

  if (!init) {
    // Show gradient background while loading to avoid blank screen
    return (
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-background to-accent/5 animate-pulse" />
    )
  }

  return (
    <Particles
      id={`particles-${variant}`}
      className="absolute inset-0 -z-10"
      particlesLoaded={particlesLoaded}
      options={options}
    />
  )
}
