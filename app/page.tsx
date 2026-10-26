import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido" className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Testimonials />
        <Experience />
        <Contact />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
