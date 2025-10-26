"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ParticlesBackground from "./particles-background"

const faqs = [
  {
    question: "What services does Codifyve offer?",
    answer:
      "We offer full-stack development services including web applications, mobile apps, UI/UX design, backend development, and quality assurance testing. Our team specializes in creating custom solutions tailored to your business needs.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity and scope. A simple website takes 2-4 weeks, while complex applications may take 2-6 months. We'll provide a detailed timeline during our initial consultation and keep you updated throughout the development process.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes! We offer comprehensive maintenance packages including bug fixes, security updates, feature enhancements, and technical support. We're committed to your project's long-term success and growth.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "We specialize in modern technologies including React, Next.js, Node.js, React Native, TypeScript, PostgreSQL, MongoDB, Firebase, and various cloud platforms like Vercel and AWS. We always choose the best tech stack for your specific needs.",
  },
  {
    question: "How do you handle project communication?",
    answer:
      "We use agile methodology with regular check-ins, progress reports, and collaborative tools like Slack, Trello, or Jira. You'll have direct access to your dedicated project manager throughout the entire development process.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer flexible pricing based on project scope - fixed price for well-defined projects or hourly rates for ongoing work and maintenance. Contact us for a free consultation and customized quote tailored to your budget and requirements.",
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-mesh-alt">
      {/* Floating Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape top-10 left-10 w-64 h-64 text-accent" />
        <div className="floating-shape-alt bottom-10 right-10 w-72 h-72 text-primary" />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">Got questions? We've got answers!</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="gradient-border rounded-lg px-6 bg-card hover-glow"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
