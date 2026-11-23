"use client";

import Link from "next/link";
import { useContent } from "@/lib/ContentContext";
import { PLACEHOLDER_PROFILE } from "@/lib/content";
import StatCard from "@/components/StatCard";
import CapabilityBar from "@/components/CapabilityBar";

export default function AboutPage() {
  const { content } = useContent();

  const coreSkills = [
    { name: "SolidWorks 3D Modeling", val: "90%", width: 90 },
    { name: "Sheet Metal Design", val: "88%", width: 88 },
    { name: "Mechanical Assemblies", val: "85%", width: 85 },
    { name: "Engineering Drawings", val: "85%", width: 85 },
    { name: "AutoCAD", val: "80%", width: 80 },
    { name: "Product & Mechanical Design", val: "85%", width: 85 },
    { name: "Design for Manufacturing (DFM)", val: "80%", width: 80 },
    { name: "CAD Conversion & Reconstruction", val: "85%", width: 85 },
  ];

  const timelineItems = [
    {
      date: "2024 — Started Learning Mechanical CAD",
      title: "Started Learning Mechanical CAD",
      lead: "Started developing my skills in SolidWorks and mechanical 3D modeling.",
      tags: [
        "SolidWorks Fundamentals",
        "Part Modeling",
        "Sketching",
        "Basic Assemblies",
        "Engineering Design Concepts",
      ],
      delay: "",
    },
    {
      date: "2024–2025 — First Professional Projects",
      title: "First Professional Projects",
      lead: "Started working on real mechanical design projects and applying CAD skills to practical engineering requirements.",
      tags: [
        "3D Mechanical Modeling",
        "Sheet Metal Components",
        "Design Revisions",
        "Client Requirements",
        "Manufacturing Considerations",
      ],
      delay: "reveal-delay-1",
    },
    {
      date: "2025 — Expanded into Sheet Metal Design",
      title: "Expanded into Sheet Metal Design",
      lead: "Developed stronger expertise in Sheet Metal Design and fabrication-oriented CAD modeling.",
      tags: [
        "Sheet Metal Parts",
        "Bends & Flanges",
        "Flat Patterns",
        "Enclosures",
        "Brackets",
        "Fabrication Requirements",
      ],
      delay: "reveal-delay-2",
    },
    {
      date: "2025–2026 — Advanced Mechanical Design",
      title: "Advanced Mechanical Design",
      lead: "Expanded my capabilities into assemblies, engineering drawings, and complete mechanical design workflows.",
      tags: [
        "Complex SolidWorks Assemblies",
        "Mechanical Components",
        "Mates & Assembly Relationships",
        "Engineering Drawings",
        "Manufacturing Documentation",
      ],
      delay: "reveal-delay-3",
    },
    {
      date: "2026 — Building a Professional CAD Portfolio",
      title: "Building a Professional CAD Portfolio",
      lead: "Continuing to develop professional mechanical design expertise through real-world projects and advanced CAD work.",
      tags: [
        "SolidWorks",
        "Sheet Metal",
        "3D CAD",
        "Mechanical Assemblies",
        "Engineering Drawings",
        "Product Design",
      ],
      delay: "reveal-delay-4",
    },
  ];

  return (
    <main>
      {/* ============ ABOUT HERO ============ */}
      <section
        className="section hero"
        id="about-hero"
        style={{ minHeight: "auto", padding: "172px 0 100px" }}
      >
        <div className="corner-frame">
          <span className="tl"></span>
          <span className="tr"></span>
          <span className="bl"></span>
          <span className="br"></span>
        </div>
        <div className="sheet-index mono">SHEET&nbsp;03&nbsp;/&nbsp;ABOUT &nbsp;·&nbsp; REV&nbsp;A</div>

        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy reveal in">
              <span className="eyebrow orange">About Me</span>
              <h1 style={{ fontSize: "clamp(42px,6vw,64px)" }}>About Me</h1>
              <p className="hero-tagline">
                Mechanical Design Driven by Precision, Functionality, and Manufacturability.
              </p>
              <p className="hero-intro">{content.about.heroIntro}</p>
              <div className="hero-ctas">
                <Link href="/contact" className="btn btn-primary">
                  Start a Project
                </Link>
                <Link href="/portfolio" className="btn btn-ghost">
                  View My Portfolio
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="vf-badge">
                <b>2+ yrs</b>&nbsp;professional experience
              </div>
              <div className="viewport-frame">
                <div className="vf-topbar">
                  <span>VIEWPORT — PROFILE</span>
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
                  <span>ANAS_PROFILE_01.SLDDRW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MY STORY ============ */}
      <section className="section" id="story">
        <div className="container">
          <div className="story-grid">
            <div className="story-copy reveal in">
              <span className="eyebrow">My Journey</span>
              <h2 style={{ marginTop: "14px", fontSize: "clamp(28px,4vw,40px)" }}>
                My Journey in Mechanical Design
              </h2>

              {content.about.story.map((para, i) => (
                <p key={i} style={{ marginTop: i > 0 ? "14px" : "18px" }}>
                  {para}
                </p>
              ))}

              <p className="closing" style={{ marginTop: "20px" }}>
                {content.about.storyClosing}
              </p>
            </div>

            <div className="story-visual reveal in reveal-delay-1">
              <div className="viewport-frame">
                <div className="vf-topbar">
                  <span>SECTION VIEW — A-A</span>
                  <span className="dot-row">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
                <svg
                  className="story-illustration"
                  viewBox="0 0 480 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Technical illustration of an exploded mechanical bracket assembly"
                >
                  <g stroke="#3ea8ff" strokeWidth="1.3" fill="none">
                    <path d="M120 260 L120 190 L180 160 L280 160 L280 230 L220 260 Z" />
                    <path d="M120 190 L220 190 L280 160" strokeDasharray="3 3" />
                    <path d="M220 190 L220 260" strokeDasharray="3 3" />
                  </g>
                  <g stroke="#ff7a29" strokeWidth="1.2" fill="none">
                    <circle cx="150" cy="220" r="9" />
                    <circle cx="250" cy="190" r="9" />
                    <path d="M150 155 L150 190" strokeDasharray="2 3" />
                    <path d="M250 130 L250 190" strokeDasharray="2 3" />
                  </g>
                  <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#5c6670">
                    <text x="290" y="200">
                      ⌀18.00
                    </text>
                    <text x="130" y="290">
                      120.00
                    </text>
                    <path d="M120 275 L220 275" stroke="#2a3038" strokeWidth="1" />
                  </g>
                  <g stroke="#5c6670" strokeWidth="1" opacity="0.6">
                    <path d="M60 320 H420 M60 320 V60" />
                    <path d="M55 60 L60 50 L65 60" fill="#5c6670" stroke="none" />
                    <path d="M410 315 L420 320 L410 325" fill="#5c6670" stroke="none" />
                  </g>
                </svg>
                <div className="vf-caption">
                  <span className="live">
                    <i></i> DESIGN PHILOSOPHY
                  </span>
                  <span>BRACKET_SECTION.SLDPRT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ENGINEERING JOURNEY TIMELINE ============ */}
      <section className="section" id="timeline-section">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow orange">Milestones</span>
            <h2>My Engineering Journey</h2>
            <p>How my mechanical design skills and professional experience have developed over time.</p>
          </div>

          <div className="timeline">
            {timelineItems.map((item, idx) => (
              <div className={`timeline-item reveal in ${item.delay}`} key={idx}>
                <span className="timeline-node"></span>
                <span className="timeline-date mono">{item.date}</span>
                <div className="timeline-card">
                  <h3>{item.title}</h3>
                  <p className="lead">{item.lead}</p>
                  <div className="timeline-focus">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT MAKES MY WORK DIFFERENT ============ */}
      <section className="section why" id="different">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow">Design Philosophy</span>
            <h2>What Makes My Work Different?</h2>
            <p>I do not simply create 3D models. I focus on creating designs that make engineering sense.</p>
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
              <p>I pay close attention to dimensions, geometry, tolerances, and design details.</p>
            </div>
            <div className="why-card reveal in reveal-delay-1">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 15 L4 6 L12 3 L20 6 L20 15 L12 21 Z" />
                  <path d="M12 3 V21 M4 6 L12 9 L20 6" />
                </svg>
              </div>
              <h3>Manufacturability</h3>
              <p>I consider how components can actually be fabricated, machined, bent, assembled, and produced.</p>
            </div>
            <div className="why-card reveal in reveal-delay-2">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 6 H20 M4 12 H20 M4 18 H14" />
                </svg>
              </div>
              <h3>Practical Engineering</h3>
              <p>My designs focus on function, usability, and real-world engineering requirements rather than appearance alone.</p>
            </div>
            <div className="why-card reveal in reveal-delay-3">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M9 9 H15 V15 H9 Z" />
                </svg>
              </div>
              <h3>Clean CAD Structure</h3>
              <p>I create organized SolidWorks parts, assemblies, and drawings that are easier to understand, modify, and use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ AWARDS & ACHIEVEMENTS ============ */}
      <section className="section" id="awards">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow">Recognition</span>
            <h2>Awards &amp; Achievements</h2>
            <p>Certifications, recognitions, and notable milestones — managed from the Admin Panel.</p>
          </div>

          <div className="awards-grid" id="awardsGrid">
            {content.awards && content.awards.length > 0 ? (
              content.awards.map((award) => (
                <div className="award-card reveal in" key={award.id}>
                  <div className="award-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <circle cx="12" cy="8" r="5" />
                      <path d="M8.5 12.5 L7 21 L12 18.5 L17 21 L15.5 12.5" />
                    </svg>
                  </div>
                  <div className="award-body">
                    <span className="award-year mono">{award.year}</span>
                    <h3>{award.title}</h3>
                    <p className="award-issuer">{award.issuer}</p>
                    <p className="award-desc">{award.desc}</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                No awards added yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ============ CORE SKILLS ============ */}
      <section className="section capabilities" id="skills">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow orange">Capabilities</span>
            <h2>Core Engineering Skills</h2>
            <p>Tools and capabilities I use to transform concepts into professional mechanical designs.</p>
          </div>

          <div className="capabilities-grid">
            {coreSkills.map((s) => (
              <CapabilityBar key={s.name} name={s.name} val={s.val} width={s.width} />
            ))}
          </div>
          <p className="mono" style={{ marginTop: "28px", fontSize: "11.5px", color: "var(--text-faint)" }}>
            Percentages reflect current skill confidence, not formal certification.
          </p>
        </div>
      </section>

      {/* ============ TOOLS I WORK WITH ============ */}
      <section className="section tools" id="about-tools">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow">Toolset</span>
            <h2>Tools I Work With</h2>
          </div>

          <div className="tools-grid">
            <div className="tool-card reveal in">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" />
                <path d="M3 7 L12 12 L21 7 M12 12 V22" />
              </svg>
              <span>SOLIDWORKS</span>
            </div>
            <div className="tool-card reveal in">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M8 8 H16 V16 H8 Z" />
              </svg>
              <span>AUTOCAD</span>
            </div>
            <div className="tool-card reveal in">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12 H21 M12 3 C15 7 15 17 12 21 C9 17 9 7 12 3Z" />
              </svg>
              <span>3D CAD MODELING</span>
            </div>
            <div className="tool-card reveal in">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4 H14 V10 H18 V20 H8 V14 H4 Z" />
              </svg>
              <span>SHEET METAL</span>
            </div>
            <div className="tool-card reveal in">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="7" cy="7" r="3" />
                <circle cx="17" cy="7" r="3" />
                <circle cx="12" cy="18" r="3" />
                <path d="M9 9 L11 16 M15 9 L13 16 M10 7 H14" />
              </svg>
              <span>MECHANICAL ASSEMBLIES</span>
            </div>
            <div className="tool-card reveal in">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="3" width="16" height="18" rx="1" />
                <path d="M8 8 H16 M8 12 H13 M8 16 H15" />
              </svg>
              <span>ENGINEERING DRAWINGS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DESIGN PHILOSOPHY ============ */}
      <section className="section philosophy" id="philosophy">
        <div className="container">
          <div className="quote-mark reveal in">&ldquo;</div>
          <blockquote className="reveal in">
            A good CAD model should not only look correct — it should work correctly and be practical to manufacture.
          </blockquote>
          <p className="p-sub reveal in reveal-delay-1">
            I believe effective mechanical design requires more than accurate geometry. A successful design should consider material, manufacturing processes, assembly requirements, functionality, dimensions, and the final application. This approach helps me create CAD models that are not only technically detailed but also practical for real-world use.
          </p>
        </div>
      </section>

      {/* ============ MY DESIGN PROCESS ============ */}
      <section className="section" id="process">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow orange">Workflow</span>
            <h2>My Design Process</h2>
            <p>A consistent five-stage approach I follow on every mechanical design project.</p>
          </div>

          <div className="process-grid">
            <div className="process-card reveal in">
              <span className="process-num mono">01</span>
              <h3>Understand</h3>
              <p>Understand the client&apos;s requirements, reference material, dimensions, and intended application.</p>
            </div>
            <div className="process-card reveal in reveal-delay-1">
              <span className="process-num mono">02</span>
              <h3>Conceptualize</h3>
              <p>Develop the initial design concept and determine the best mechanical approach.</p>
            </div>
            <div className="process-card reveal in reveal-delay-2">
              <span className="process-num mono">03</span>
              <h3>Model</h3>
              <p>Create the detailed 3D CAD model using SolidWorks.</p>
            </div>
            <div className="process-card reveal in reveal-delay-3">
              <span className="process-num mono">04</span>
              <h3>Refine</h3>
              <p>Check dimensions, functionality, assembly relationships, manufacturability, and design details.</p>
            </div>
            <div className="process-card reveal in reveal-delay-4">
              <span className="process-num mono">05</span>
              <h3>Deliver</h3>
              <p>Provide the required CAD files, assemblies, drawings, flat patterns, or manufacturing documentation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PERSONAL STATS ============ */}
      <section className="section stats" id="about-stats">
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
            <div className="stat-card reveal in reveal-delay-3">
              <span className="dim-label mono">RANGE</span>
              <div className="stat-value" style={{ fontSize: "clamp(24px,3vw,34px)" }}>
                Multiple
              </div>
              <p className="stat-label">Design Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section cta-final" id="contact">
        <div className="container">
          <div className="cta-final-inner reveal in">
            <span className="eyebrow orange">Let&apos;s Build Something</span>
            <h2>Have a Mechanical Design Project in Mind?</h2>
            <p>Let&apos;s turn your concept, sketch, or idea into an accurate and manufacturable CAD design.</p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn-primary">
                Start a Project
              </Link>
              <Link href="/portfolio" className="btn btn-ghost">
                View My Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
