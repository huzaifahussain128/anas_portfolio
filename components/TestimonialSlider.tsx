"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "Anas delivered a clean and accurate SolidWorks model from our basic reference drawings. His attention to dimensions and manufacturing details was excellent.",
    avatar: "JM",
    name: "James Mitchell",
    role: "Product Manager, Client Placeholder",
  },
  {
    quote:
      "Very professional CAD designer. The sheet metal model and drawings were well organized and easy to use for manufacturing.",
    avatar: "SK",
    name: "Sarah Klein",
    role: "Operations Lead, Client Placeholder",
  },
  {
    quote:
      "Anas understood the design requirements quickly and delivered the mechanical model exactly according to the specifications.",
    avatar: "DR",
    name: "David Reyes",
    role: "Founder, Client Placeholder",
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="testimonial-wrap reveal in">
      <div className="testimonial-track">
        <div
          className="testimonial-slides"
          id="tSlides"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: "transform 0.5s ease",
          }}
        >
          {testimonials.map((t, idx) => (
            <div className="t-slide" key={idx}>
              <div className="t-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7-5.4-4.7 7.1-.6z" />
                  </svg>
                ))}
              </div>
              <p className="t-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="t-person">
                <div className="t-avatar">{t.avatar}</div>
                <div className="who">
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="t-controls">
        <button
          className="t-arrow"
          onClick={prev}
          aria-label="Previous testimonial"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="t-dots">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`t-dot ${idx === current ? "active" : ""}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
        <button
          className="t-arrow"
          onClick={next}
          aria-label="Next testimonial"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
