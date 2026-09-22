import About from "@/app/(site)/components/about";
import Contact from "@/app/(site)/components/contact";
import Hero from "@/app/(site)/components/hero";
import Projects from "@/app/(site)/components/projects"

export default function Home() {
  return (
    <main className="overflow-hidden">
        <Hero />
        <About />
        <Projects />
        <Contact />
    </main>
  );
}
