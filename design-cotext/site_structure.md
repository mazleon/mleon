# Site Structure

Single-page application (Vite + React). All sections live on one scroll with
anchor navigation; the navbar links scroll smoothly to section `id`s.

## Page composition (top to bottom)

| # | Section | `id` | Notes |
| --- | --- | --- | --- |
| — | Scroll progress hairline | — | Fixed, 2px, accent gradient |
| — | Navbar | — | Fixed, surface blur, ML monogram, CTA pill |
| 1 | Hero | `home` | Three.js neural field, split-name reveal, impact counters, magnetic CTAs, photo, scroll cue |
| — | Capability marquee | — | Infinite ticker: Generative AI · Computer Vision · Agentic Systems · RAG · Edge Inference · MLOps · LLM Fine-Tuning · Production ML |
| 2 | About | `about` | Narrative + photo |
| 3 | Experience | `experience` | Work timeline |
| 4 | Publications | `publications` | IEEE/Springer papers |
| 5 | Research Interests | `research` | Current focus areas |
| 6 | Projects | `projects` | Filterable grid, 3D tilt cards, detail modal |
| 7 | Skills | `skills` | Tiered technical arsenal |
| 8 | Blog | `blog` | Writing highlights |
| 9 | ML Demo | `demo` | Interactive demo |
| 10 | Contact | `contact` | Form (react-hook-form + zod) + socials |
| — | Footer | — | Socials, copyright |
| — | Floating utilities | — | ScrollToTop, ChatWidget (AI assistant) |

## Global layers

- **Grain overlay** — fixed 3% noise across the page
- **Custom cursor** — dot + ring on fine-pointer devices
- **SEO** — react-helmet-async meta/OG tags

## Source map

```
portfolio-website/src/
  App.tsx                  composition order
  components/
    layout/                Navbar, Layout, Footer
    sections/              one file per section above
    three/                 NeuralField, HeroCanvas (lazy 3D layer)
    ui/                    motion primitives + shadcn/Radix components
    chatbot/               ChatWidget, ChatMessage
    common/                SEO, MotionWrapper
  data/                    portfolioContext, publicationsData
  hooks/                   useTypewriter, useScrollAnimation, useChatSession
  services/                chatbot.ts
  styles/globals.css       tokens, editorial utilities, cursor/grain rules
```

## Navigation behavior

- Anchor links with `scroll-smooth`; active section highlighted in navbar
- Mobile: hamburger → slide-in menu (<768px)
- "Let's Talk" CTA pill scrolls to Contact
- Resume button opens the PDF in a new tab
