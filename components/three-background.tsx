"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sparkles, MeshDistortMaterial, OrbitControls } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

// Animated Particle Field
function ParticleField() {
  const particles = useRef<THREE.Points>(null)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.05
      particles.current.rotation.x = state.clock.elapsedTime * 0.02
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
        size={0.05}
        color="#c8a9d8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Floating Geometric Shapes
function FloatingGeometry() {
  return (
    <>
      {/* Torus */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-8, 2, -10]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[2, 0.5, 16, 100]} />
          <MeshDistortMaterial
            color="#9b73c8"
            transparent
            opacity={0.3}
            distort={0.4}
            speed={2}
            wireframe
          />
        </mesh>
      </Float>

      {/* Sphere */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[8, -2, -8]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <MeshDistortMaterial
            color="#c8a9d8"
            transparent
            opacity={0.25}
            distort={0.3}
            speed={1.5}
            wireframe
          />
        </mesh>
      </Float>

      {/* Octahedron */}
      <Float speed={2.5} rotationIntensity={2} floatIntensity={2.5}>
        <mesh position={[0, 4, -15]} rotation={[0, 0, 0]}>
          <octahedronGeometry args={[2]} />
          <MeshDistortMaterial
            color="#6b4fa0"
            transparent
            opacity={0.2}
            distort={0.5}
            speed={2}
            wireframe
          />
        </mesh>
      </Float>

      {/* Box */}
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[-6, -4, -12]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <MeshDistortMaterial
            color="#c8a9d8"
            transparent
            opacity={0.2}
            distort={0.3}
            speed={1.5}
            wireframe
          />
        </mesh>
      </Float>

      {/* Cone */}
      <Float speed={2.2} rotationIntensity={1.8} floatIntensity={2}>
        <mesh position={[6, 3, -10]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[1.5, 3, 32]} />
          <MeshDistortMaterial
            color="#9b73c8"
            transparent
            opacity={0.25}
            distort={0.4}
            speed={2}
            wireframe
          />
        </mesh>
      </Float>
    </>
  )
}

// Main 3D Background Component
export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#c8a9d8" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6b4fa0" />

        {/* Sparkles */}
        <Sparkles
          count={200}
          scale={20}
          size={2}
          speed={0.4}
          opacity={0.6}
          color="#c8a9d8"
        />

        {/* Particle Field */}
        <ParticleField />

        {/* Floating Geometric Shapes */}
        <FloatingGeometry />

        {/* Mouse interaction (subtle) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
