# Customization Guide

## 🎨 Theme Customization

### Changing Brand Colors

The components use CSS custom properties for theming. Update these in your `globals.css`:

```css
:root {
  /* Primary brand color - currently orange */
  --primary: oklch(0.62 0.14 39.15);
  
  /* For blue theme */
  --primary: oklch(0.62 0.14 240.00);
  
  /* For green theme */
  --primary: oklch(0.62 0.14 120.00);
  
  /* For purple theme */
  --primary: oklch(0.62 0.14 280.00);
}
```

### Background Colors

Adjust the background warmth/coolness:

```css
:root {
  /* Current warm beige */
  --background: oklch(0.96 0.02 85.00);
  
  /* Cool gray */
  --background: oklch(0.96 0.02 200.00);
  
  /* Pure neutral */
  --background: oklch(0.96 0.00 0.00);
  
  /* Warmer cream */
  --background: oklch(0.96 0.03 70.00);
}
```

## 🧭 Navbar Customization

### Adding Custom Logo

```tsx
import { FloatingNavBar } from '@/components/sections/floating-navbar'

const CustomLogo = () => (
  <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
)

export default function App() {
  return (
    <FloatingNavBar 
      companyName="Your Company"
      logo={<CustomLogo />}
    />
  )
}
```

### Custom Navigation Items

```tsx
const navItems = [
  { label: "Products", sectionId: "products" },
  { label: "Services", sectionId: "services" },
  { label: "Pricing", sectionId: "pricing" },
  { label: "About", sectionId: "about" },
  { label: "Contact", sectionId: "contact" }
]

<FloatingNavBar navItems={navItems} />
```

### Styling the Navbar

Override styles by targeting the navbar classes:

```css
/* Custom navbar background */
.navbar-custom {
  @apply bg-gradient-to-r from-blue-500/10 to-purple-500/10;
}

/* Custom company name styling */
.company-name-custom {
  @apply text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
}
```

## 🎛️ Bento Grid Customization

### Changing Grid Layout

Modify the layout in `FeaturesBento.tsx`:

```typescript
const PLACE: Record<BentoTile["id"], string> = {
  live_analytics: "lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-3", // Large card
  voice:          "lg:col-start-4 lg:col-end-6 lg:row-start-1 lg:row-end-2", // Medium card
  // Add your own layouts...
}
```

### Adding Custom Tiles

1. Update `lib/bento-data.ts`:

```typescript
export const TILES: BentoTile[] = [
  // Existing tiles...
  {
    id: "your_custom_tile",
    title: "Your Feature",
  }
]
```

2. Add placement in `FeaturesBento.tsx`:

```typescript
const PLACE: Record<BentoTile["id"], string> = {
  // Existing placements...
  your_custom_tile: "lg:col-start-1 lg:col-end-3 lg:row-start-4 lg:row-end-5",
}
```

3. Add custom animation:

```tsx
function YourCustomAnimation() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      {/* Your custom animation */}
    </div>
  )
}

// In TileContent component:
case "your_custom_tile":
  return <YourCustomAnimation />;
```

### Animation Colors

Update animation colors to match your brand:

```typescript
// In analytics-clean.tsx
const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))", // Uses your theme primary color
  },
}
```

## 📧 Contact Section Customization

### Contact Methods

Update the contact handlers in `contact-section.tsx`:

```typescript
const handlePhoneContact = () => {
  // Your WhatsApp business number
  const message = encodeURIComponent(`Hi! I'm interested in your services.`)
  window.open(`https://wa.me/1234567890?text=${message}`, '_blank')
}

const handleEmailContact = () => {
  const subject = encodeURIComponent('Business Inquiry')
  const body = encodeURIComponent(`Hello,\n\nI'm interested in learning more about your services.`)
  window.open(`mailto:contact@yourcompany.com?subject=${subject}&body=${body}`, '_self')
}

const handleMeetingContact = () => {
  // Your calendar booking link
  window.open('https://calendly.com/your-username', '_blank')
}
```

### Industry Options

Update the industry dropdown:

```typescript
const industries = [
  'Technology',
  'Healthcare', 
  'Finance',
  'Real Estate',
  'Education',
  'Manufacturing',
  'Other'
]
```

### Form Fields

Add or remove form fields by modifying the interface and form:

```typescript
interface ContactForm {
  name: string
  email: string
  phone?: string
  company: string
  industry?: string
  message?: string
  budget?: string // New field
  timeline?: string // New field
  uploadedFile: File | null
}
```

### Styling the Contact Form

```css
/* Custom form styling */
.contact-form-custom {
  @apply bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20;
}

/* Custom button styling */
.contact-button-custom {
  @apply bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700;
}
```

## 🎭 Animation Customization

### Speed and Timing

Adjust animation speeds:

```typescript
// In any animation component
<motion.div
  animate={{ 
    scale: [1, 1.1, 1],
    rotate: [0, 360] 
  }}
  transition={{
    duration: 2, // Slower animation
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
```

### Custom Animations

Create your own animations using Framer Motion:

```tsx
const CustomAnimation = () => {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Your content */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0] 
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="w-16 h-16 bg-primary/20 rounded-lg"
      />
    </motion.div>
  )
}
```

## 📱 Responsive Customization

### Mobile Breakpoints

Adjust responsive behavior:

```css
/* Custom breakpoints */
@media (max-width: 640px) {
  .navbar-mobile-custom {
    @apply px-4 py-2 gap-4;
  }
}

@media (max-width: 768px) {
  .bento-mobile-custom {
    @apply grid-cols-1 gap-4;
  }
}
```

### Mobile-First Animations

Reduce animations on mobile for better performance:

```tsx
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])
  
  return prefersReducedMotion
}

// In your animation component:
const reducedMotion = useReducedMotion()

<motion.div
  animate={reducedMotion ? {} : { scale: [1, 1.1, 1] }}
  transition={reducedMotion ? {} : { duration: 2 }}
>
```

## 🔧 Advanced Customization

### Custom Hooks

Create reusable logic:

```tsx
// Custom scroll hook
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = window.scrollY / totalHeight
      setProgress(currentProgress)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return progress
}
```

### Custom Context

Share state between components:

```tsx
// Theme context for advanced theming
const ThemeContext = createContext({
  accentColor: 'orange',
  setAccentColor: (color: string) => {},
})

export const useThemeContext = () => useContext(ThemeContext)
```

### Performance Optimization

```tsx
// Lazy load heavy animations
const HeavyAnimation = lazy(() => import('./HeavyAnimation'))

// Use intersection observer for scroll animations
const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false)
  const ref = useRef()
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    )
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  
  return [ref, inView]
}
```