"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import * as THREE from "three"

interface ThreeSectionBgProps {
  variant?: "primary" | "secondary" | "accent"
  particleCount?: number
}

function AnimatedParticles({ color, count }: { color: string; count: number }) {
  const particles = useRef<THREE.Points>(null)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.03
      particles.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5
    }
  })

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingShape({ color }: { color: string }) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 1.5
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, -8]}>
      <torusGeometry args={[1.5, 0.4, 16, 100]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
    </mesh>
  )
}

export default function ThreeSectionBg({ variant = "primary", particleCount = 500 }: ThreeSectionBgProps) {
  const colors = {
    primary: "#c8a9d8",
    secondary: "#9b73c8",
    accent: "#6b4fa0",
  }

  const color = colors[variant]

  return (
    <div className="absolute inset-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color={color} />
        
        <AnimatedParticles color={color} count={particleCount} />
        <FloatingShape color={color} />
      </Canvas>
    </div>
  )
}
