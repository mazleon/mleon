import Layout from "./components/layout/Layout";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Publications from "./components/sections/Publications";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Blog from "./components/sections/Blog";
import MLDemo from "./components/sections/MLDemo";
import Contact from "./components/sections/Contact";
import ScrollToTop from "./components/ui/ScrollToTop";
import ParticleBackground from "./components/sections/ParticleBackground";
import ChatWidget from "./components/chatbot/ChatWidget";

import SEO from "./components/common/SEO";

function App() {
  return (
    <Layout>
      <SEO />
      <ParticleBackground />
      <Hero />
      <About />
      <Experience />
      <Publications />
      <Projects />
      <Skills />
      <Blog />
      <MLDemo />
      <Contact />
      <ScrollToTop />
      <ChatWidget />
    </Layout>
  );
}

export default App;

