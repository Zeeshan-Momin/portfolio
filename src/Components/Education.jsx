export default function Education() {
  const items = [
    {
      degree: "SSC",
      school: "Hazrat Mohabbat Suleman Urdu High School, Islampur",
      field: "General Education",
      date: "2020 – 2021",
      score: "88.20%",
      desc: "Completed Secondary School Certificate with a focus on maths subjects.",
    },
    {
      degree: "HSC",
      school: "Vidyamandir Junior College, Islampur",
      field: "Science Stream",
      date: "2021 – 2023",
      score: "74%",
      desc: "Gained Higher Secondary Certificate specializing in science subjects including Physics, Chemistry, and Mathematics.",
    },
    {
      degree: "Bachelor of Engineering (B.E.)",
      school: "Rajarambapu Institute of Technology, Islampur",
      field: "Computer Engineering",
      date: "2023 – Present",
      score: "CGPA: 7.82 / 10",
      desc: "Pursuing a degree in Computer Engineering with strong interests in Data Science, Algorithms, and Full-Stack Development.",
    }
  ];

  return (
    <section id="education" className="py-24 bg-gradient-to-b from-purple-900/5 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-4 mb-16 overflow-visible">
          <h2 className="text-sm uppercase tracking-widest font-bold neon-text">Education</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold neon-text leading-[1.2] pb-2 z-20">Academic Background</h3>
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
                    <h4 className="text-xl font-bold text-white mb-1">{item.degree}</h4>
                    <p className="text-cyan-300 text-sm font-medium mb-1">{item.school}</p>
                    <p className="text-purple-300 text-sm font-medium mb-3">{item.field}</p>
                    <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wide mb-3">
                      <span className="text-gray-500">{item.date}</span>
                      <span className="text-cyan-400 font-semibold">{item.score}</span>
                    </div>
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
