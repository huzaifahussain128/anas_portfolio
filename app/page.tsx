"use client";

import Link from "next/link";
import { useState } from "react";
import { useContent } from "@/lib/ContentContext";
import {
  PLACEHOLDER_PROFILE,
  PLACEHOLDER_CAD,
  CATEGORY_PLACEHOLDER,
  ICONS,
  ProjectItem,
} from "@/lib/content";
import StatCard from "@/components/StatCard";
import CapabilityBar from "@/components/CapabilityBar";
import TestimonialSlider from "@/components/TestimonialSlider";
import ProjectLightbox from "@/components/ProjectLightbox";

export default function HomePage() {
  const { content } = useContent();
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const featuredProjects = content.projects
    .filter((p) => p.featured)
    .slice(0, 6);
  const displayProjects =
    featuredProjects.length > 0
      ? featuredProjects
      : content.projects.slice(0, 6);

  const capabilities = [
    { name: "SolidWorks", val: "EXPERT", width: 96 },
    { name: "Sheet Metal Design", val: "EXPERT", width: 94 },
    { name: "3D CAD Modeling", val: "EXPERT", width: 95 },
    { name: "Mechanical Assemblies", val: "ADVANCED", width: 88 },
    { name: "2D Engineering Drawings", val: "ADVANCED", width: 90 },
    { name: "AutoCAD", val: "PROFICIENT", width: 80 },
    { name: "Product Design", val: "ADVANCED", width: 85 },
    { name: "Manufacturing Design", val: "ADVANCED", width: 87 },
    { name: "Design for Manufacturing (DFM)", val: "ADVANCED", width: 86 },
    { name: "CAD Data Conversion", val: "PROFICIENT", width: 82 },
    { name: "Technical Documentation", val: "PROFICIENT", width: 83 },
  ];

  const handleNextProject = () => {
    if (!activeProject) return;
    const idx = displayProjects.findIndex((p) => p.id === activeProject.id);
    const nextIdx = (idx + 1) % displayProjects.length;
    setActiveProject(displayProjects[nextIdx]);
  };

  const handlePrevProject = () => {
    if (!activeProject) return;
    const idx = displayProjects.findIndex((p) => p.id === activeProject.id);
    const prevIdx = (idx - 1 + displayProjects.length) % displayProjects.length;
    setActiveProject(displayProjects[prevIdx]);
  };

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="section hero" id="hero">
        <div className="corner-frame">
          <span className="tl"></span>
          <span className="tr"></span>
          <span className="bl"></span>
          <span className="br"></span>
        </div>
        <div className="sheet-index mono">SHEET&nbsp;01&nbsp;/&nbsp;HOME &nbsp;·&nbsp; REV&nbsp;A</div>

        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy reveal in">
              <span className="eyebrow orange">Mechanical Design Portfolio</span>
              <h1>{content.brand.name}</h1>
              <p className="hero-role">{content.brand.title}</p>
              <p className="hero-tags mono">
                SHEET METAL <span className="sep">/</span> 3D MODELING{" "}
                <span className="sep">/</span> MECHANICAL DESIGN
              </p>

              <p className="hero-tagline">&ldquo;{content.brand.tagline}&rdquo;</p>

              <p className="hero-intro">{content.home.heroIntro}</p>

              <div className="hero-ctas">
                <Link href="/portfolio" className="btn btn-primary">
                  View My Work
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Hire Me
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="vf-badge">
                <b>2+ yrs</b>&nbsp;professional experience
              </div>
              <div className="viewport-frame">
                <div className="vf-topbar">
                  <span>VIEWPORT — ISOMETRIC</span>
                  <span className="dot-row">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>

                <img
                  className="hero-illustration in"
                  src={content.profilePhoto || PLACEHOLDER_PROFILE}
                  alt={`${content.brand.name} — mechanical designer profile photo`}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />

                <div className="vf-caption">
                  <span className="live">
                    <i></i> LIVE MODEL — PLACEHOLDER
                  </span>
                  <span>ANAS_HERO_01.SLDPRT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-cue">
          <span>SCROLL</span>
          <span className="line"></span>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="section stats" id="stats">
        <div className="container">
          <div className="stats-grid">
            <StatCard
              dimLabel="EXPERIENCE"
              label={content.home.stats[0]?.label || "Years Experience"}
              target={content.home.stats[0]?.value || 2}
              suffix={content.home.stats[0]?.suffix || "+"}
              delayClass=""
            />
            <StatCard
              dimLabel="CAD FILES"
              label={content.home.stats[1]?.label || "CAD Designs"}
              target={content.home.stats[1]?.value || 100}
              suffix={content.home.stats[1]?.suffix || "+"}
              delayClass="reveal-delay-1"
            />
            <StatCard
              dimLabel="DELIVERED"
              label={content.home.stats[2]?.label || "Projects Completed"}
              target={content.home.stats[2]?.value || 50}
              suffix={content.home.stats[2]?.suffix || "+"}
              delayClass="reveal-delay-2"
            />
            <StatCard
              dimLabel="STANDARD"
              label={content.home.stats[3]?.label || "Design Commitment"}
              target={content.home.stats[3]?.value || 100}
              suffix={content.home.stats[3]?.suffix || "%"}
              delayClass="reveal-delay-3"
            />
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="section services" id="services">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow">What I Do</span>
            <h2>Mechanical design services, from concept to fabrication-ready</h2>
            <p>
              Every engagement starts with your reference — a sketch, a rough dimension set, or
              an existing part — and ends with a clean, manufacturable SolidWorks deliverable.
            </p>
          </div>

          <div className="services-grid" id="homeServicesGrid">
            {content.services.items.map((svc, i) => (
              <div className="service-card reveal in" key={svc.id}>
                <span className="service-index mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="service-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    dangerouslySetInnerHTML={{
                      __html: ICONS[svc.icon] || ICONS.generic,
                    }}
                  />
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </div>
            ))}
          </div>

          <div className="portfolio-cta reveal in">
            <Link href="/services" className="btn btn-ghost">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FEATURED PROJECTS ============ */}
      <section className="section portfolio" id="portfolio">
        <div className="container">
          <div className="portfolio-head">
            <div className="section-head reveal in" style={{ marginBottom: 0 }}>
              <span className="eyebrow orange">Selected Work</span>
              <h2>Featured Projects</h2>
              <p>
                A selection of mechanical designs, sheet metal components, assemblies, and 3D CAD
                models.
              </p>
            </div>
          </div>

          <div className="portfolio-grid" id="homeFeaturedGrid">
            {displayProjects.map((p) => {
              const img =
                p.image || CATEGORY_PLACEHOLDER[p.category] || PLACEHOLDER_CAD;
              return (
                <div
                  className="project-card reveal in"
                  key={p.id}
                  onClick={() => setActiveProject(p)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="project-thumb">
                    <img
                      src={img}
                      alt={p.title}
                      style={{ width: "78%", height: "78%", objectFit: "contain" }}
                    />
                  </div>
                  <div className="project-overlay">
                    <span className="project-tag mono">{p.categoryLabel}</span>
                    <h3>{p.title}</h3>
                    <span className="project-view">
                      View Project{" "}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="portfolio-cta reveal in">
            <Link href="/portfolio" className="btn btn-ghost">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ============ ENGINEERING CAPABILITIES ============ */}
      <section className="section capabilities" id="capabilities">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow">Technical Range</span>
            <h2>Engineering Skills &amp; Capabilities</h2>
            <p>
              Core competencies built through hands-on SolidWorks project work and
              manufacturing-focused design thinking.
            </p>
          </div>

          <div className="capabilities-grid">
            {capabilities.map((c) => (
              <CapabilityBar
                key={c.name}
                name={c.name}
                val={c.val}
                width={c.width}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section testimonials" id="testimonials">
        <div className="container">
          <div
            className="section-head center reveal in"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="eyebrow orange">Client Feedback</span>
            <h2>What Clients Say</h2>
          </div>

          <TestimonialSlider />
        </div>
      </section>

      {/* ============ SOFTWARE & TOOLS ============ */}
      <section className="section tools" id="tools">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow">Toolset</span>
            <h2>Software &amp; Tools</h2>
          </div>

          <div className="tools-grid">
            <div className="tool-card reveal in">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" />
                <path d="M3 7 L12 12 L21 7 M12 12 V22" />
              </svg>
              <span>SOLIDWORKS</span>
            </div>
            <div className="tool-card reveal in">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M8 8 H16 V16 H8 Z" />
              </svg>
              <span>AUTOCAD</span>
            </div>
            <div className="tool-card reveal in">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12 H21 M12 3 C15 7 15 17 12 21 C9 17 9 7 12 3Z" />
              </svg>
              <span>3D CAD MODELING</span>
            </div>
            <div className="tool-card reveal in">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 4 H14 V10 H18 V20 H8 V14 H4 Z" />
              </svg>
              <span>SHEET METAL</span>
            </div>
            <div className="tool-card reveal in">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="4" y="3" width="16" height="18" rx="1" />
                <path d="M8 8 H16 M8 12 H13 M8 16 H15" />
              </svg>
              <span>ENGINEERING DRAWINGS</span>
            </div>
            <div className="tool-card reveal in">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 17 L10 11 L14 15 L20 7" />
                <path d="M14 7 H20 V13" />
              </svg>
              <span>MECHANICAL DESIGN</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLIENTS / MARQUEE ============ */}
      <section className="section clients" id="clients">
        <div className="container">
          <div
            className="section-head center reveal in"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="eyebrow">Industries</span>
            <h2>Trusted for Mechanical Design</h2>
          </div>
        </div>

        <div className="marquee-mask reveal in">
          <div className="marquee-track" id="marqueeTrack">
            <span className="marquee-item"><span className="sq"></span>Industrial Design</span>
            <span className="marquee-item"><span className="sq"></span>Manufacturing</span>
            <span className="marquee-item"><span className="sq"></span>Engineering</span>
            <span className="marquee-item"><span className="sq"></span>Fabrication</span>
            <span className="marquee-item"><span className="sq"></span>Product Development</span>
            <span className="marquee-item"><span className="sq"></span>Mechanical Systems</span>
            {/* duplicate set for seamless loop */}
            <span className="marquee-item" aria-hidden="true"><span className="sq"></span>Industrial Design</span>
            <span className="marquee-item" aria-hidden="true"><span className="sq"></span>Manufacturing</span>
            <span className="marquee-item" aria-hidden="true"><span className="sq"></span>Engineering</span>
            <span className="marquee-item" aria-hidden="true"><span className="sq"></span>Fabrication</span>
            <span className="marquee-item" aria-hidden="true"><span className="sq"></span>Product Development</span>
            <span className="marquee-item" aria-hidden="true"><span className="sq"></span>Mechanical Systems</span>
          </div>
        </div>
      </section>

      {/* ============ WHY WORK WITH ME ============ */}
      <section className="section why" id="why">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow orange">The Approach</span>
            <h2>Why Work With Me?</h2>
          </div>

          <div className="why-grid">
            <div className="why-card reveal in">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="12" cy="12" r="0.6" fill="currentColor" />
                </svg>
              </div>
              <h3>Precision</h3>
              <p>Accurate dimensions, geometry, and engineering details in every model.</p>
            </div>

            <div className="why-card reveal in reveal-delay-1">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 15 L4 6 L12 3 L20 6 L20 15 L12 21 Z" />
                  <path d="M12 3 V21 M4 6 L12 9 L20 6" />
                </svg>
              </div>
              <h3>Manufacturability</h3>
              <p>Designs developed with practical manufacturing considerations in mind.</p>
            </div>

            <div className="why-card reveal in reveal-delay-2">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M9 9 H15 V15 H9 Z" />
                </svg>
              </div>
              <h3>Professional CAD</h3>
              <p>Clean, organized SolidWorks models and assemblies, built to last.</p>
            </div>

            <div className="why-card reveal in reveal-delay-3">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 6 H20 M4 12 H20 M4 18 H14" />
                </svg>
              </div>
              <h3>Reliable Communication</h3>
              <p>Clear communication and close attention to project requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section cta-final" id="contact">
        <div className="container">
          <div className="cta-final-inner reveal in">
            <span className="eyebrow orange">Let&apos;s Build Something</span>
            <h2>Have a Mechanical Design in Mind?</h2>
            <p>Let&apos;s turn your idea, sketch, or concept into a professional 3D CAD design.</p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn-primary">
                Start a Project
              </Link>
              <Link href="/portfolio" className="btn btn-ghost">
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <ProjectLightbox
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
      />
    </main>
  );
}
