"use client";

import Link from "next/link";
import { useContent } from "@/lib/ContentContext";
import { ICONS } from "@/lib/content";

export default function ServicesPage() {
  const { content } = useContent();

  const processSteps = [
    {
      num: "01",
      title: "Requirements",
      desc: "Understand your concept, dimensions, reference files, and project requirements.",
      delay: "",
    },
    {
      num: "02",
      title: "Planning",
      desc: "Determine the appropriate modeling and engineering approach.",
      delay: "reveal-delay-1",
    },
    {
      num: "03",
      title: "CAD Modeling",
      desc: "Develop the detailed SolidWorks model.",
      delay: "reveal-delay-2",
    },
    {
      num: "04",
      title: "Review & Refinement",
      desc: "Check dimensions, functionality, assembly relationships, and manufacturability.",
      delay: "reveal-delay-3",
    },
    {
      num: "05",
      title: "Delivery",
      desc: "Provide the required CAD models, drawings, assemblies, flat patterns, and other agreed deliverables.",
      delay: "reveal-delay-4",
    },
  ];

  return (
    <main>
      {/* ============ SERVICES HERO ============ */}
      <section className="page-header">
        <div className="corner-frame">
          <span className="tl"></span>
          <span className="tr"></span>
        </div>
        <div className="sheet-index mono">SHEET&nbsp;04&nbsp;/&nbsp;SERVICES &nbsp;·&nbsp; REV&nbsp;A</div>
        <div className="container">
          <span className="eyebrow orange reveal in">What I Offer</span>
          <h1 className="reveal in">Mechanical Design Services</h1>
          <p className="sub reveal in">
            Professional CAD solutions built for precision, functionality, and manufacturability.
          </p>
          <p className="desc reveal in">{content.services.heroIntro}</p>
          <div className="hero-ctas reveal in" style={{ marginTop: "32px" }}>
            <Link href="/portfolio" className="btn btn-primary">
              View My Portfolio
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SERVICES INTRO ============ */}
      <section
        className="section"
        id="intro"
        style={{ paddingTop: 0, paddingBottom: "70px", borderBottom: "none" }}
      >
        <div className="container">
          <div
            className="section-head center reveal in"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="eyebrow">Overview</span>
            <h2>What I Can Design For You</h2>
            <p>
              From individual mechanical components to complete assemblies and sheet metal
              products, I create organized and detailed CAD designs with a strong focus on
              accuracy, functionality, and real-world manufacturing requirements.
            </p>
          </div>
        </div>
      </section>

      {/* ============ MAIN SERVICES GRID ============ */}
      <section className="section" id="services-grid" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="svc-grid" id="servicesFullGrid">
            {content.services.items.map((s, i) => (
              <div className="svc-card reveal in" id={s.id} key={s.id}>
                <div className="svc-top">
                  <div className="svc-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      dangerouslySetInnerHTML={{
                        __html: ICONS[s.icon] || ICONS.generic,
                      }}
                    />
                  </div>
                  <span className="svc-num mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>
                <div className="svc-deliverables">
                  <div className="k mono">Includes</div>
                  <ul>
                    {s.deliverables.map((d, dIdx) => (
                      <li key={dIdx}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div className="svc-bottom">
                  <span className="svc-price">
                    Starting at
                    <b>{s.price.replace(/^Starting at\s*/i, "")}</b>
                  </span>
                  <Link href="/contact" className="btn btn-ghost btn-sm">
                    {s.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED SERVICE VISUALS ============ */}
      <section className="section" id="featured-services">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow orange">A Closer Look</span>
            <h2>Featured Capabilities</h2>
            <p>A closer look at how a few of these services translate into real CAD deliverables.</p>
          </div>

          <div className="featured-svc">
            <div className="featured-row reveal in">
              <div className="featured-copy">
                <span className="eyebrow">01 — 3D Modeling</span>
                <h3>SolidWorks 3D Modeling</h3>
                <p>
                  Every part starts as accurate geometry — correct fillets, wall thickness, and
                  functional features — so the model holds up from concept through manufacturing.
                </p>
              </div>
              <div className="featured-visual">
                <div className="viewport-frame">
                  <div className="vf-topbar">
                    <span>PART VIEW — ISO</span>
                    <span className="dot-row">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 480 300"
                    fill="none"
                    stroke="#3ea8ff"
                    strokeWidth="1.3"
                    style={{ width: "100%" }}
                  >
                    <path
                      d="M140 220 L140 130 L220 90 L340 90 L340 180 L260 220 Z"
                      stroke="#eef1f4"
                      strokeOpacity="0.85"
                    />
                    <path
                      d="M140 130 L260 130 L340 90 M260 130 L260 220"
                      strokeDasharray="3 3"
                    />
                    <circle cx="260" cy="160" r="18" stroke="#ff7a29" />
                    <path d="M260 138 L260 118 M260 182 L260 202" stroke="#ff7a29" />
                  </svg>
                  <div className="vf-caption">
                    <span className="live">
                      <i></i> PLACEHOLDER
                    </span>
                    <span>PART_MODEL_01.SLDPRT</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="featured-row reverse reveal in">
              <div className="featured-copy">
                <span className="eyebrow orange">02 — Sheet Metal</span>
                <h3>Sheet Metal Design</h3>
                <p>
                  Bends, flanges, and relief cuts are defined against the material&apos;s actual
                  bend allowance, so the flat pattern comes off the model ready to cut.
                </p>
              </div>
              <div className="featured-visual">
                <div className="viewport-frame">
                  <div className="vf-topbar">
                    <span>FLAT PATTERN — TOP</span>
                    <span className="dot-row">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 480 300"
                    fill="none"
                    stroke="#3ea8ff"
                    strokeWidth="1.3"
                    style={{ width: "100%" }}
                  >
                    <path
                      d="M120 230 L120 140 L200 110 L340 110 L340 190 L280 230 Z"
                      stroke="#eef1f4"
                      strokeOpacity="0.85"
                    />
                    <path d="M120 140 L280 140 L340 110" strokeDasharray="3 3" />
                    <path d="M280 140 L280 230" strokeDasharray="3 3" />
                    <rect x="150" y="160" width="34" height="24" stroke="#ff7a29" />
                    <rect x="200" y="160" width="34" height="24" stroke="#ff7a29" />
                    <circle cx="305" cy="165" r="9" stroke="#ff7a29" />
                  </svg>
                  <div className="vf-caption">
                    <span className="live">
                      <i></i> PLACEHOLDER
                    </span>
                    <span>ENCLOSURE_FLAT.SLDPRT</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="featured-row reveal in">
              <div className="featured-copy">
                <span className="eyebrow">03 — Assemblies</span>
                <h3>Mechanical Assemblies</h3>
                <p>
                  Components are mated with intent — concentric, coincident, and distance
                  relationships that reflect how the assembly actually moves and fits together.
                </p>
              </div>
              <div className="featured-visual">
                <div className="viewport-frame">
                  <div className="vf-topbar">
                    <span>ASSEMBLY — EXPLODED</span>
                    <span className="dot-row">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 480 300"
                    fill="none"
                    stroke="#3ea8ff"
                    strokeWidth="1.3"
                    style={{ width: "100%" }}
                  >
                    <circle cx="190" cy="160" r="42" stroke="#eef1f4" strokeOpacity="0.85" />
                    <circle cx="190" cy="160" r="15" stroke="#ff7a29" />
                    <circle cx="290" cy="120" r="24" stroke="#eef1f4" strokeOpacity="0.85" />
                    <circle cx="290" cy="120" r="8" stroke="#ff7a29" />
                    <path
                      d="M190 118 L190 96 M190 202 L190 224 M148 160 L128 160 M232 160 L252 160"
                      strokeDasharray="2 2"
                    />
                  </svg>
                  <div className="vf-caption">
                    <span className="live">
                      <i></i> PLACEHOLDER
                    </span>
                    <span>GEAR_ASSY_01.SLDASM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="featured-row reverse reveal in">
              <div className="featured-copy">
                <span className="eyebrow orange">04 — Drawings</span>
                <h3>Engineering Drawings</h3>
                <p>
                  Manufacturing drawings carry the information the model can&apos;t — tolerances,
                  materials, and section views formatted to a consistent drawing standard.
                </p>
              </div>
              <div className="featured-visual">
                <div className="viewport-frame">
                  <div className="vf-topbar">
                    <span>DRAWING SHEET — A3</span>
                    <span className="dot-row">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 480 300"
                    fill="none"
                    stroke="#3ea8ff"
                    strokeWidth="1.3"
                    style={{ width: "100%" }}
                  >
                    <rect x="120" y="90" width="240" height="170" stroke="#eef1f4" strokeOpacity="0.85" />
                    <path d="M120 175 L360 175 M240 90 L240 175" strokeDasharray="2 2" />
                    <path d="M150 195 L200 195 M150 205 L185 205" stroke="#ff7a29" />
                    <path d="M150 115 L150 150 M144 115 L156 115 M144 150 L156 150" stroke="#ff7a29" />
                  </svg>
                  <div className="vf-caption">
                    <span className="live">
                      <i></i> PLACEHOLDER
                    </span>
                    <span>DRAWING_A3_01.SLDDRW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT YOU RECEIVE ============ */}
      <section className="section" id="receive">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow">Deliverables</span>
            <h2>What You Receive</h2>
          </div>

          <div className="receive-grid">
            <div className="receive-card reveal in">
              <div className="receive-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" />
                  <path d="M3 7 L12 12 L21 7 M12 12 V22" />
                </svg>
              </div>
              <h3>Accurate CAD Models</h3>
              <p>Clean and organized SolidWorks models.</p>
            </div>

            <div className="receive-card reveal in reveal-delay-1">
              <div className="receive-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 15 L4 6 L12 3 L20 6 L20 15 L12 21 Z" />
                  <path d="M12 3 V21" />
                </svg>
              </div>
              <h3>Manufacturing-Focused Design</h3>
              <p>Models developed with practical manufacturing requirements in mind.</p>
            </div>

            <div className="receive-card reveal in reveal-delay-2">
              <div className="receive-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="4" y="3" width="16" height="18" rx="1" />
                  <path d="M8 8 H16 M8 12 H13 M8 16 H15" />
                </svg>
              </div>
              <h3>Professional Documentation</h3>
              <p>Clear engineering drawings and technical documentation where required.</p>
            </div>

            <div className="receive-card reveal in reveal-delay-3">
              <div className="receive-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 4 H12 V12 H4 Z" />
                  <path d="M14 6 H20 M14 10 H20 M14 14 H20" />
                </svg>
              </div>
              <h3>Editable Source Files</h3>
              <p>Appropriate editable CAD source files according to project requirements.</p>
            </div>

            <div className="receive-card reveal in reveal-delay-4">
              <div className="receive-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 6 H20 M4 12 H20 M4 18 H14" />
                </svg>
              </div>
              <h3>Clear Communication</h3>
              <p>Regular communication and attention to project specifications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW I WORK ============ */}
      <section className="section" id="how-i-work">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow orange">Workflow</span>
            <h2>How I Work</h2>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => (
              <div className={`process-card reveal in ${step.delay}`} key={step.num}>
                <span className="process-num mono">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING NOTE ============ */}
      <section className="section" id="pricing-note-section" style={{ borderBottom: "none" }}>
        <div className="container">
          <div className="pricing-note reveal in">
            <div className="pricing-note-text">
              <span className="eyebrow orange" style={{ marginBottom: "10px" }}>
                Custom Quotes
              </span>
              <h3>Need a Custom Quote?</h3>
              <p>
                The prices shown are starting prices. Final pricing depends on the complexity of
                the design, number of components, required revisions, level of detail, drawings,
                and project requirements.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Request a Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHY WORK WITH ME ============ */}
      <section className="section why" id="why-services">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow">The Approach</span>
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
              <p>Attention to dimensions, geometry, and engineering details.</p>
            </div>

            <div className="why-card reveal in reveal-delay-1">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 15 L4 6 L12 3 L20 6 L20 15 L12 21 Z" />
                  <path d="M12 3 V21 M4 6 L12 9 L20 6" />
                </svg>
              </div>
              <h3>Manufacturability</h3>
              <p>Design decisions consider practical fabrication and production requirements.</p>
            </div>

            <div className="why-card reveal in reveal-delay-2">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M9 9 H15 V15 H9 Z" />
                </svg>
              </div>
              <h3>Organized CAD</h3>
              <p>Clean and structured SolidWorks models that are easier to understand and modify.</p>
            </div>

            <div className="why-card reveal in reveal-delay-3">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 6 H20 M4 12 H20 M4 18 H14" />
                </svg>
              </div>
              <h3>Reliable Delivery</h3>
              <p>Professional communication and focus on delivering according to project requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SOFTWARE & TECHNICAL SKILLS ============ */}
      <section className="section tools" id="services-tools">
        <div className="container">
          <div className="section-head reveal in">
            <span className="eyebrow orange">Toolset</span>
            <h2>Software &amp; Technical Skills</h2>
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
                <path d="M4 4 H14 V10 H18 V20 H8 V14 H4 Z" />
              </svg>
              <span>SHEET METAL</span>
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
            <div className="tool-card reveal in">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 12 L9 6 L15 12 L21 6" />
                <path d="M3 18 L9 12 L15 18 L21 12" />
              </svg>
              <span>PRODUCT DESIGN</span>
            </div>
            <div className="tool-card reveal in">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 17 L10 11 L14 15 L20 7" />
                <path d="M14 7 H20 V13" />
              </svg>
              <span>DESIGN FOR MANUFACTURING</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section cta-final" id="contact">
        <div className="container">
          <div className="cta-final-inner reveal in">
            <span className="eyebrow orange">Let&apos;s Build Something</span>
            <h2>Have a Mechanical Design Project?</h2>
            <p>Send me your idea, sketch, drawing, or reference and let&apos;s turn it into a professional CAD design.</p>
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
