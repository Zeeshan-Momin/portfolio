export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-transparent to-purple-900/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-4 mb-12">
          <h2 className="text-sm uppercase tracking-widest font-bold neon-text">About</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold neon-text">About Me</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <p className="text-gray-300 text-lg leading-relaxed md:col-span-2">
            I'm a <strong>Computer Engineering student</strong> at Rajarambapu Institute of Technology, passionate about transforming data into intelligent solutions. 
            With a solid foundation in Data Structures, OOP, and Java, I'm actively building expertise in data science and analytics to create meaningful impact.
          </p>
          <div className="neon-glow p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <p className="text-gray-400 text-sm mb-2">Currently Focused On</p>
            <p className="text-xl font-bold text-cyan-300">Data Science & Analytics</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="neon-glow p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-cyan-400/50 transition">
            <div className="text-5xl font-extrabold neon-text mb-3">3+</div>
            <div className="text-gray-300 font-medium">Years of Learning</div>
            <p className="text-gray-500 text-sm mt-2">Continuous growth in tech</p>
          </div>
          <div className="neon-glow p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-cyan-400/50 transition">
            <div className="text-5xl font-extrabold neon-text mb-3">5+</div>
            <div className="text-gray-300 font-medium">Projects Completed</div>
            <p className="text-gray-500 text-sm mt-2">From concept to deployment, data science</p>
          </div>
          <div className="neon-glow p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-cyan-400/50 transition">
            <div className="text-5xl font-extrabold neon-text mb-3">2+</div>
            <div className="text-gray-300 font-medium">Tech Domains</div>
            <p className="text-gray-500 text-sm mt-2">Full-stack to data engineering</p>
          </div>
        </div>
      </div>
    </section>
  );
}
