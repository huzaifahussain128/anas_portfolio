"use client";

import { useEffect } from "react";
import { ProjectItem, CATEGORY_PLACEHOLDER, PLACEHOLDER_CAD } from "@/lib/content";

interface ProjectLightboxProps {
  project: ProjectItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ProjectLightbox({
  project,
  onClose,
  onPrev,
  onNext,
}: ProjectLightboxProps) {
  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  const imgSrc =
    project.image || CATEGORY_PLACEHOLDER[project.category] || PLACEHOLDER_CAD;

  return (
    <div
      className="lightbox open"
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Project details"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lightbox-panel">
        <div className="lb-media">
          <div className="lb-media-inner">
            <img
              src={imgSrc}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <button className="lb-close" aria-label="Close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <button
            className="lb-nav lb-prev"
            aria-label="Previous project"
            onClick={onPrev}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="lb-nav lb-next"
            aria-label="Next project"
            onClick={onNext}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <div className="lb-content">
          <span className="lb-cat mono">{project.categoryLabel}</span>
          <h3 className="lb-title">{project.title}</h3>
          <p className="lb-desc">{project.full || project.desc}</p>
          <div className="lb-meta">
            <div className="m">
              <div className="k mono">Software</div>
              <div className="v">{project.software}</div>
            </div>
            <div className="m">
              <div className="k mono">Design Type</div>
              <div className="v">{project.type}</div>
            </div>
            <div className="m">
              <div className="k mono">Output</div>
              <div className="v">{project.output}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
