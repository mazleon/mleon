# Design System for Mazharul Islam Leon's Portfolio

This design system outlines the visual and interactive elements that will create a cohesive, professional, and engaging portfolio website.

## Typography

### Font Families

- **Primary Font (Headings)**: Inter
  - Font weights: 700 (Bold), 600 (Semibold)
  - Used for all headings, navigation, and prominent text

- **Secondary Font (Body)**: Inter
  - Font weights: 400 (Regular), 500 (Medium)
  - Used for body text, descriptions, and general content

- **Monospace Font (Code)**: JetBrains Mono
  - Font weights: 400 (Regular)
  - Used for code snippets and technical content

### Typography Scale

- H1 (Hero heading): 4rem (64px) / line-height: 1.1
- H2 (Section headings): 2.5rem (40px) / line-height: 1.2
- H3 (Subsection headings): 1.75rem (28px) / line-height: 1.3
- H4 (Card headings): 1.25rem (20px) / line-height: 1.4
- Body: 1rem (16px) / line-height: 1.5
- Small/Caption: 0.875rem (14px) / line-height: 1.5
- Code: 0.9375rem (15px) / line-height: 1.6

## Color System

### Primary Colors

- **Primary Background**: #0F172A (Deep navy blue)
- **Secondary Background**: #1E293B (Slightly lighter navy)
- **Primary Text**: #F8FAFC (Off-white)
- **Secondary Text**: #94A3B8 (Light slate gray)
- **Primary Accent**: #6049EA (Vibrant purple)
- **Secondary Accent**: #22D3EE (Bright cyan)

### Functional Colors

- **Success**: #10B981 (Green)
- **Error**: #EF4444 (Red)
- **Warning**: #F59E0B (Amber)
- **Info**: #3B82F6 (Blue)

### Light Mode Colors (Optional)

- **Primary Background**: #F8FAFC (Off-white)
- **Secondary Background**: #E2E8F0 (Light gray)
- **Primary Text**: #0F172A (Deep navy blue)
- **Secondary Text**: #334155 (Dark slate gray)
- **Primary Accent**: #6049EA (Vibrant purple)
- **Secondary Accent**: #0891B2 (Darker cyan)

## Spacing System

Using an 8-point grid system for consistency:

- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)
- **4xl**: 6rem (96px)

## UI Components

### Buttons

1. **Primary Button**
   - Background: #6049EA (Vibrant purple)
   - Text: #F8FAFC (Off-white)
   - Hover: Lighten background by 10%
   - Border-radius: 8px
   - Padding: 12px 24px

2. **Secondary Button**
   - Background: transparent
   - Text: #6049EA (Vibrant purple)
   - Border: 1px solid #6049EA
   - Hover: Background #6049EA20 (10% opacity)
   - Border-radius: 8px
   - Padding: 12px 24px

3. **Text Button**
   - Background: transparent
   - Text: #22D3EE (Bright cyan)
   - Hover: Underline
   - Padding: 8px 16px

### Cards

1. **Project Card**
   - Background: #1E293B (Slightly lighter navy)
   - Border-radius: 12px
   - Padding: 24px
   - Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
   - Hover: Transform scale(1.02), shadow increase

2. **Experience Card**
   - Background: #1E293B (Slightly lighter navy)
   - Border-left: 3px solid #6049EA (Vibrant purple)
   - Border-radius: 8px
   - Padding: 20px
   - Margin: 16px 0

3. **Skill Card**
   - Background: #1E293B (Slightly lighter navy)
   - Border-radius: 8px
   - Padding: 16px
   - Icon: #22D3EE (Bright cyan)

### Form Elements

1. **Input Fields**
   - Background: #1E293B (Slightly lighter navy)
   - Border: 1px solid #94A3B8 (Light slate gray)
   - Border-radius: 8px
   - Text: #F8FAFC (Off-white)
   - Focus: Border 2px solid #6049EA (Vibrant purple)
   - Padding: 12px 16px

2. **Checkbox/Radio**
   - Unchecked: #1E293B background, #94A3B8 border
   - Checked: #6049EA (Vibrant purple)
   - Size: 18px × 18px

3. **Select Dropdown**
   - Similar styling to input fields
   - Dropdown background: #1E293B
   - Selected item: #6049EA15 (with left border accent)

## Icons

- **Style**: Line icons with occasional filled variants
- **Size**: 
  - Navigation: 24px × 24px
  - Feature icons: 32px × 32px
  - Social media: 20px × 20px
- **Color**: Primarily #94A3B8 (Light slate gray) with #22D3EE (Bright cyan) for emphasis

## Images & Media

- **Profile Photo**: Professional headshot, circular crop
- **Project Screenshots**: 16:9 aspect ratio, consistent border radius (12px)
- **Background Elements**: Subtle tech-themed patterns or gradients
- **Illustrations**: Clean, modern tech illustrations in purple and cyan

## Animations & Transitions

- **Page Transitions**: Subtle fade transitions between pages (300ms)
- **Scroll Animations**: Elements fade in and slight translation from bottom (500ms)
- **Hover Effects**: Smooth scale/color transitions (200ms)
- **Button Clicks**: Subtle scale down effect (100ms)
- **Loading States**: Pulse animations in accent colors

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## Navigation

- **Desktop**: Horizontal navigation bar, fixed position
- **Mobile**: Hamburger menu with slide-in drawer
- **Active State**: Underline with #22D3EE (Bright cyan)
- **Scroll Indicator**: Subtle progress bar at top

## Layout Guidelines

- **Container Max-Width**: 1200px
- **Section Spacing**: 80px (desktop), 60px (tablet), 40px (mobile)
- **Content Width**: 65ch maximum for optimal readability
- **Grid System**: 12-column grid for desktop layouts

## Accessibility Considerations

- All interactive elements have visible focus states
- Color contrast ratios meet WCAG 2.1 AA standards
- Semantic HTML structure
- Proper ARIA attributes where needed
- Keyboard navigation support

This design system provides a comprehensive foundation for building a cohesive, professional portfolio website for Mazharul Islam Leon. By following these guidelines, we'll ensure a consistent visual language that effectively communicates his skills and experience as a Senior Software Engineer with machine learning expertise.