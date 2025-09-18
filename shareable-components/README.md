# AI Auto Service - Shareable Components Package

This package contains three main components from the AI Auto Service website:
1. **Floating Navigation Bar** - Sticky navbar with theme toggle and smooth scroll
2. **Features Bento Grid** - Interactive grid with live animations 
3. **Contact Section** - Complete contact form with direct contact options

## 🚀 Quick Setup

### 1. Dependencies

Install the required dependencies in your Next.js project:

```bash
# Core dependencies
npm install framer-motion lucide-react class-variance-authority clsx tailwind-merge recharts

# If using shadcn/ui (recommended)
npx shadcn@latest add button input textarea card badge

# Or install manually
npm install @radix-ui/react-slot @radix-ui/react-label
```

### 2. Theme Configuration

Add this CSS to your global styles (or copy from `/styles/globals.css`):

```css
@custom-variant dark (&:is(.dark *));

:root {
  /* Light theme - warm beige background */
  --background: oklch(0.96 0.02 85.00);
  --foreground: oklch(0.34 0.03 94.42);
  --card: oklch(0.97 0.015 85.00);
  --card-foreground: oklch(0.19 0 0);
  --primary: oklch(0.62 0.14 39.15);
  --primary-foreground: oklch(1.00 0 0);
  --secondary: oklch(0.92 0.015 85.00);
  --secondary-foreground: oklch(0.43 0.02 99.33);
  --muted: oklch(0.93 0.02 85.00);
  --muted-foreground: oklch(0.61 0.01 91.49);
  --border: oklch(0.90 0.015 85.00);
  --input: oklch(0.76 0.02 96.91);
  --ring: oklch(0.59 0.17 252.92);
}

.dark {
  /* Dark theme */
  --background: oklch(0.27 0 0);
  --foreground: oklch(0.81 0.01 93.53);
  --card: oklch(0.27 0 0);
  --card-foreground: oklch(0.98 0.01 93.48);
  --primary: oklch(0.67 0.13 38.92);
  --primary-foreground: oklch(1.00 0 0);
  --secondary: oklch(0.98 0.01 93.48);
  --secondary-foreground: oklch(0.31 0 0);
  --muted: oklch(0.22 0 0);
  --muted-foreground: oklch(0.77 0.02 100.64);
  --border: oklch(0.36 0.01 106.85);
  --input: oklch(0.43 0.01 99.03);
  --ring: oklch(0.59 0.17 252.92);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground antialiased;
  }
}
```

### 3. Copy Components

Copy the component files to your project:

```
src/
├── components/
│   ├── ui/               # Basic UI components
│   ├── kokonutui/        # Animation components  
│   ├── magicui/          # Beam animations
│   └── sections/         # Main components
├── lib/                  # Utilities
└── styles/               # Global styles
```

### 4. Utils Configuration

Ensure you have the `cn` utility function in `lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## 📦 Component Usage

### Floating Navigation Bar

```tsx
import { FloatingNavBar } from '@/components/sections/floating-navbar'

export default function Layout() {
  return (
    <>
      <FloatingNavBar 
        companyName="Your Company"
        navItems={[
          { label: "Home", sectionId: "home" },
          { label: "About", sectionId: "about" },
          { label: "Contact", sectionId: "contact" }
        ]}
      />
      {/* Your content */}
    </>
  )
}
```

**Features:**
- ✅ Sticky positioning with scroll effects
- ✅ Dark/light theme toggle
- ✅ Smooth scroll to sections
- ✅ Responsive design
- ✅ Backdrop blur effects

### Features Bento Grid

```tsx
import FeaturesBento from '@/components/sections/FeaturesBento'

export default function FeaturesSection() {
  return (
    <div id="features">
      <FeaturesBento />
    </div>
  )
}
```

**Included Animations:**
- ✅ Live Analytics with charts
- ✅ AI Voice interaction
- ✅ Email campaign automation
- ✅ AI content generation
- ✅ Web scraping visualization
- ✅ Lead lifecycle tracking
- ✅ CRM integrations with beams

### Contact Section

```tsx
import ContactSection from '@/components/sections/contact-section'

export default function ContactPage() {
  return (
    <div id="contact">
      <ContactSection />
    </div>
  )
}
```

**Features:**
- ✅ Contact form with file upload
- ✅ Direct contact buttons (Phone/WhatsApp, Email, Calendar)
- ✅ Form validation
- ✅ Responsive design
- ✅ Success state handling

## 🎨 Customization

### Theme Colors

Modify the CSS custom properties in `globals.css` to match your brand:

```css
:root {
  --primary: oklch(0.62 0.14 39.15); /* Orange - change hue for different colors */
  --background: oklch(0.96 0.02 85.00); /* Warm beige - adjust lightness/hue */
}
```

### Animation Colors

Update animation colors in the respective component files:
- `components/kokonutui/analytics-clean.tsx`
- `components/kokonutui/industry-animations.tsx`
- `components/kokonutui/email-features-animation.tsx`

### Contact Configuration

Update contact methods in `contact-section.tsx`:

```typescript
const handlePhoneContact = () => {
  // Update with your WhatsApp/phone number
  window.open('tel:+1234567890', '_self')
}

const handleEmailContact = () => {
  // Update with your email
  window.open('mailto:your-email@domain.com', '_self')
}

const handleMeetingContact = () => {
  // Update with your calendar link
  window.open('https://calendly.com/your-calendar', '_blank')
}
```

## 🔧 Integration Notes

### Required HTML Structure

For smooth scrolling navigation to work, ensure your sections have matching IDs:

```tsx
<main>
  <div id="automation">
    {/* Your automation section */}
  </div>
  <div id="features">
    <FeaturesBento />
  </div>
  <div id="contact">
    <ContactSection />
  </div>
</main>
```

### Background Gradients

Add smooth background transitions between sections:

```tsx
<main className="min-h-screen relative">
  {/* Smooth gradient background */}
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-orange-500/[0.02]" />
  </div>
  
  {/* Your content */}
</main>
```

### Section Dividers

Add subtle dividers between sections:

```tsx
{/* Between sections */}
<div className="relative py-8">
  <div className="max-w-7xl mx-auto px-4">
    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
  </div>
</div>
```

## 🚨 Common Issues

### Animation Performance
- Ensure `framer-motion` is properly installed
- Use `useInView` for performance optimization on scroll animations

### Theme Toggle Not Working
- Verify dark mode is properly configured in your Next.js setup
- Check that CSS custom properties are loaded

### Beam Animations Not Visible
- Ensure container has proper positioning (`relative`)
- Check that refs are properly passed to components

### Mobile Responsiveness
- Test on mobile devices
- Adjust breakpoints if needed in component styles

## 📱 Mobile Considerations

All components are fully responsive, but you may want to:

1. **Navbar**: Test navigation on mobile devices
2. **Bento Grid**: Animations may be simplified on mobile for performance
3. **Contact Form**: File upload works on mobile browsers

## 🎯 Performance Tips

1. **Lazy Loading**: Consider lazy loading the bento animations
2. **Image Optimization**: Use Next.js Image component for any icons
3. **Bundle Size**: Import only the Lucide icons you use
4. **Animation Optimization**: Use `will-change` CSS property for smooth animations

## 🤝 Support

If you encounter issues:
1. Check that all dependencies are installed
2. Verify theme configuration matches exactly
3. Ensure proper HTML structure with section IDs
4. Test in both light and dark modes

---

**Package created by:** AI Auto Service Team  
**Last updated:** December 2024  
**Compatible with:** Next.js 13+, React 18+