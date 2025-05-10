# UI Components for Mazharul Islam Leon's Portfolio

This document details the specific UI components that will be implemented in the portfolio website, following the established design system.

## Navigation Components

### Main Navigation Bar
- Fixed position at top of screen
- Background: #0F172A with slight transparency (0.9 opacity)
- Backdrop filter: blur(10px) for a modern glass effect
- Container with max-width: 1200px
- Logo/name on left: "ML" monogram or "Mazharul Leon" in Inter SemiBold
- Navigation links with hover effect (slight scale + underline)
- Active link indicator: #22D3EE underline or accent
- Dark/light mode toggle on right
- Mobile: Collapses to hamburger menu at <768px
- Hover/Focus state: Text color transition to #22D3EE

### Mobile Navigation Menu
- Slide-in from right
- Background: #0F172A
- Full-height overlay
- Close button in top-right
- Stacked navigation links
- Social links at bottom
- Smooth open/close animation

### Section Navigation
- Sticky sidebar on desktop (left side)
- Current section indicator
- Small dot indicators with labels
- Active state: #6049EA dot with label visible
- Inactive state: #94A3B8 dot with label appearing on hover
- On mobile: Hidden or converted to bottom navigation

## Hero Section Components

### Hero Container
- Full viewport height (100vh) with responsive adjustment
- Background: #0F172A with subtle gradient or particle effect
- Max-width: 1200px for content
- Display: flex for layout control
- Padding: 0 24px

### Profile Image
- Circle or rounded rectangle crop
- Border: 4px solid #6049EA
- Size: 300px × 300px (desktop), scaling down for mobile
- Box-shadow for subtle lift effect
- Optional: Hover animation (slight rotation or scale)

### Hero Text Block
- Name: "Mazharul Islam Leon" in 64px Inter Bold
- Title: "Senior Software Engineer" in 32px Inter SemiBold
- Tagline in 18px Inter Regular with #94A3B8 color
- Animated typing effect for tagline or subtitle
- Staggered fade-in animation for text elements

### Hero CTA Buttons
- Primary: "View Projects" with #6049EA background
- Secondary: "Contact Me" with transparent background and #6049EA border
- Hover effects: scale(1.05) and shadow increase
- Mobile: Full-width stacked buttons

### Social Links Bar
- Horizontal layout in hero section
- Icon-only design (LinkedIn, GitHub, Twitter, Google Scholar)
- Icon size: 24px × 24px
- Color: #94A3B8 with hover color #22D3EE
- Subtle hover animation (scale or bounce)

## Card Components

### Project Card
- Width: 100% (flexible grid system)
- Aspect ratio: 16:9 for image
- Border-radius: 12px
- Background: #1E293B
- Padding: 24px
- Project image with overlay on hover
- Title: 24px Inter SemiBold
- Description: 16px Inter Regular
- Technology tags: Pill-shaped badges with #0F172A background
- CTA link: "View Project" text with arrow icon
- Hover state: 
  - transform: translateY(-8px)
  - box-shadow increase
  - Accent border or glow effect

### Experience Card
- Timeline layout with vertical line connector
- Company logo/image: 60px × 60px
- Position title: 20px Inter SemiBold
- Company name: 18px Inter Medium
- Date range: 14px Inter Regular with #94A3B8 color
- Description: 16px Inter Regular
- Technology tags: Small pill-shaped badges
- Border-left: 3px solid #6049EA or different colors per role
- Expanded state for additional details

### Skill Card
- Width: Flexible (grid-based)
- Height: Auto with consistent padding
- Background: #1E293B
- Border-radius: 8px
- Icon: 32px × 32px in #22D3EE
- Skill name: 18px Inter SemiBold
- Proficiency indicator: 
  - Linear progress bar or
  - 5-dot scale or
  - Percentage circle
- Hover state: Subtle glow or scale effect

## Form Components

### Contact Form
- Background: #1E293B
- Border-radius: 12px
- Padding: 32px
- Max-width: 600px
- Form fields with consistent styling

### Input Field
- Background: #0F172A
- Border: 1px solid #94A3B8
- Border-radius: 8px
- Padding: 12px 16px
- Label: 16px Inter Medium, positioned above input
- Text: 16px Inter Regular in #F8FAFC
- Focus state: 
  - Border: 2px solid #6049EA
  - Subtle glow effect
- Error state: 
  - Border: 2px solid #EF4444
  - Error message in 14px below input

### Submit Button
- Width: 100% or auto depending on design
- Background: #6049EA
- Color: #F8FAFC
- Border-radius: 8px
- Padding: 12px 24px
- Text: 16px Inter SemiBold
- Hover: Lighten background by 10%
- Loading state: Spinner animation
- Success/error state indicators

## Interactive Elements

### Scroll-Triggered Animations
- Fade-in and translate-up (20px) for section entries
- Staggered animation for list items
- Progressive reveal for timeline items
- Animation duration: 500-800ms
- Easing: ease-out or cubic-bezier

### Skill Visualization
- Animated progress bars that fill on scroll
- Radar/spider chart for skill categories
- Animation timing: 1000ms with staggered starts
- Easing: ease-out
- Optional: Interactive tooltips on hover

### Dark/Light Mode Toggle
- Icon-based toggle (moon/sun)
- Smooth color transition (300ms)
- Position: In navigation bar
- Size: 24px × 24px
- Animation: Rotate and morph between icons

### Back to Top Button
- Fixed position at bottom-right
- Appears after scrolling down (threshold: 500px)
- Circle shape with up arrow icon
- Background: #6049EA
- Size: 48px × 48px
- Hover: Scale(1.1) effect
- Smooth scroll behavior on click

## Section Dividers

### Wave Divider
- SVG wave pattern between sections
- Height: 80-120px depending on design
- Color: Slight variation of background (#1E293B)
- Responsive scaling
- Optional: Very subtle parallax effect

### Accent Line Divider
- Thin horizontal line with gradient
- Colors: #6049EA to #22D3EE
- Width: 80px (centered) or 100% with center accent
- Margin: 60px auto

## Miscellaneous Components

### Tooltip
- Background: #0F172A
- Border: 1px solid #94A3B8
- Border-radius: 4px
- Padding: 8px 12px
- Text: 14px Inter Regular
- Animation: Fade-in (200ms)
- Position: Above element with arrow

### Badge/Tag
- Background: #6049EA20 (alpha)
- Border-radius: 16px
- Padding: 4px 12px
- Text: 14px Inter Medium
- Color: #6049EA or #22D3EE
- Optional: Icon prefix

### Progress Indicator
- Page scroll progress bar at top of site
- Height: 3px
- Color: #6049EA to #22D3EE gradient
- Fixed position
- Width: Based on scroll percentage

### Code Snippet Display
- Background: #0F172A
- Border-radius: 8px
- Border-left: 3px solid #22D3EE
- Padding: 16px
- Font: JetBrains Mono, 15px
- Syntax highlighting with theme-appropriate colors
- Optional: Copy button
- Line numbers in #94A3B8

These UI components form a comprehensive set of building blocks for Mazharul Islam Leon's portfolio website, ensuring visual consistency while providing engaging interactive elements that highlight his professional experience and technical skills.