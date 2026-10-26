import About from "@/components/About";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
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
        <About />
        <Projects />
        <Testimonials />
        <Experience />
        <Skills />
      </main>
    </>
  );
}
