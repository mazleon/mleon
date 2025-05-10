# Animation & Interaction Specifications

This document outlines the animations and interactive elements that will be implemented in Mazharul Islam Leon's portfolio website.

## Page Load Animations

### Initial Page Load Sequence
1. **Logo/Brand Animation**
   - Subtle fade-in and scale (200ms)
   - Timing: Immediate on load

2. **Hero Content Reveal**
   - Staggered fade-in for text elements
   - Name: Fade-in + slide up (300ms)
   - Title: Fade-in + slide up with 100ms delay
   - Tagline: Fade-in + slide up with 200ms delay
   - Buttons: Fade-in + slide up with 300ms delay
   - Timing: After logo animation completes

3. **Navigation Items**
   - Sequential fade-in from left to right
   - Each item has 50ms delay from previous
   - Duration: 250ms per item
   - Timing: Simultaneous with hero animation

4. **Background Elements**
   - Gradient or particle effect fade-in
   - Duration: 800ms
   - Easing: ease-out cubic
   - Timing: Simultaneous with other animations

### Section Load Animations (Scroll-Triggered)

For each main section as it enters viewport:

1. **Section Heading**
   - Fade-in + slide up from bottom (20px)
   - Duration: 500ms
   - Trigger: When section is 20% in viewport

2. **Section Content**
   - Staggered reveal of child elements
   - Base animation: Fade-in + translate Y (15px)
   - Delay: 75ms between elements
   - Duration: 650ms per element
   - Trigger: When parent section is 15% in viewport

3. **Section Dividers**
   - Scale/width expansion animation
   - Duration: 600ms
   - Easing: cubic-bezier(0.16, 1, 0.3, 1)
   - Trigger: When divider is 90% in viewport

## Scroll-Based Animations

### Parallax Effects
- **Background Elements**: Subtle movement at 0.1-0.3 scroll speed ratio
- **Decorative Graphics**: Movement at different rates based on visual layers
- **Hero Section Image**: Slight scale and position adjustment on scroll

### Progress Indicators
1. **Scroll Progress Bar**
   - Linear progress indicator at top of viewport
   - Fill animation synchronized with page scroll percentage
   - Color gradient animation as progress increases

2. **Section Navigation Indicators**
   - Active section dot enlarges and changes color
   - Duration: 300ms
   - Easing: ease-out

### Timeline Animation (Experience Section)
- Timeline line draws/extends as user scrolls
- Experience cards fade and slide in sequentially
- Duration: Synchronized with scroll speed
- Trigger: When timeline container enters viewport

## Hover Interactions

### Navigation Links
- **Hover State**: Text color transition to accent color
- **Duration**: 200ms
- **Additional Effect**: Subtle underline animation or scale

### Buttons
1. **Primary Buttons**
   - Scale: 1.05x
   - Box-shadow increase
   - Background color slight lightening
   - Duration: 250ms
   - Easing: ease-out

2. **Secondary Buttons**
   - Background opacity increase
   - Scale: 1.03x
   - Duration: 200ms
   - Easing: ease

### Project Cards
- **Enter Hover**: 
  - translateY(-8px) 
  - Box-shadow increase
  - Duration: 300ms
  - Easing: cubic-bezier(0.2, 0, 0, 1)

- **Project Image Overlay**:
  - Gradient overlay appears
  - Project links fade in
  - Scale: 1.03x
  - Duration: 350ms

### Skill Cards
- **Enter Hover**:
  - Subtle glow effect (box-shadow)
  - Scale: 1.02x
  - Icon color shift to accent color
  - Duration: 250ms

### Social Media Icons
- **Enter Hover**:
  - Scale: 1.2x
  - Color shift to accent color
  - Optional: Slight rotation or bounce
  - Duration: 200ms
  - Easing: spring(mass: 1, stiffness: 100, damping: 10)

## Click/Tap Interactions

### Button Press Effect
- **On Press**: 
  - Scale: 0.97x
  - Duration: 100ms
  - Easing: ease-in

- **Release**:
  - Return to normal or hover state
  - Duration: 200ms
  - Easing: ease-out

### Navigation Menu (Mobile)
- **Open Animation**:
  - Slide in from right
  - Backdrop fade-in
  - Duration: 350ms
  - Easing: cubic-bezier(0.16, 1, 0.3, 1)

- **Close Animation**:
  - Slide out to right
  - Backdrop fade-out
  - Duration: 250ms
  - Easing: ease-in-out

### Form Interactions
1. **Input Fields**:
   - **Focus**: Border color transition + subtle glow
   - **Valid**: Subtle green indicator appears
   - **Invalid**: Subtle red indicator and error message appears
   - Duration: 200ms

2. **Submit Button**:
   - **Loading State**: Spinner animation
   - **Success**: Checkmark animation + color change
   - **Error**: Shake animation + color change
   - Duration: Varies based on state

## Special Interactive Features

### Typing Animation (Hero Tagline)
- Text types out with cursor blink effect
- Speed: 50-70ms per character
- Cursor: Blinking animation (opacity 0-1)
- Timing: After initial load animations complete

### Dark/Light Mode Toggle
- Smooth color transition for all elements
- Icon morphing animation (sun to moon)
- Duration: 400ms for color transitions
- Easing: ease-in-out

### Skills Visualization
1. **Progress Bars**:
   - Fill animation from 0% to final percentage
   - Duration: 1000ms
   - Easing: cubic-bezier(0.25, 1, 0.5, 1)
   - Delay: Staggered, 100ms between items

2. **Chart Animations**:
   - Growing/drawing effect for data visualization
   - Duration: 1200ms
   - Easing: ease-out
   - Optional: Data point emphasis on hover

### Project Filters
- Smooth shuffle/transition between filtered items
- Fade-out of non-matching items
- Fade-in and position adjustment of matching items
- Duration: 500ms
- Easing: ease-in-out

## Performance Considerations

### Animation Optimization
- Use CSS transforms and opacity for smooth performance
- Implement `will-change` property selectively for complex animations
- Reduce or simplify animations on low-power devices
- Use `requestAnimationFrame` for JavaScript animations

### Responsive Adjustments
- Simplified animations for mobile devices
- Reduced motion option for accessibility
- Media query based animation complexity

### Progressive Enhancement
- Core functionality works without animations
- Animation logic separated from core functionality
- Fallbacks for browsers with limited support

## Motion Design Principles

Throughout the site, animations will follow these guiding principles:

1. **Purposeful**: Animations serve a functional purpose (guiding attention, providing feedback)
2. **Subtle**: Animations enhance rather than distract from content
3. **Consistent**: Similar elements animate in similar ways
4. **Efficient**: Animations are optimized for performance
5. **Accessible**: Animations respect user preferences including reduced motion settings

These animation and interaction specifications will create an engaging, responsive experience that highlights Mazharul Islam Leon's professional identity while maintaining a polished, sophisticated aesthetic.