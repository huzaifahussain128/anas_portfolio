"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useContent } from "@/lib/ContentContext";

export default function Navbar() {
  const pathname = usePathname();
  const { content } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className={`site-nav ${scrolled ? "scrolled" : ""}`} id="siteNav">
        <div className="container">
          <Link href="/" className="brand">
            <span className="mark">AS</span>
            <span className="full">
              {content.brand.name}
              <em>MECHANICAL DESIGN</em>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive ? "active" : ""}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="nav-cta">
            <Link href="/contact" className="btn btn-ghost btn-sm">
              Hire Me
            </Link>
            <button
              className={`nav-toggle ${mobileOpen ? "open" : ""}`}
              id="navToggle"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen ? "true" : "false"}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-panel ${mobileOpen ? "open" : ""}`} id="mobilePanel">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="btn btn-primary"
          onClick={() => setMobileOpen(false)}
        >
          Hire Me
        </Link>
      </div>
    </>
  );
}
