export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg glass-strong flex items-center justify-center border border-white/15">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-sm font-medium">nexus</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8 text-sm text-white/35">
            <a href="#features" className="hover:text-white transition-colors duration-300">Features</a>
            <a href="#calculator" className="hover:text-white transition-colors duration-300">Calculator</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Nexus. For illustrative purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
