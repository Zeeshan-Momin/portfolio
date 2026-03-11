import { useState, useEffect } from 'react';

export default function Footer() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        const response = await fetch('/api/visits');
        const data = await response.json();
        setVisitCount(data.value);
      } catch (error) {
        console.error('Error fetching visit count:', error);
      }
    };

    fetchVisitCount();
  }, []);

  return (
    <footer className="py-8 border-t border-white/10 bg-black/50">
      <div className="max-w-7xl mx-auto px-6 text-center animate-fade-up">
        <div className="neon-text font-semibold mb-2">
          © {new Date().getFullYear()} Zeeshan Momin
        </div>
        <p className="text-gray-500 text-sm animate-fade-up stagger-1">
          Crafted with creativity and code • Built with React & Tailwind CSS
        </p>
        <div className="mt-4 pt-4 border-t border-white/10 animate-fade-up stagger-2">
          <p className="text-gray-400 text-xs">
            👀 Unique Visitors: <span className="text-cyan-400 font-semibold animate-pulse-glow">{visitCount}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
