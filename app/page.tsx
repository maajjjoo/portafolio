import About from "@/components/About";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido" className="flex-1">
        <Hero />
        <About />
        <Skills />
      </main>
    </>
  );
}
