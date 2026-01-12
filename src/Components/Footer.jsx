import { useState, useEffect } from 'react';

export default function Footer() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        const response = await fetch('https://api.countapi.xyz/hit/zeeshan-momin-portfolio');
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
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="neon-text font-semibold mb-2">
          © {new Date().getFullYear()} Zeeshan Momin
        </div>
        <p className="text-gray-500 text-sm">
          Crafted with creativity and code • Built with React & Tailwind CSS
        </p>
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-gray-400 text-xs">
            👀 Total Visits: <span className="text-cyan-400 font-semibold">{visitCount}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
