"use client";

import Link from "next/link";
import { useContent } from "@/lib/ContentContext";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const { content } = useContent();
  const c = content.contact;

  return (
    <main>
      {/* ============ CONTACT HERO ============ */}
      <section className="page-header">
        <div className="corner-frame">
          <span className="tl"></span>
          <span className="tr"></span>
        </div>
        <div className="sheet-index mono">SHEET&nbsp;05&nbsp;/&nbsp;CONTACT &nbsp;·&nbsp; REV&nbsp;A</div>
        <div className="container">
          <span className="eyebrow orange reveal in">Get In Touch</span>
          <h1 className="reveal in">Let&apos;s Work Together</h1>
          <p className="sub reveal in">
            Have a mechanical design project in mind? Let&apos;s turn your idea into an accurate,
            manufacturable CAD design.
          </p>
          <p className="desc reveal in">
            Whether you have a sketch, drawing, reference image, existing CAD model, or a
            completely new concept, feel free to get in touch. I can help transform your
            requirements into professional SolidWorks and mechanical design solutions.
          </p>
        </div>
      </section>

      {/* ============ CONTACT INVITATION ============ */}
      <section
        className="section"
        id="invitation"
        style={{ paddingTop: 0, paddingBottom: "56px", borderBottom: "none" }}
      >
        <div className="container">
          <div
            className="section-head center reveal in"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="eyebrow">Start Here</span>
            <h2 style={{ fontSize: "clamp(24px,3.4vw,34px)" }}>Have a Project in Mind?</h2>
            <p>
              Send me your project requirements, reference files, drawings, or initial idea.
              I&apos;ll review the details and get back to you with the next steps.
            </p>
            <p
              className="mono"
              style={{
                marginTop: "14px",
                fontSize: "12px",
                color: "var(--blue)",
                letterSpacing: "0.03em",
              }}
            >
              For SolidWorks, Sheet Metal, 3D Modeling, Mechanical Assemblies, and Engineering
              Drawing projects.
            </p>
          </div>
        </div>
      </section>

      {/* ============ GET IN TOUCH + FORM ============ */}
      <section className="section" id="contact-main" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contact-grid">
            {/* LEFT: Get In Touch */}
            <div className="contact-info-card reveal in">
              <span className="eyebrow orange">Contact Details</span>
              <h3 style={{ marginTop: "14px" }}>Get In Touch</h3>
              <p className="lead">
                Reach out directly, or fill out the project form and I&apos;ll get back to you as
                soon as possible.
              </p>

              <div className="contact-channels">
                <div className="contact-channel">
                  <div className="cc-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7 L12 13 L21 7" />
                    </svg>
                  </div>
                  <div className="cc-body">
                    <div className="k mono">Email</div>
                    <div className="v">
                      <a href={`mailto:${c.email}`}>
                        <span>{c.email}</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-channel">
                  <div className="cc-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <path d="M4 20 L5.5 15.5 A8 8 0 1 1 8.5 18.5 Z" />
                    </svg>
                  </div>
                  <div className="cc-body">
                    <div className="k mono">WhatsApp</div>
                    <div className="v">{c.whatsapp || "Available on Request"}</div>
                    <div className="note">
                      I&apos;ll share a direct WhatsApp number once we confirm project details.
                    </div>
                    <a
                      href={`mailto:${c.email}?subject=WhatsApp%20Contact%20Request`}
                      className="btn btn-ghost btn-sm"
                      style={{ marginTop: "12px" }}
                    >
                      Request WhatsApp Contact
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <div className="k mono">Follow / Connect</div>
                <div className="footer-social" style={{ marginTop: 0 }}>
                  <a
                    href={c.instagram || "#"}
                    className={c.instagram ? "" : "social-inactive"}
                    aria-label="Instagram"
                    target={c.instagram ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  <a
                    href={c.youtube || "#"}
                    className={c.youtube ? "" : "social-inactive"}
                    aria-label="YouTube"
                    target={c.youtube ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <rect x="3" y="6" width="18" height="12" rx="3" />
                      <path d="M10 9.5 L15 12 L10 14.5 Z" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  <a
                    href={c.linkedin || "#"}
                    className={c.linkedin ? "" : "social-inactive"}
                    aria-label="LinkedIn"
                    target={c.linkedin ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M7 10 V17 M7 7 V7.01 M12 17 V13 C12 11 15 11 15 13 V17" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div className="contact-form-card reveal in reveal-delay-1">
              <span className="eyebrow">Project Inquiry</span>
              <h3 style={{ marginTop: "14px" }}>Start Your Project</h3>
              <p className="lead">
                Tell me what you need designed, and let&apos;s discuss how I can help.
              </p>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT CAN I HELP YOU WITH ============ */}
      <section className="section" id="help">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow orange">Where to Start</span>
            <h2>What Can I Help You With?</h2>
          </div>

          <div className="help-grid">
            <Link href="/services#svc-modeling" className="help-card reveal in">
              <div className="help-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" />
                  <path d="M3 7 L12 12 L21 7 M12 12 V22" />
                </svg>
              </div>
              <h3>3D CAD Modeling</h3>
              <p>Accurate SolidWorks models from sketches, drawings, dimensions, or references.</p>
              <span className="help-link">
                Explore Service{" "}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>

            <Link
              href="/services#svc-sheetmetal"
              className="help-card reveal in reveal-delay-1"
            >
              <div className="help-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M4 4 H16 V10 H20 V20 H8 V14 H4 Z" />
                </svg>
              </div>
              <h3>Sheet Metal Design</h3>
              <p>
                Manufacturing-focused sheet metal components, enclosures, brackets, and flat
                patterns.
              </p>
              <span className="help-link">
                Explore Service{" "}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>

            <Link
              href="/services#svc-assembly"
              className="help-card reveal in reveal-delay-2"
            >
              <div className="help-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <circle cx="7" cy="7" r="3" />
                  <circle cx="17" cy="7" r="3" />
                  <circle cx="12" cy="18" r="3" />
                  <path d="M9 9 L11 16 M15 9 L13 16 M10 7 H14" />
                </svg>
              </div>
              <h3>Mechanical Assemblies</h3>
              <p>Organized multi-component SolidWorks assemblies and mechanical systems.</p>
              <span className="help-link">
                Explore Service{" "}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>

            <Link
              href="/services#svc-drawings"
              className="help-card reveal in reveal-delay-3"
            >
              <div className="help-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect x="3" y="3" width="18" height="18" rx="1" />
                  <path d="M7 8 H17 M7 12 H13 M7 16 H15" />
                </svg>
              </div>
              <h3>Engineering Drawings</h3>
              <p>Professional technical drawings prepared for manufacturing and fabrication.</p>
              <span className="help-link">
                Explore Service{" "}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section cta-final" id="final-cta" style={{ borderBottom: "none" }}>
        <div className="container">
          <div className="cta-final-inner reveal in">
            <span className="eyebrow orange">One Last Step</span>
            <h2>Ready to Start Your Design?</h2>
            <p>Send your requirements and let&apos;s turn your idea into a professional mechanical design.</p>
            <div className="btn-row">
              <a href="#contact-main" className="btn btn-primary">
                Send Project Inquiry
              </a>
              <Link href="/portfolio" className="btn btn-ghost">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
