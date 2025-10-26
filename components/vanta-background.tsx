"use client"

import { useEffect, useRef } from "react"

interface VantaBackgroundProps {
  effect?: "net" | "globe" | "waves"
}

export default function VantaBackground({ effect = "net" }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null)

  useEffect(() => {
    if (!vantaRef.current || vantaEffect.current) return

    // Dynamically import Vanta and Three.js
    const loadVanta = async () => {
      try {
        const THREE = await import("three")
        
        if (effect === "net") {
          const NET = await import("vanta/dist/vanta.net.min")
          vantaEffect.current = (NET as any).default({
            el: vantaRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x8b5cf6, // primary purple
            backgroundColor: 0x0a0a0a, // dark background
            points: 8.0,
            maxDistance: 20.0,
            spacing: 15.0,
          })
        } else if (effect === "globe") {
          const GLOBE = await import("vanta/dist/vanta.globe.min")
          vantaEffect.current = (GLOBE as any).default({
            el: vantaRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x8b5cf6,
            backgroundColor: 0x0a0a0a,
            size: 1.2,
          })
        } else if (effect === "waves") {
          const WAVES = await import("vanta/dist/vanta.waves.min")
          vantaEffect.current = (WAVES as any).default({
            el: vantaRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x8b5cf6,
            shininess: 30.0,
            waveHeight: 15.0,
            waveSpeed: 0.5,
          })
        }
      } catch (error) {
        console.error("Error loading Vanta:", error)
      }
    }

    loadVanta()

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
      }
    }
  }, [effect])

  return <div ref={vantaRef} className="absolute inset-0 -z-10" />
}
