import { useState, useEffect } from "react";

export default function Projects() {
  const projects = [
    {
      title: "Development of Nano-adsorption process for Wastewater Treatment",
      description: "This project demonstrates that wastewater treatment effectively removes contaminants and reduces undesirable components, making the water suitable for its intended use. Additionally, the treatment process helps protect environmental resources and supports sustainable water management practices.",
      tags: ["Iron Nanoparticles", "Clay powder"," Graphite powder", "Activated charcoal"],
      icon: "🧪",
      attachments: [
         { type: "pdf", name: "Report", url: "/attachments/Development of Nano-adsorption process for Wastewater Treatment.pdf" }
      ],
    },
    {
      title: "Solar Car",
      description: "This project focuses on the design and development of a hybrid solar car that operates on both photovoltaic solar energy and stored electrical power, demonstrating an efficient, sustainable transportation system while enabling performance analysis, research contributions, and participation in national-level engineering challenges.",
      tags: ["Sunlight","Solar Panel","Battery", "Motor Controller", "Motor","Wheels"],
      icon: "🚗",
      attachments: [
         { type: "pdf", name: "Presentation", url: "/attachments/Solar car.pdf" }
      ],
    },
    {
      title: "Employee Task Management System Web Development",
      description: "Built a secure full-stack application with RBAC, real-time notifications, and a task CRUD dashboard; implemented token-based admin restrictions and approval workflows to ensure controlled, transparent task management. The system enhances accountability and efficiency by streamlining task operations while maintaining strong access control and secure user interactions.",
      tags: ["Express.js", "Node.js", "MongoDB", "React", "vite", "Tailwind CSS"],
      icon: "📊",
      attachments: [
         { type: "url", name: "Live", url: "https://project1-neon-two.vercel.app/login" }
      ],
    },
    {
      title: "ER Model on Video Editing Classes",
      description: "Designed and implemented a comprehensive Entity–Relationship (ER) model for a Video Editing Classes system as part of the Database Management System course. The project models students, teachers, courses, platforms, and admission/payment workflows, including relationships, derived attributes, and extensive SQL queries for data definition, manipulation, aggregation, and joins.",
      tags: ["DBMS","ER Diagram","SQL","Relational Model","Database Design"],
      icon: "🗂️",
      attachments: [
        {type: "pdf",name: "ER Model Report",url: "/attachments/ER Model.pdf"}
      ],
    },
  ];
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAttachments, setShowAttachments] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const handleDocClick = () => setShowAttachments(null);
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
  <>
    {/* Project Details Modal */}
    {selectedProject && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        
        {/* Background blur overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        />

        {/* Modal box */}
        <div className="relative z-50 max-w-2xl w-full mx-4 p-8 rounded-2xl bg-gray-900 border border-white/10 shadow-2xl">
          
          {/* Title */}
          <h3 className="text-2xl font-extrabold neon-text mb-4">
            {selectedProject.title}
          </h3>

          {/* Full description */}
          <p className="text-gray-300 leading-relaxed mb-6 whitespace-pre-line">
            {selectedProject.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedProject.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium bg-cyan-500/10 border border-cyan-400/30 rounded-full text-cyan-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Attachments Section */}
          {selectedProject.attachments && selectedProject.attachments.length > 0 && (
            <div className="mb-6 pb-6 border-b border-white/10">
              <h4 className="text-sm font-semibold text-cyan-400 mb-3">Attachments</h4>
              <div className="flex flex-wrap gap-3">
                {selectedProject.attachments.map((attachment, idx) => (
                  <a
                    key={idx}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400/60 transition-all text-cyan-300 text-sm font-medium"
                  >
                    <span>
                      {attachment.type === "pdf" && "📄"}
                      {attachment.type === "image" && "🖼️"}
                      {attachment.type === "url" && "🔗"}
                      {attachment.type === "github" && "🔗"}
                    </span>
                    {attachment.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Close button */}
          <div className="flex justify-center">
          <button
            onClick={() => setSelectedProject(null)}
            className="neon-btn px-6 py-2 rounded-lg"
          >
            Close
          </button>
          </div>
        </div>
      </div>
    )}

    {/* Projects Section */}
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-4 mb-16">
          <h2 className="text-sm uppercase tracking-widest font-bold neon-text">
            Projects
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold neon-text">
            Featured Work
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displayedProjects.map((project, i) => (
            <div
              className="group neon-glow p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-cyan-400/50 transition-all">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">
                {project.icon}
              </div>

              <div className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition">
                {project.title}
              </div>

              <p className="text-gray-400 text-sm mb-2 leading-relaxed line-clamp-3">
                {project.description}
              </p>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedProject(project);
                }}
                className="text-cyan-400 text-sm hover:underline"
              >
                Read more
              </button>

              {/* Attachments Button */}
              {project.attachments && project.attachments.length > 0 && (
                <div className="relative inline-block ml-3">
                  <button
                    onClick={() => setShowAttachments(showAttachments === i ? null : i)}
                    className="inline-flex items-center gap-1 text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
                    title="View attachments"
                  >
                    📎 {project.attachments.length}
                  </button>

                  {/* Attachments Dropdown */}
                  {showAttachments === i && (
                     <div onClick={(e) => e.stopPropagation()} className="absolute left-0 mt-2 w-48 bg-gray-800 border border-cyan-400/30 rounded-lg shadow-lg z-40 p-2">
                      {project.attachments.map((attachment, j) => (
                        <a
                          key={j}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-cyan-300 hover:bg-cyan-500/20 rounded transition-colors"
                        >
                          <span>
                            {attachment.type === "pdf" && "📄"}
                            {attachment.type === "image" && "🖼️"}
                            {attachment.type === "url" && "🔗"}
                            {attachment.type === "github" && "🐙"}
                          </span>
                          <span className="truncate">{attachment.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {project.tags.slice(0, 2).map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs font-medium bg-cyan-500/10 border border-cyan-400/30 rounded-full text-cyan-300">
                {t}
              </span>
              ))}

              {/* +more indicator */}
              {project.tags.length > 2 && (
              <span className="px-2 py-1 text-xs font-medium text-gray-400">
                +{project.tags.length - 2} 
                more
              </span>
              )}
              </div>
            </div>
            ))}
        </div>

        {projects.length > 3 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="neon-btn px-8 py-3 rounded-full font-semibold inline-block"
            >
              {showAll ? "Show less ←" : "View all projects →"}
            </button>
          </div>
        )}
      </div>
    </section>
  </>
)
}
