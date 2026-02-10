import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, t, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const navItems = [
    { label: t.nav.home, href: "/#hero" },
    { label: t.nav.about, href: "/#about" },
    { label: t.nav.menu, href: "/#menu" },
    { label: t.nav.gallery, href: "/#gallery" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (window.location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-['Playfair_Display'] text-2xl font-semibold tracking-wider text-primary">
          AURUM
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm uppercase tracking-[0.2em] text-foreground/70 hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={toggleLanguage}
              className="text-xs uppercase tracking-[0.2em] text-foreground/70 hover:text-primary transition-colors duration-300 px-2 py-1 border border-border/50 rounded"
            >
              {language === "cs" ? "EN" : "CZ"}
            </button>
          </li>
          <li>
            <Link
              to="/reservation"
              className="ml-4 px-6 py-2.5 border border-primary text-primary text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              {t.nav.reservation}
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-md border-t border-border"
          >
            <ul className="flex flex-col items-center gap-6 py-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm uppercase tracking-[0.2em] text-foreground/70 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={toggleLanguage}
                  className="text-xs uppercase tracking-[0.2em] text-foreground/70 hover:text-primary transition-colors px-3 py-1.5 border border-border/50 rounded"
                >
                  {language === "cs" ? "EN" : "CZ"}
                </button>
              </li>
              <li>
                <Link
                  to="/reservation"
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-2.5 border border-primary text-primary text-xs uppercase tracking-[0.2em]"
                >
                  {t.nav.reservation}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
