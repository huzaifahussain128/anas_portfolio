"use client";

import React, { useState } from "react";
import { useContent } from "@/lib/ContentContext";

export default function ContactForm() {
  const { content } = useContent();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState("");

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your name.";
    }
    if (!formData.email.trim() || !emailRe.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.projectType) {
      errs.projectType = "Please select a project type.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please add a few project details.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setHasError(false);

    if (!validate()) {
      setHasError(true);
      return;
    }

    const recipientEmail = content.contact.email || "Anasahmed1869@gmail.com";
    const subject = encodeURIComponent(
      `New Project Inquiry — ${formData.projectType}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nBudget: ${
        formData.budget || "Not specified"
      }\n\nDetails:\n${formData.message}`
    );

    const generatedMailto = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    setMailtoUrl(generatedMailto);

    // Save locally
    try {
      const submission = {
        ...formData,
        submittedAt: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("anas_inquiries") || "[]");
      existing.push(submission);
      localStorage.setItem("anas_inquiries", JSON.stringify(existing));
    } catch {
      // localStorage may be disabled
    }

    // Try posting to internal API if available
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // Offline or backend not reachable; client-side mailto / localStorage handles it
    }

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      projectType: "",
      budget: "",
      message: "",
    });
  };

  return (
    <form id="contactForm" className="form-grid" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="cf-name">Your Name</label>
        <input
          className={`form-control ${errors.name ? "invalid" : ""}`}
          type="text"
          id="cf-name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="form-error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="cf-email">Email Address</label>
        <input
          className={`form-control ${errors.email ? "invalid" : ""}`}
          type="email"
          id="cf-email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="form-error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="cf-type">Project Type</label>
        <select
          className={`form-control ${errors.projectType ? "invalid" : ""}`}
          id="cf-type"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select project type
          </option>
          <option>SolidWorks 3D Modeling</option>
          <option>Sheet Metal Design</option>
          <option>Mechanical Assembly</option>
          <option>Engineering Drawing</option>
          <option>Product Design</option>
          <option>CAD Conversion / Reconstruction</option>
          <option>Other</option>
        </select>
        {errors.projectType && (
          <span className="form-error-text">{errors.projectType}</span>
        )}
      </div>

      <div className="form-group optional">
        <label htmlFor="cf-budget">Estimated Budget</label>
        <select
          className="form-control"
          id="cf-budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
        >
          <option value="">Select a range (optional)</option>
          <option>Under $50</option>
          <option>$50 – $100</option>
          <option>$100 – $250</option>
          <option>$250 – $500</option>
          <option>$500 – $1,000</option>
          <option>$1,000+</option>
          <option>Not Sure Yet</option>
        </select>
      </div>

      <div className="form-group full">
        <label htmlFor="cf-message">Project Details</label>
        <textarea
          className={`form-control ${errors.message ? "invalid" : ""}`}
          id="cf-message"
          name="message"
          placeholder="Tell me about your project, requirements, dimensions, reference files, or anything else I should know..."
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        {errors.message && (
          <span className="form-error-text">{errors.message}</span>
        )}
      </div>

      <div className="form-group full form-submit-row">
        <button type="submit" className="btn btn-primary">
          Send Project Inquiry
        </button>
        <span className="form-note">I typically respond within 1–2 business days.</span>
      </div>

      <div className="form-group full">
        {submitted && (
          <div className="form-msg success show" id="formSuccess">
            <svg
              className="fm-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M8 12.5 L11 15.5 L16 9" />
            </svg>
            <div>
              <h4>Message Sent Successfully</h4>
              <p>
                Thank you for reaching out. I&apos;ll review your project details and get
                back to you as soon as possible. If your email client didn&apos;t open
                automatically, you can{" "}
                <a
                  id="cfMailFallback"
                  href={mailtoUrl || `mailto:${content.contact.email}`}
                  style={{ color: "var(--blue)", textDecoration: "underline" }}
                >
                  email me directly here
                </a>
                .
              </p>
            </div>
          </div>
        )}

        {hasError && (
          <div className="form-msg error show" id="formError">
            <svg
              className="fm-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8 V13 M12 16 V16.01" />
            </svg>
            <div>
              <h4>Please check the highlighted fields</h4>
              <p>
                A few required details are missing or invalid. Correct them above and
                send your inquiry again.
              </p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
