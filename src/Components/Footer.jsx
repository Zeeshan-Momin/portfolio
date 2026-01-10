export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-black/50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="neon-text font-semibold mb-2">
          © {new Date().getFullYear()} Zeeshan Momin
        </div>
        <p className="text-gray-500 text-sm">
          Crafted with creativity and code • Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
