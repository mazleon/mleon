import Layout from "./components/layout/Layout";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Blog from "./components/sections/Blog";
import Contact from "./components/sections/Contact";
import ScrollToTop from "./components/ui/ScrollToTop";
import ParticleBackground from "./components/sections/ParticleBackground";

function App() {
  return (
    <Layout>
      <ParticleBackground />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Blog />
      <Contact />
      <ScrollToTop />
    </Layout>
  );
}

export default App;
