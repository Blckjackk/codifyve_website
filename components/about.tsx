"use client"

import ThreeBackground from "./three-background"

export default function About() {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-linear-to-b from-background via-background/95 to-background">
      {/* 3D Background with React Three Fiber */}
      <ThreeBackground />
      
      {/* Floating Animated Shapes (kept for additional depth) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="floating-shape-alt top-20 right-20 w-80 h-80 text-secondary" />
        <div className="floating-shape bottom-20 left-20 w-72 h-72 text-accent" />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">About Codifyve</h2>
        </div>

        <div className="space-y-8">
          <div className="bg-card rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At <span className="text-primary font-semibold">Codifyve</span>, we believe that great software is more
              than just code—it's about creating{" "}
              <span className="text-primary font-semibold">meaningful experiences</span> that solve real problems. Our
              mission is to transform innovative ideas into elegant, scalable digital solutions that empower businesses
              and delight users.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We envision a future where technology seamlessly integrates into every aspect of business, enabling
              companies to focus on what matters most. By combining{" "}
              <span className="text-primary font-semibold">cutting-edge technology</span> with{" "}
              <span className="text-primary font-semibold">human-centered design</span>, we create solutions that are
              both powerful and intuitive.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-bold mb-4 text-primary">What Makes Us Unique</h3>
            <ul className="space-y-3 text-lg text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>
                  <span className="text-primary font-semibold">Collaborative Approach:</span> We work closely with our
                  clients to understand their vision and deliver solutions that exceed expectations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>
                  <span className="text-primary font-semibold">Technical Excellence:</span> Our team stays at the
                  forefront of technology, using the latest tools and best practices.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>
                  <span className="text-primary font-semibold">Design-Driven:</span> We believe beautiful design and
                  robust functionality go hand in hand.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>
                  <span className="text-primary font-semibold">Scalable Solutions:</span> We build with the future in
                  mind, creating systems that grow with your business.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
