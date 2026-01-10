import profile from "../assets/profile.jpg";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-7xl mx-auto w-full px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-400/30 rounded-full text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span className="text-cyan-300">Available for opportunities</span>
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight neon-text">
                Hi, I'm <span className="neon-outline block mt-2">ZEESHAN MOMIN</span>
              </h1>
              <p className="text-xl text-gray-300 font-light">Crafting intelligent data solutions and digital experiences.</p>
            </div>

            <p className="text-gray-400 text-base leading-relaxed max-w-lg">
              Computer Engineering student passionate about data science, analytics, and building smart systems. 
              I combine strong analytical thinking with foundational Java and DSA skills to turn data into actionable intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a href="#projects" className="neon-btn px-6 py-3 rounded-full font-semibold text-center transition-all">
                View my work →
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=zmeesh2012@gmail.com"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-6 py-3 border-2 border-cyan-400 rounded-full font-semibold hover:bg-cyan-500/10 transition-all text-center"
              >
                Get in touch
              </a>
              <a
                href="/Zeeshan_Momin_Resume.pdf"
                download="Zeeshan_Momin_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-btn px-6 py-3 rounded-full font-semibold text-center transition-all"
              >
                Download My Resume
              </a>

            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center items-center mt-12 md:mt-0">
            <div className="relative w-full max-w-[280px] md:max-w-[320]px -mt-18 md:-mt-15">
              {/* Outer glow layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-400 rounded-3xl blur-3xl opacity-40 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-3xl blur-2xl opacity-25"></div>
              {/* Inner gradient border */}
              <div className="relative w-full aspect-[3/4] rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-700 p-1 shadow-2xl" style={{boxShadow: "0 0 60px rgba(168, 85, 247, 0.5), 0 0 40px rgba(0, 245, 255, 0.3), 0 0 20px rgba(255, 45, 149, 0.25)"}}>
                <div className="w-full h-full rounded-3xl bg-gray-900/90 border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="text-center w-full  h-full">
                      <img src={profile} alt="Zeeshan Momin" className="w-full h-full object-cover object-center"/>   
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
