"use client";

import Link from "next/link";
import { useContent } from "@/lib/ContentContext";

export default function Footer() {
  const { content } = useContent();
  const c = content.contact;
  const whatsappUrl = c.whatsapp
    ? `https://wa.me/${c.whatsapp.replace(/[^\d+]/g, "").replace(/^\+/, "")}`
    : "#";

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <span className="mark">AS</span>
              <span className="full">
                {content.brand.name}
                <em>MECHANICAL DESIGN</em>
              </span>
            </Link>
            <p>
              Mechanical designer specializing in SolidWorks, sheet metal design, 3D modeling,
              assemblies, and engineering drawings.
            </p>
            <div className="footer-social">
              <a
                href={`mailto:${c.email}`}
                data-contact="email-href"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7 L12 13 L21 7" />
                </svg>
              </a>
              <a
                href={whatsappUrl}
                aria-label="WhatsApp"
                className={c.whatsapp ? "" : "social-inactive"}
                target={c.whatsapp ? "_blank" : undefined}
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 20 L5.5 15.5 A8 8 0 1 1 8.5 18.5 Z" />
                  <path
                    d="M9 9.5 C9 12 12 15 14.5 15 C15.5 15 16 13.8 15.6 13.4 C15 12.8 13.8 12.2 13.3 12.6 C13.1 12.8 13 13 12.8 13 C12.3 13 11 12 10 10.5 C10 10.3 10.2 10.2 10.4 10 C10.8 9.5 10.2 8.3 9.6 7.7 C9.2 7.3 9 8 9 9.5Z"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a
                href={c.linkedin || "#"}
                aria-label="LinkedIn"
                className={c.linkedin ? "" : "social-inactive"}
                target={c.linkedin ? "_blank" : undefined}
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M7 10 V17 M7 7 V7.01 M12 17 V13 C12 11 15 11 15 13 V17" />
                </svg>
              </a>
              <a
                href={c.instagram || "#"}
                aria-label="Instagram"
                className={c.instagram ? "" : "social-inactive"}
                target={c.instagram ? "_blank" : undefined}
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={c.youtube || "#"}
                aria-label="YouTube"
                className={c.youtube ? "" : "social-inactive"}
                target={c.youtube ? "_blank" : undefined}
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="6" width="18" height="12" rx="3" />
                  <path d="M10 9.5 L15 12 L10 14.5 Z" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/portfolio">Portfolio</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>
                <Link href="/services#svc-modeling">SolidWorks 3D Modeling</Link>
              </li>
              <li>
                <Link href="/services#svc-sheetmetal">Sheet Metal Design</Link>
              </li>
              <li>
                <Link href="/services#svc-assembly">Mechanical Assemblies</Link>
              </li>
              <li>
                <Link href="/services#svc-drawings">Engineering Drawings</Link>
              </li>
              <li>
                <Link href="/services#svc-product">Product Design</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col contact">
            <h4>Contact</h4>
            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7 L12 13 L21 7" />
                </svg>
                <span>{c.email}</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 20 L5.5 15.5 A8 8 0 1 1 8.5 18.5 Z" />
                </svg>
                WhatsApp — <span>{c.whatsapp || "Available on Request"}</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
                LinkedIn — {c.linkedin ? <a href={c.linkedin} target="_blank" rel="noreferrer">Connected</a> : "add link"}
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="12" cy="12" r="9" />
                </svg>
                Instagram · YouTube — add link
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Anas. All Rights Reserved.</span>
          <span className="made mono">BUILT LIKE A DRAWING SHEET — REV A</span>
        </div>
      </div>
    </footer>
  );
}
