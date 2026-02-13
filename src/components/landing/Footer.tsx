export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">investingwontmakeyourich</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8 text-sm text-white/40">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#calculator" className="hover:text-white transition-colors">Calculator</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} investingwontmakeyourich. For illustrative purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}