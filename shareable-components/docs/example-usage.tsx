// Example usage in a Next.js app
// File: app/page.tsx or pages/index.tsx

import { FloatingNavBar } from '@/components/sections/floating-navbar'
import FeaturesBento from '@/components/sections/FeaturesBento'
import ContactSection from '@/components/sections/contact-section'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Smooth gradient background that transitions between sections */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-orange-500/[0.02]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.015),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(34,197,94,0.015),transparent_50%)]" />
      </div>
      
      {/* Floating Navigation */}
      <FloatingNavBar 
        companyName="Your Company"
        navItems={[
          { label: "Home", sectionId: "home" },
          { label: "Features", sectionId: "features" },
          { label: "Contact", sectionId: "contact" }
        ]}
      />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">Welcome to Your App</h1>
          <p className="text-xl text-muted-foreground">Built with AI Auto Service Components</p>
        </div>
      </section>
      
      {/* Dividing line between sections */}
      <div className="relative py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>
      </div>
      
      {/* Features Bento Grid */}
      <div id="features">
        <FeaturesBento />
      </div>
      
      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>
    </main>
  );
}

// Alternative: Individual component usage

// Just the navbar
export function NavbarOnly() {
  return (
    <>
      <FloatingNavBar 
        companyName="My App"
        logo={<CustomLogo />} // Optional custom logo
        navItems={[
          { label: "Products", sectionId: "products" },
          { label: "Services", sectionId: "services" },
          { label: "About", sectionId: "about" },
          { label: "Contact", sectionId: "contact" }
        ]}
      />
      {/* Your content */}
    </>
  )
}

// Just the bento grid
export function BentoOnly() {
  return (
    <section className="py-16">
      <FeaturesBento />
    </section>
  )
}

// Just the contact section
export function ContactOnly() {
  return (
    <section className="py-20">
      <ContactSection />
    </section>
  )
}

// Custom logo component example
function CustomLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}