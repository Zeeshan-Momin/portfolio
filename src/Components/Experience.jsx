export default function Experience() {
  const items = [
   
    {
      role: "CS Student",
      company: "RIT",
      date: "2023 – Present",
      desc: "Pursuing Computer Engineering with focus on data science, DSA, and full-stack development.",
    }
  ];

  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-purple-900/5 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-4 mb-16 overflow-visible">
          <h2 className="text-sm uppercase tracking-widest font-bold neon-text">Experience</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold neon-text leading-[1.2] pb-2 z-20">My Journey</h3>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 w-1 h-full bg-gradient-to-b from-cyan-400/50 to-purple-600/20 transform md:-translate-x-1/2"></div>

          <div className="space-y-12 relative">
            {items.map((item, i) => (
              <div key={i} className={`md:flex gap-12 items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2"></div>
                
                <div className="absolute left-0 w-4 h-4 bg-cyan-400 rounded-full -translate-x-1.5 md:left-1/2 md:-translate-x-1/2 mt-6"></div>

                <div className="md:w-1/2 ml-12 md:ml-0">
                  <div className="neon-glow p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-cyan-400/50 transition-all">
                    <h4 className="text-xl font-bold text-white mb-1">{item.role}</h4>
                    <p className="text-cyan-300 text-sm font-medium mb-3">{item.company}</p>
                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-3">{item.date}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
