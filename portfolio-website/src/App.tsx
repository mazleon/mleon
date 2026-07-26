import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Publications from "./components/sections/Publications";
import ResearchInterests from "./components/sections/ResearchInterests";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Blog from "./components/sections/Blog";
import MLDemo from "./components/sections/MLDemo";
import Contact from "./components/sections/Contact";
import ScrollToTop from "./components/ui/ScrollToTop";
import ParticleBackground from "./components/sections/ParticleBackground";
import ChatWidget from "./components/chatbot/ChatWidget";
import ScrollProgress from "./components/ui/ScrollProgress";
import CustomCursor from "./components/ui/CustomCursor";
import Marquee from "./components/ui/Marquee";
import BlogListPage from "./components/blog/BlogListPage";
import BlogPostPage from "./components/blog/BlogPostPage";

import SEO from "./components/common/SEO";

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        const offset = 100;
        const top =
          el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <SEO />
      <ScrollProgress />
      <CustomCursor />
      <ParticleBackground />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Publications />
      <ResearchInterests />
      <Projects />
      <Skills />
      <Blog />
      <MLDemo />
      <Contact />
      <ScrollToTop />
      <ChatWidget />
    </>
  );
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </Layout>
  );
}

export default App;