import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "activities", label: "Activities" },
    { id: "certificates", label: "Certificates" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
  ];

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      let current = "hero";

      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = section.id;
          }
        }
      });

      // Detect contact section separately (not part of the top nav links)
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = "contact";
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative sticky top-0 z-50 bg-white/30 dark:bg-black/40 backdrop-blur border-b border-gray-200/10 dark:border-white/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm">
            ZM
          </div>
          <div className="leading-tight">
            <strong className="text-sm block">Zeeshan Momin</strong>
            <div className="text-gray-400 text-xs">Data Engineer</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium relative">
          {sections.map((section) => (
            <li key={section.id} className="relative">
              <a
                href={`#${section.id}`}
                className={`transition hover:text-cyan-400 ${
                  activeSection === section.id ? "text-cyan-400" : ""
                }`}
              >
                {section.label}
              </a>

              {/* Active underline bar */}
              {activeSection === section.id && (
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-cyan-400 rounded-full transition-all duration-300" />
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className={`neon-btn px-6 py-2.5 rounded-full text-sm font-semibold ${
              activeSection === "contact" ? "neon-glow" : ""
            }`}
          >
            Let's Connect
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 dark:bg-black/95 border-b border-gray-200/10 dark:border-white/10 px-6 py-6 space-y-3 backdrop-blur">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setOpen(false)}
              className={`block py-2 font-medium transition ${
                activeSection === section.id
                  ? "text-cyan-400"
                  : "hover:text-cyan-400"
              }`}
            >
              {section.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={`block neon-btn px-4 py-2 rounded-full text-center mt-4 font-semibold ${
              activeSection === "contact" ? "neon-glow" : ""
            }`}
          >
            Let's Connect
          </a>
        </div>
      )}
    </header>
  );
}
