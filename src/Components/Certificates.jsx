import { useEffect, useState } from "react";

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCert, setActiveCert] = useState(null);

  useEffect(() => {
    const data = [
      {
        title: "Programming with Java",
        issuer: "Java · Object Oriented Programming",
        platform: "Corsera",
        duration: "8 Weeks",
        skills: ["Core Java", "OOP", "Inheritance", "Polymorphism", "Abstraction"],
        description:"Core Java programming concepts including object-oriented programming principles such as inheritance, polymorphism, abstraction, and encapsulation.",
        learnings: 
        [
          "Strong understanding of Java syntax and core libraries",
          "Applied OOP principles in real-world programming scenarios",
          "Improved problem-solving skills using Java",
          "Built structured and maintainable Java applications"
        ],
        date: "2024",
        url: "/certificates/Programming-with-java.pdf",
        type: "pdf"
      },
      {
        title: "AI-ML Virtual Internship Certification",
        issuer: "AICTE · EduSkills · Google Developers",
        platform: "AICTE Virtual Internship Program",
        duration: "10 Weeks",
        skills: ["Machine Learning", "Artificial Intelligence", "Python", "Data Analysis"],
        description:"Virtual internship focused on machine learning fundamentals, AI concepts, and real-world problem-solving using industry-standard tools.",
        learnings: 
        [
          "Understanding of supervised and unsupervised learning techniques",
          "Hands-on experience with ML models using Python",
          "Applied AI concepts to real-world datasets",
          "Improved analytical thinking and model evaluation skills"
        ],
        date: "2024",
        url: "/certificates/ai-ml-google-developers.pdf",
        type: "pdf"
      },
      {
        title: "Data Engineering Virtual Internship Certification",
        issuer: "AICTE · EduSkills · AWS Academy",
        platform: "AWS Academy",
        duration: "10 Weeks",
        skills: ["Data Engineering", "AWS", "Data Pipelines", "Cloud Fundamentals"],
        description:"Completed a structured virtual internship in Data Engineering, covering cloud fundamentals, data pipelines, and industry-grade practices using AWS Academy curriculum.",
        learnings: 
        [
          "Built and understood end-to-end data pipelines",
          "Gained hands-on exposure to AWS cloud services",
          "Learned data ingestion, transformation, and storage concepts",
          "Understood industry best practices in data engineering"
        ],
        date: "2025",
        url: "/certificates/Data-Engineering-Virtual-Internship.pdf",
        type: "pdf"
      },
      {
        title: "Fundamentals of Data Analytics",
        issuer: "Analyttica · LEAPS",
        platform: "Analyttica Learning Platform",
        duration: "6 Weeks",
        skills: ["Data Analytics", "Statistics", "Data Interpretation", "Visualization"],
        description:"Completed a comprehensive course on data analytics fundamentals, focusing on data interpretation, analytical thinking, and data-driven decision-making.",
        learnings: 
        [
          "Strong foundation in data analytics concepts",
          "Applied statistical methods for data analysis",
          "Improved ability to interpret and visualize data insights",
          "Developed analytical thinking for business decisions"
        ],
        date: "Oct 2025",
        url: "/certificates/Fundamentals-of-Data-Analytics.pdf",
        type: "pdf"
      }
    ];


    setCerts(data);
    setLoading(false);
  }, []);

  return (
    <>
      <section id="certificates" className="py-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Heading */}
          <div className="space-y-4 mb-16">
            <h2 className="text-sm uppercase tracking-widest font-bold neon-text">
              Certificates
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold neon-text leading-[1.2] pb-2">
              My Certifications
            </h3>
          </div>

          {/* States */}
          {loading ? (
            <div className="text-gray-400">Loading certificates…</div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {certs.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCert(c)}
                  className="text-left group neon-glow p-6 rounded-2xl
                             bg-gradient-to-br from-white/5 to-white/2
                             border border-white/10
                             hover:border-cyan-400/50
                             transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition">
                        {c.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {c.issuer}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {c.date}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300 line-clamp-2">
                    {c.description}
                  </p>

                  <div className="mt-4 text-cyan-400 text-sm font-medium">
                    View Certificate →
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black/80 backdrop-blur-md"
        >
          <div
            className="relative w-[90vw] max-w-5xl h-[85vh]
                       bg-gradient-to-br from-zinc-900 to-black
                       rounded-2xl shadow-2xl border border-white/10
                       animate-scaleIn"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-5 text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>

            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10">
              <h4 className="text-xl font-semibold text-white">
                {activeCert.title}
              </h4>
              <p className="text-sm text-gray-400">
                {activeCert.issuer} • {activeCert.date}
              </p>
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-2 h-[calc(85vh-72px)]">

  {/* LEFT: DETAILS */}
  <div className="p-6 overflow-y-auto space-y-5">

    <div>
      <h5 className="text-sm text-cyan-400 uppercase tracking-wide mb-2">
        Overview
      </h5>
      <p className="text-gray-300 text-sm leading-relaxed">
        {activeCert.description}
      </p>
    </div>

    {/* Meta info */}
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <span className="text-gray-400">Platform</span>
        <p className="text-white font-medium">{activeCert.platform}</p>
      </div>
      <div>
        <span className="text-gray-400">Duration</span>
        <p className="text-white font-medium">{activeCert.duration}</p>
      </div>
    </div>

    {/* Skills */}
    <div>
      <h5 className="text-sm text-cyan-400 uppercase tracking-wide mb-2">
        Skills Gained
      </h5>
      <div className="flex flex-wrap gap-2">
        {activeCert.skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs rounded-full
                       border border-cyan-400/40 text-cyan-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

    {/* Learnings */}
    <div>
      <h5 className="text-sm text-cyan-400 uppercase tracking-wide mb-2">
        Key Learnings
      </h5>
      <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
        {activeCert.learnings.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>

    {/* Actions */}
    <div className="pt-4">
      <a
        href={activeCert.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-2 rounded-full
                   bg-cyan-500/20 text-cyan-300
                   border border-cyan-400/40
                   hover:bg-cyan-500/30 transition"
      >
        Open Certificate ↗
      </a>
    </div>
  </div>

  {/* RIGHT: PREVIEW */}
  <div className="hidden md:block bg-black/40 rounded-br-2xl">
    {activeCert.type === "pdf" ? (
      <iframe
        src={activeCert.url}
        title={activeCert.title}
        className="w-full h-full rounded-br-2xl"
      />
    ) : (
      <img
        src={activeCert.url}
        alt={activeCert.title}
        className="w-full h-full object-contain rounded-br-2xl"
      />
    )}
  </div>
</div>

          </div>
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
      `}</style>
    </>
  );
}
