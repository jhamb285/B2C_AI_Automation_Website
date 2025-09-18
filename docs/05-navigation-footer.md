# Navigation & Footer Content & Functionality

## Navigation Component

### Brand/Logo
- **Icon combination**: Bot (main) + Zap (small overlay)
- **Brand name**: "AutoFlow AI"
- **Logo styling**: Bot icon (h-8 w-8) with small Zap icon positioned absolutely

### Navigation Menu Items
1. **Home** → `#home`
2. **Solutions** → `#solutions`
3. **Industries** → `#industries`
4. **Features** → `#features`
5. **Calculator** → `#calculator`
6. **Performance** → `#comparison`
7. **Analytics** → `#analytics`
8. **Pricing** → `#pricing`
9. **About** → `#about`

### Navigation Actions
- **Theme Toggle**: Light/dark mode switcher
- **Primary CTA**: "Schedule Call" button

### Navigation Functionality
- **Scroll behavior**: Navigation bar becomes more compact when scrolled (`py-4` to `py-2`)
- **Backdrop blur**: `backdrop-blur-lg` with `bg-background/80`
- **Responsive design**: Desktop horizontal menu, mobile hamburger with sheet overlay
- **Smooth scrolling**: Links navigate to anchor sections
- **Animation effects**: Scale hover effects on logo and menu items

### Mobile Navigation
- **Sheet component**: Right-side slide-out menu
- **Staggered animations**: Menu items appear with delays (`index * 0.1`)
- **Auto-close**: Menu closes when link is clicked
- **Full-width CTA**: Schedule Call button spans full width

## Footer Component

### Newsletter Section
- **Header**: "Stay Updated with AutoFlow AI"
- **Description**: "Get the latest automation insights, industry trends, and product updates delivered to your inbox."
- **Email input**: Placeholder "Enter your email"
- **CTA button**: "Subscribe" with ArrowRight icon
- **Trust indicator**: Badge with "No spam, unsubscribe anytime"

### Company Information
- **Logo**: Same Bot + Zap icon combination
- **Brand name**: "AutoFlow AI"
- **Description**: "Intelligent automation for home service businesses. We help you capture more leads, serve customers better, and grow your operations with AI that works alongside your existing systems."

### Contact Information
1. **Sales Phone**:
   - Icon: Phone
   - Label: "Sales"
   - Value: "+1 (555) 123-4567"
   - Link: `tel:+15551234567`

2. **Support Email**:
   - Icon: Mail
   - Label: "Support"
   - Value: "support@autoflow.ai"
   - Link: `mailto:support@autoflow.ai`

3. **Location**:
   - Icon: MapPin
   - Label: "Headquarters"
   - Value: "San Francisco, CA"

### Social Media Links
- **LinkedIn**: Icon with hover effects
- **Twitter**: Icon with hover effects
- **Facebook**: Icon with hover effects
- **Styling**: Ghost buttons with scale hover effects (1.1x)

### Footer Link Categories

#### Solutions
- AI Call Answering → `#solutions`
- Workflow Automation → `#solutions`
- Lead Processing → `#solutions`
- Communication Hub → `#solutions`

#### Industries
- HVAC Services → `#industries`
- Electrical Contractors → `#industries`
- Plumbing Services → `#industries`
- General Contractors → `#industries`
- Landscaping → `#industries`
- Home Services → `#industries`

#### Company
- About Us → `#about`
- Our Team → `#about`
- Careers → `#`
- Press → `#`
- Blog → `#`

#### Support
- Help Center → `#`
- Documentation → `#`
- API Reference → `#`
- System Status → `#`
- Contact Support → `#`

### Legal Links (Bottom Bar)
- **Copyright**: "© 2024 AutoFlow AI. All rights reserved."
- **Privacy Policy** → `#`
- **Terms of Service** → `#`
- **Cookie Policy** → `#`

## Functionality

### Navigation Behavior
- **Fixed positioning**: `fixed top-0 left-0 right-0 z-50`
- **Scroll detection**: Changes padding based on scroll position
- **Smooth scrolling**: CSS `scroll-behavior: smooth`
- **Mobile optimization**: Hamburger menu with slide-out sheet

### Footer Interactions
- **Newsletter form**: Email input with subscription button
- **Link hover effects**: Horizontal slide animation (`x: 5`)
- **Contact link functionality**: Proper tel: and mailto: links
- **Social media integration**: External links with proper aria-labels

### Animation Details
- **Navigation entrance**: Slides down from top (`y: -100` to `y: 0`)
- **Footer reveals**: Staggered animations for sections
- **Hover effects**: Scale, slide, and color transitions
- **Mobile menu**: Staggered item appearances

### Responsive Design
- **Navigation**: Horizontal desktop, vertical mobile sheet
- **Footer grid**: 6-column desktop, stacked mobile
- **Contact layout**: Flexible spacing and sizing
- **Link organization**: Grouped into logical categories

## Content Strategy

### Navigation Strategy
- **Progressive disclosure**: Essential pages in main nav
- **Clear hierarchy**: Solutions → Industries → Features flow
- **Action-oriented**: CTA prominently placed
- **User journey**: Guides from awareness to action

### Footer Strategy
- **Comprehensive links**: All major site sections covered
- **Contact accessibility**: Multiple contact methods
- **Trust building**: Company information and location
- **Content marketing**: Newsletter signup for lead capture

### SEO Considerations
- **Anchor navigation**: All sections linked for internal SEO
- **Structured hierarchy**: Logical page organization
- **Contact schema**: Proper contact information markup
- **Social signals**: Social media presence indicators

### Brand Consistency
- **Logo treatment**: Consistent across nav and footer
- **Color usage**: Primary and accent colors for CTAs
- **Typography**: Consistent font weights and sizes
- **Icon system**: Lucide React icons throughout

### Technical Implementation
- **shadcn/ui components**: Sheet, Button, Input, Card, Badge
- **Framer Motion**: Smooth animations and transitions
- **Responsive utilities**: Mobile-first breakpoint system
- **Theme integration**: Dark/light mode support
- **Accessibility**: Proper ARIA labels and semantic HTML