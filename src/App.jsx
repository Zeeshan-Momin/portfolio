import Header from "./Components/Header.jsx";
import Hero from "./Components/Hero.jsx";
import About from "./Components/About.jsx";
import Projects from "./Components/Projects.jsx";
import Experience from "./Components/Experience.jsx";
import Education from "./Components/Education.jsx";
import Contact from './Components/Contact.jsx';
import Footer from './Components/Footer.jsx';
import Activities from "./Components/Activities.jsx";
import Certificates from "./Components/Certificates.jsx";

export default function App() {
  return (
    <div className="bg-[#050816] text-gray-100 min-h-screen font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-6">
  <Hero />
  <About />
  <Education />
  <Activities />
  <Certificates />
  <Projects />
  <Experience />
  <Contact />
</main>

      <Footer />
    </div>
  );
}