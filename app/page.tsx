import About from "./components/about";
import Contact from "./components/contact";
import Hero from "./components/hero";
import Projects from "./components/projects"

export default function Home() {
  return (
    <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
    </main>
  );
}
