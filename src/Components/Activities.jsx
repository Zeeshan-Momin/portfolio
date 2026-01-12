import React from "react";

const activities = [
  {
    role: "Class Representative",
    organization: "Computer Science Dept.",
    period: "2023 — Present",
    responsibilities: [
      "Coordinating between faculty and 70+ students",
      "Managing feedback and academic schedules",
      "Resolving student issues and concerns",
      "Being the point of contact for departmental activities"
    ]
  },
  {
    role: "Head",
    organization: "Rise and Recruit Club",
    period: "2025 — Present",
    responsibilities: [
      "I am leading Placement and Career focused activities",
      "Helping students to become industry ready",
      "Organising and managing multiple campus recruitment drives",
      "Collaborating with companies for internships and placements",
      "Mentoring juniors on resume building and interview skills"
    ]
  },
  {
    role: "President",
    organization: "Computer Science and Engineering Student Association(CSESA)",
    period: "2025 — Present",
    responsibilities: [
      "I am leading the student body representing over 350+ students",
      "Organizing technical workshops and cultural events",
      "Working with faculty to enhance student resources and facilities",
      "Organizing events for tech fest and other college activities"
    ]
  }
];

export default function Activities() {
  return (
    <section id="activities" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
    <div className="space-y-4 mb-16">
      <h2 className="text-sm uppercase tracking-widest font-bold neon-text">
        Activities
      </h2>
      <h3 className="text-4xl md:text-5xl font-extrabold neon-text leading-[1.2] pb-2 z-20">
        Roles & Responsibilities
      </h3>
    </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((a, idx) => (
            <div key={idx} className="bg-white/3 p-5 rounded-lg border border-white/6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{a.role}</h3>
                  <div className="text-xs text-gray-300">{a.organization}</div>
                </div>
                <div className="text-xs text-gray-400">{a.period}</div>
              </div>

              <ul className="list-disc ml-4 text-sm text-gray-200 space-y-1">
                {a.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
