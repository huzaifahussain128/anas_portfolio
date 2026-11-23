"use client";

import Link from "next/link";
import { useState } from "react";
import { useContent } from "@/lib/ContentContext";
import {
  ProjectItem,
  CATEGORY_PLACEHOLDER,
  PLACEHOLDER_CAD,
} from "@/lib/content";
import ProjectLightbox from "@/components/ProjectLightbox";

export default function PortfolioPage() {
  const { content } = useContent();
  const [filter, setFilter] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const projects = content.projects;
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  const counts = {
    all: projects.length,
    cad: projects.filter((p) => p.category === "cad").length,
    "sheet-metal": projects.filter((p) => p.category === "sheet-metal").length,
    assemblies: projects.filter((p) => p.category === "assemblies").length,
  };

  const handleNextProject = () => {
    if (!activeProject) return;
    const idx = filteredProjects.findIndex((p) => p.id === activeProject.id);
    const nextIdx = (idx + 1) % filteredProjects.length;
    setActiveProject(filteredProjects[nextIdx]);
  };

  const handlePrevProject = () => {
    if (!activeProject) return;
    const idx = filteredProjects.findIndex((p) => p.id === activeProject.id);
    const prevIdx = (idx - 1 + filteredProjects.length) % filteredProjects.length;
    setActiveProject(filteredProjects[prevIdx]);
  };

  return (
    <main>
      {/* ============ PAGE HEADER ============ */}
      <section className="page-header">
        <div className="corner-frame">
          <span className="tl"></span>
          <span className="tr"></span>
        </div>
        <div className="sheet-index mono">SHEET&nbsp;02&nbsp;/&nbsp;PORTFOLIO &nbsp;·&nbsp; REV&nbsp;A</div>
        <div className="container">
          <span className="eyebrow orange reveal in">Selected Work</span>
          <h1 className="reveal in">My Portfolio</h1>
          <p className="sub reveal in">
            A selection of mechanical designs, SolidWorks models, sheet metal components,
            assemblies, and manufacturing-ready engineering work.
          </p>
          <p className="desc reveal in">{content.portfolio.intro}</p>
        </div>
      </section>

      {/* ============ FILTERS + GRID ============ */}
      <section className="section" id="portfolio-grid" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="pf-filters reveal in">
            <button
              className={`pf-filter ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Work{" "}
              <span className="n">
                {counts.all < 10 ? `0${counts.all}` : counts.all}
              </span>
            </button>
            <button
              className={`pf-filter ${filter === "cad" ? "active" : ""}`}
              onClick={() => setFilter("cad")}
            >
              3D CAD Modeling{" "}
              <span className="n">
                {counts.cad < 10 ? `0${counts.cad}` : counts.cad}
              </span>
            </button>
            <button
              className={`pf-filter ${filter === "sheet-metal" ? "active" : ""}`}
              onClick={() => setFilter("sheet-metal")}
            >
              Sheet Metal Design{" "}
              <span className="n">
                {counts["sheet-metal"] < 10
                  ? `0${counts["sheet-metal"]}`
                  : counts["sheet-metal"]}
              </span>
            </button>
            <button
              className={`pf-filter ${filter === "assemblies" ? "active" : ""}`}
              onClick={() => setFilter("assemblies")}
            >
              Mechanical Assemblies &amp; Drawings{" "}
              <span className="n">
                {counts.assemblies < 10
                  ? `0${counts.assemblies}`
                  : counts.assemblies}
              </span>
            </button>
          </div>

          <div className="pf-grid" id="pfGrid">
            {filteredProjects.map((p) => {
              const img =
                p.image || CATEGORY_PLACEHOLDER[p.category] || PLACEHOLDER_CAD;
              return (
                <div
                  className="pf-card show"
                  key={p.id}
                  onClick={() => setActiveProject(p)}
                >
                  <div className="pf-thumb">
                    <span className="pf-cat-chip">{p.categoryLabel}</span>
                    <img
                      src={img}
                      alt={p.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="pf-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <span className="pf-more">
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
              <Link href="/services" className="btn btn-ghost">
                Explore Services
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
