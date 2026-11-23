"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../admin.css";
import { useContent } from "@/lib/ContentContext";
import {
  PLACEHOLDER_PROFILE,
  AUTH_STORAGE_KEY,
  THEMES,
  ServiceItem,
  ProjectItem,
  AwardItem,
} from "@/lib/content";

export default function AdminPage() {
  const { content, theme, updateContent, updateTheme, resetContent } = useContent();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePanel, setActivePanel] = useState("panel-overview");
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");

  // Editable local copies of content fields
  const [editTagline, setEditTagline] = useState("");
  const [editProfilePhoto, setEditProfilePhoto] = useState<string | null>(null);

  // Home Page
  const [homeHeroIntro, setHomeHeroIntro] = useState("");
  const [homeStats, setHomeStats] = useState(content.home.stats);

  // About Page
  const [aboutHeroIntro, setAboutHeroIntro] = useState("");
  const [aboutStory0, setAboutStory0] = useState("");
  const [aboutStory1, setAboutStory1] = useState("");
  const [aboutStory2, setAboutStory2] = useState("");
  const [aboutClosing, setAboutClosing] = useState("");

  // Services
  const [services, setServices] = useState<ServiceItem[]>([]);

  // Portfolio
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  // Awards
  const [awards, setAwards] = useState<AwardItem[]>([]);

  // Contact
  const [contactEmail, setContactEmail] = useState("");
  const [contactWhatsApp, setContactWhatsApp] = useState("");
  const [contactInstagram, setContactInstagram] = useState("");
  const [contactYouTube, setContactYouTube] = useState("");
  const [contactLinkedIn, setContactLinkedIn] = useState("");

  // Security
  const [adminUsername, setAdminUsername] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("Admin@123");
  const [securitySuccess, setSecuritySuccess] = useState(false);

  // Save status notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    // Check local auth
    try {
      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        setAdminUsername(parsed.username || "admin");
        setAdminPassword(parsed.password || "Admin@123");
      }
    } catch {}

    // Init form states
    setEditTagline(content.brand.tagline);
    setEditProfilePhoto(content.profilePhoto);
    setHomeHeroIntro(content.home.heroIntro);
    setHomeStats([...content.home.stats]);
    setAboutHeroIntro(content.about.heroIntro);
    setAboutStory0(content.about.story[0] || "");
    setAboutStory1(content.about.story[1] || "");
    setAboutStory2(content.about.story[2] || "");
    setAboutClosing(content.about.storyClosing || "");
    setServices([...content.services.items]);
    setProjects([...content.projects]);
    setAwards([...content.awards]);
    setContactEmail(content.contact.email);
    setContactWhatsApp(content.contact.whatsapp);
    setContactInstagram(content.contact.instagram);
    setContactYouTube(content.contact.youtube);
    setContactLinkedIn(content.contact.linkedin);
  }, [content]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUser === adminUsername && loginPass === adminPassword) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password. Use default: admin / Admin@123");
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setEditProfilePhoto(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleProjectImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const updated = [...projects];
      updated[index].image = ev.target?.result as string;
      setProjects(updated);
    };
    reader.readAsDataURL(file);
  };

  const saveBranding = () => {
    updateContent({
      ...content,
      profilePhoto: editProfilePhoto,
      brand: { ...content.brand, tagline: editTagline },
    });
    showToast("Branding & Photo updated successfully!");
  };

  const saveHome = () => {
    updateContent({
      ...content,
      home: {
        ...content.home,
        heroIntro: homeHeroIntro,
        stats: homeStats,
      },
    });
    showToast("Home Page changes saved!");
  };

  const saveAbout = () => {
    updateContent({
      ...content,
      about: {
        ...content.about,
        heroIntro: aboutHeroIntro,
        story: [aboutStory0, aboutStory1, aboutStory2],
        storyClosing: aboutClosing,
      },
    });
    showToast("About Page changes saved!");
  };

  const saveServices = () => {
    updateContent({
      ...content,
      services: {
        ...content.services,
        items: services,
      },
    });
    showToast("Services updated successfully!");
  };

  const savePortfolio = () => {
    updateContent({
      ...content,
      projects: projects,
    });
    showToast("Portfolio projects updated successfully!");
  };

  const saveAwards = () => {
    updateContent({
      ...content,
      awards: awards,
    });
    showToast("Awards and achievements saved!");
  };

  const saveContact = () => {
    updateContent({
      ...content,
      contact: {
        email: contactEmail,
        whatsapp: contactWhatsApp,
        instagram: contactInstagram,
        youtube: contactYouTube,
        linkedin: contactLinkedIn,
      },
    });
    showToast("Contact & social information saved!");
  };

  const saveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ username: adminUsername, password: adminPassword })
      );
      setSecuritySuccess(true);
      setTimeout(() => setSecuritySuccess(false), 3000);
      showToast("Security credentials updated!");
    } catch {}
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-body">
        <div className="login-screen" id="loginScreen" style={{ display: "flex" }}>
          <div className="login-card">
            <div className="login-mark">AS</div>
            <h1>Admin Panel</h1>
            <p className="login-sub">Sign in to manage the ANAS mechanical design portfolio.</p>

            <form onSubmit={handleLogin} id="loginForm">
              <div className="form-group">
                <label htmlFor="loginUser">Username</label>
                <input
                  className="form-control"
                  type="text"
                  id="loginUser"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="loginPass">Password</label>
                <input
                  className="form-control"
                  type="password"
                  id="loginPass"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              {loginError && (
                <div
                  className="form-msg error show"
                  style={{ display: "block", marginBottom: "12px", color: "#ff5252" }}
                >
                  {loginError}
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", marginTop: "6px" }}
              >
                Log In
              </button>
            </form>

            <div className="login-hint">
              <span className="k mono">Default test login</span>
              <code>admin / Admin@123</code>
              <p>Change this in <b>Security</b> after logging in.</p>
            </div>
            <Link href="/" className="back-to-site">
              ← Back to the live site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "panel-overview", label: "Overview" },
    { id: "panel-branding", label: "Branding & Photo" },
    { id: "panel-home", label: "Home Page" },
    { id: "panel-about", label: "About Page" },
    { id: "panel-services", label: "Services" },
    { id: "panel-portfolio", label: "Portfolio" },
    { id: "panel-awards", label: "Awards & Achievements" },
    { id: "panel-contact", label: "Contact & Social" },
    { id: "panel-theme", label: "Theme" },
    { id: "panel-security", label: "Security" },
  ];

  return (
    <div className="admin-body">
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "var(--orange)",
            color: "#120a04",
            padding: "12px 20px",
            borderRadius: "6px",
            fontWeight: 600,
            zIndex: 9999,
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          {toastMessage}
        </div>
      )}

      <div className="dashboard" id="dashboard" style={{ display: "grid" }}>
        {/* SIDEBAR */}
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <span className="mark">AS</span>
            <span>Admin Panel</span>
          </div>

          <nav className="admin-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`admin-nav-btn ${activePanel === item.id ? "active" : ""}`}
                onClick={() => setActivePanel(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <Link
              href="/"
              target="_blank"
              className="btn btn-ghost btn-sm"
              style={{ width: "100%", justifyContent: "center" }}
            >
              View Live Site ↗
            </Link>
            <button
              id="logoutBtn"
              className="btn btn-ghost btn-sm"
              style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}
              onClick={() => setIsLoggedIn(false)}
            >
              Log Out
            </button>
          </div>
        </aside>

        {/* MAIN PANEL CONTENT */}
        <main className="admin-main">
          {/* OVERVIEW */}
          {activePanel === "panel-overview" && (
            <section className="admin-panel-section active">
              <h2>Dashboard Overview</h2>
              <p className="admin-lead">
                Everything here saves straight to the live website in this browser — no code,
                no developer needed.
              </p>

              <div className="admin-stats-row">
                <div className="admin-stat-box">
                  <span className="v">{content.projects.length}</span>
                  <span className="l">Portfolio Projects</span>
                </div>
                <div className="admin-stat-box">
                  <span className="v">{content.services.items.length}</span>
                  <span className="l">Services Listed</span>
                </div>
                <div className="admin-stat-box">
                  <span className="v">{content.awards.length}</span>
                  <span className="l">Awards Added</span>
                </div>
                <div className="admin-stat-box">
                  <span className="v">{THEMES[theme]?.label || theme}</span>
                  <span className="l">Active Theme</span>
                </div>
              </div>

              <div className="admin-card" style={{ marginTop: "28px" }}>
                <div className="admin-card-head">
                  <strong>Where to find things</strong>
                </div>
                <ul className="admin-help-list">
                  <li>
                    <b>Branding &amp; Photo</b> — your profile photo (used on Home + About) and
                    site tagline.
                  </li>
                  <li>
                    <b>Home / About Page</b> — the headline text and stats on those pages.
                  </li>
                  <li>
                    <b>Services</b> — add, remove, or reprice any service.
                  </li>
                  <li>
                    <b>Portfolio</b> — add, remove, or edit projects and upload real CAD renders.
                  </li>
                  <li>
                    <b>Awards &amp; Achievements</b> — shown on the About page.
                  </li>
                  <li>
                    <b>Contact &amp; Social</b> — email, WhatsApp, and social links.
                  </li>
                  <li>
                    <b>Theme</b> — instantly recolor the entire live site.
                  </li>
                  <li>
                    <b>Security</b> — change your admin username and password.
                  </li>
                </ul>
              </div>
            </section>
          )}

          {/* BRANDING & PHOTO */}
          {activePanel === "panel-branding" && (
            <section className="admin-panel-section active">
              <h2>Branding &amp; Profile Photo</h2>
              <p className="admin-lead">
                This photo is shared between the Home page hero and the About page hero.
              </p>

              <div className="admin-card">
                <div className="admin-thumb-row">
                  <img
                    className="admin-thumb-preview"
                    src={editProfilePhoto || PLACEHOLDER_PROFILE}
                    alt="Profile photo preview"
                    style={{ width: "160px", height: "120px", objectFit: "cover" }}
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                    <div className="form-note">
                      JPG or PNG recommended. Large images are automatically loaded.
                    </div>
                    <button
                      type="button"
                      className="admin-remove-btn"
                      onClick={() => setEditProfilePhoto(null)}
                      style={{ marginTop: "10px" }}
                    >
                      Reset to Placeholder
                    </button>
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <label>
                  Site Tagline
                  <textarea
                    className="form-control"
                    rows={2}
                    value={editTagline}
                    onChange={(e) => setEditTagline(e.target.value)}
                  ></textarea>
                </label>
                <div className="form-note">Appears under your name on the Home page hero.</div>
              </div>

              <button className="btn btn-primary" onClick={saveBranding}>
                Save Branding Changes
              </button>
            </section>
          )}

          {/* HOME PAGE */}
          {activePanel === "panel-home" && (
            <section className="admin-panel-section active">
              <h2>Home Page</h2>
              <div className="admin-card">
                <label>
                  Hero Introduction
                  <textarea
                    className="form-control"
                    rows={4}
                    value={homeHeroIntro}
                    onChange={(e) => setHomeHeroIntro(e.target.value)}
                  ></textarea>
                </label>
              </div>

              <div className="admin-card">
                <div className="admin-card-head">
                  <strong>Statistics</strong>
                </div>
                {homeStats.map((st, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <input
                      className="form-control"
                      value={st.label}
                      onChange={(e) => {
                        const updated = [...homeStats];
                        updated[i].label = e.target.value;
                        setHomeStats(updated);
                      }}
                      placeholder="Label"
                    />
                    <input
                      className="form-control"
                      type="number"
                      value={st.value}
                      onChange={(e) => {
                        const updated = [...homeStats];
                        updated[i].value = Number(e.target.value);
                        setHomeStats(updated);
                      }}
                      placeholder="Value"
                    />
                    <input
                      className="form-control"
                      value={st.suffix || ""}
                      onChange={(e) => {
                        const updated = [...homeStats];
                        updated[i].suffix = e.target.value;
                        setHomeStats(updated);
                      }}
                      placeholder="Suffix (+, %)"
                    />
                  </div>
                ))}
              </div>

              <button className="btn btn-primary" onClick={saveHome}>
                Save Home Page Changes
              </button>
            </section>
          )}

          {/* ABOUT PAGE */}
          {activePanel === "panel-about" && (
            <section className="admin-panel-section active">
              <h2>About Page</h2>
              <div className="admin-card">
                <label>
                  Hero Introduction
                  <textarea
                    className="form-control"
                    rows={4}
                    value={aboutHeroIntro}
                    onChange={(e) => setAboutHeroIntro(e.target.value)}
                  ></textarea>
                </label>
              </div>

              <div className="admin-card">
                <div className="admin-card-head">
                  <strong>My Journey — Story Paragraphs</strong>
                </div>
                <label>
                  Paragraph 1
                  <textarea
                    className="form-control"
                    rows={3}
                    value={aboutStory0}
                    onChange={(e) => setAboutStory0(e.target.value)}
                  ></textarea>
                </label>
                <label style={{ marginTop: "14px", display: "block" }}>
                  Paragraph 2
                  <textarea
                    className="form-control"
                    rows={3}
                    value={aboutStory1}
                    onChange={(e) => setAboutStory1(e.target.value)}
                  ></textarea>
                </label>
                <label style={{ marginTop: "14px", display: "block" }}>
                  Paragraph 3
                  <textarea
                    className="form-control"
                    rows={3}
                    value={aboutStory2}
                    onChange={(e) => setAboutStory2(e.target.value)}
                  ></textarea>
                </label>
                <label style={{ marginTop: "14px", display: "block" }}>
                  Closing Line
                  <textarea
                    className="form-control"
                    rows={2}
                    value={aboutClosing}
                    onChange={(e) => setAboutClosing(e.target.value)}
                  ></textarea>
                </label>
              </div>

              <button className="btn btn-primary" onClick={saveAbout}>
                Save About Page Changes
              </button>
            </section>
          )}

          {/* SERVICES */}
          {activePanel === "panel-services" && (
            <section className="admin-panel-section active">
              <h2>Services</h2>
              <p className="admin-lead">
                These appear on the Home page teaser and the full Services page.
              </p>

              {services.map((svc, i) => (
                <div className="admin-card" key={svc.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <strong>Service #{i + 1}</strong>
                    <button
                      type="button"
                      className="admin-remove-btn"
                      onClick={() => setServices(services.filter((_, idx) => idx !== i))}
                    >
                      Delete Service
                    </button>
                  </div>
                  <div style={{ display: "grid", gap: "10px" }}>
                    <input
                      className="form-control"
                      value={svc.title}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[i].title = e.target.value;
                        setServices(updated);
                      }}
                      placeholder="Title"
                    />
                    <textarea
                      className="form-control"
                      rows={2}
                      value={svc.desc}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[i].desc = e.target.value;
                        setServices(updated);
                      }}
                      placeholder="Description"
                    ></textarea>
                    <input
                      className="form-control"
                      value={svc.price}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[i].price = e.target.value;
                        setServices(updated);
                      }}
                      placeholder="Starting price"
                    />
                    <input
                      className="form-control"
                      value={svc.cta}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[i].cta = e.target.value;
                        setServices(updated);
                      }}
                      placeholder="CTA text"
                    />
                  </div>
                </div>
              ))}

              <div className="admin-actions-row">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() =>
                    setServices([
                      ...services,
                      {
                        id: `svc-${Date.now()}`,
                        icon: "generic",
                        title: "New Mechanical Service",
                        desc: "Service description here.",
                        deliverables: ["Deliverable 1", "Deliverable 2"],
                        price: "Starting at $50",
                        cta: "Request Service",
                      },
                    ])
                  }
                >
                  + Add Service
                </button>
                <button className="btn btn-primary" onClick={saveServices}>
                  Save Service Changes
                </button>
              </div>
            </section>
          )}

          {/* PORTFOLIO */}
          {activePanel === "panel-portfolio" && (
            <section className="admin-panel-section active">
              <h2>Portfolio Projects</h2>
              <p className="admin-lead">
                Projects marked &ldquo;Featured&rdquo; also appear on the Home page.
              </p>

              {projects.map((p, i) => (
                <div className="admin-card" key={p.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <strong>Project #{i + 1}</strong>
                    <button
                      type="button"
                      className="admin-remove-btn"
                      onClick={() => setProjects(projects.filter((_, idx) => idx !== i))}
                    >
                      Delete Project
                    </button>
                  </div>
                  <div style={{ display: "grid", gap: "10px" }}>
                    <input
                      className="form-control"
                      value={p.title}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[i].title = e.target.value;
                        setProjects(updated);
                      }}
                      placeholder="Project Title"
                    />
                    <select
                      className="form-control"
                      value={p.category}
                      onChange={(e) => {
                        const updated = [...projects];
                        const val = e.target.value as "cad" | "sheet-metal" | "assemblies";
                        updated[i].category = val;
                        updated[i].categoryLabel =
                          val === "cad"
                            ? "3D CAD Modeling"
                            : val === "sheet-metal"
                            ? "Sheet Metal Design"
                            : "Mechanical Assemblies & Drawings";
                        setProjects(updated);
                      }}
                    >
                      <option value="cad">3D CAD Modeling</option>
                      <option value="sheet-metal">Sheet Metal Design</option>
                      <option value="assemblies">Mechanical Assemblies &amp; Drawings</option>
                    </select>
                    <textarea
                      className="form-control"
                      rows={2}
                      value={p.desc}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[i].desc = e.target.value;
                        setProjects(updated);
                      }}
                      placeholder="Short description"
                    ></textarea>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={p.full}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[i].full = e.target.value;
                        setProjects(updated);
                      }}
                      placeholder="Full project details (for lightbox)"
                    ></textarea>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                          type="checkbox"
                          checked={p.featured}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[i].featured = e.target.checked;
                            setProjects(updated);
                          }}
                        />
                        Featured on Home Page
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleProjectImageUpload(i, e)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="admin-actions-row">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() =>
                    setProjects([
                      ...projects,
                      {
                        id: `p-${Date.now()}`,
                        category: "cad",
                        categoryLabel: "3D CAD Modeling",
                        title: "New CAD Project",
                        desc: "Short project summary.",
                        full: "Detailed project explanation.",
                        software: "SolidWorks",
                        type: "3D Modeling",
                        output: "3D CAD File + 2D Drawing",
                        image: null,
                        featured: false,
                      },
                    ])
                  }
                >
                  + Add Project
                </button>
                <button className="btn btn-primary" onClick={savePortfolio}>
                  Save Portfolio Changes
                </button>
              </div>
            </section>
          )}

          {/* AWARDS */}
          {activePanel === "panel-awards" && (
            <section className="admin-panel-section active">
              <h2>Awards &amp; Achievements</h2>
              <p className="admin-lead">These appear on the About page.</p>

              {awards.map((a, i) => (
                <div className="admin-card" key={a.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <strong>Award #{i + 1}</strong>
                    <button
                      type="button"
                      className="admin-remove-btn"
                      onClick={() => setAwards(awards.filter((_, idx) => idx !== i))}
                    >
                      Delete Award
                    </button>
                  </div>
                  <div style={{ display: "grid", gap: "10px" }}>
                    <input
                      className="form-control"
                      value={a.title}
                      onChange={(e) => {
                        const updated = [...awards];
                        updated[i].title = e.target.value;
                        setAwards(updated);
                      }}
                      placeholder="Award Title"
                    />
                    <input
                      className="form-control"
                      value={a.issuer}
                      onChange={(e) => {
                        const updated = [...awards];
                        updated[i].issuer = e.target.value;
                        setAwards(updated);
                      }}
                      placeholder="Issuer / Organization"
                    />
                    <input
                      className="form-control"
                      value={a.year}
                      onChange={(e) => {
                        const updated = [...awards];
                        updated[i].year = e.target.value;
                        setAwards(updated);
                      }}
                      placeholder="Year"
                    />
                    <textarea
                      className="form-control"
                      rows={2}
                      value={a.desc}
                      onChange={(e) => {
                        const updated = [...awards];
                        updated[i].desc = e.target.value;
                        setAwards(updated);
                      }}
                      placeholder="Description"
                    ></textarea>
                  </div>
                </div>
              ))}

              <div className="admin-actions-row">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() =>
                    setAwards([
                      ...awards,
                      {
                        id: `a-${Date.now()}`,
                        title: "Certification / Award",
                        issuer: "Institution",
                        year: "2026",
                        desc: "Description of the milestone or recognition.",
                      },
                    ])
                  }
                >
                  + Add Award
                </button>
                <button className="btn btn-primary" onClick={saveAwards}>
                  Save Awards Changes
                </button>
              </div>
            </section>
          )}

          {/* CONTACT & SOCIAL */}
          {activePanel === "panel-contact" && (
            <section className="admin-panel-section active">
              <h2>Contact &amp; Social Information</h2>
              <div className="admin-card">
                <label>
                  Email Address
                  <input
                    className="form-control"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </label>
              </div>
              <div className="admin-card">
                <label>
                  WhatsApp Number
                  <input
                    className="form-control"
                    value={contactWhatsApp}
                    onChange={(e) => setContactWhatsApp(e.target.value)}
                    placeholder="+92 300 1234567"
                  />
                </label>
              </div>
              <div className="admin-card">
                <label>
                  LinkedIn Profile URL
                  <input
                    className="form-control"
                    value={contactLinkedIn}
                    onChange={(e) => setContactLinkedIn(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                </label>
              </div>
              <div className="admin-card">
                <label>
                  Instagram Profile URL
                  <input
                    className="form-control"
                    value={contactInstagram}
                    onChange={(e) => setContactInstagram(e.target.value)}
                    placeholder="https://instagram.com/..."
                  />
                </label>
              </div>
              <div className="admin-card">
                <label>
                  YouTube Profile URL
                  <input
                    className="form-control"
                    value={contactYouTube}
                    onChange={(e) => setContactYouTube(e.target.value)}
                    placeholder="https://youtube.com/..."
                  />
                </label>
              </div>
              <button className="btn btn-primary" onClick={saveContact}>
                Save Contact Changes
              </button>
            </section>
          )}

          {/* THEME */}
          {activePanel === "panel-theme" && (
            <section className="admin-panel-section active">
              <h2>Color Theme</h2>
              <p className="admin-lead">
                Pick a color palette. Changes take effect across the entire website instantly.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                  marginBottom: "20px",
                }}
              >
                {Object.entries(THEMES).map(([tKey, tData]) => (
                  <div
                    key={tKey}
                    onClick={() => {
                      updateTheme(tKey);
                      showToast(`Switched theme to ${tData.label}`);
                    }}
                    style={{
                      background: tData.vars["--panel"],
                      border:
                        theme === tKey
                          ? "2px solid var(--orange)"
                          : "1px solid var(--border)",
                      padding: "16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontWeight: 600, marginBottom: "8px" }}>
                      {tData.label} {theme === tKey && "✓"}
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "4px",
                          background: tData.vars["--orange"],
                        }}
                      ></div>
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "4px",
                          background: tData.vars["--blue"],
                        }}
                      ></div>
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "4px",
                          background: tData.vars["--bg"],
                          border: "1px solid rgba(255,255,255,0.2)",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  resetContent();
                  showToast("Content and theme reset to defaults!");
                }}
              >
                Reset Site to Defaults
              </button>
            </section>
          )}

          {/* SECURITY */}
          {activePanel === "panel-security" && (
            <section className="admin-panel-section active">
              <h2>Security Credentials</h2>
              <p className="admin-lead">
                Update the login credentials used to access this Admin Panel.
              </p>

              <form onSubmit={saveSecurity} className="admin-card">
                <div className="form-group" style={{ marginBottom: "16px" }}>
                  <label htmlFor="sec-user">Admin Username</label>
                  <input
                    className="form-control"
                    id="sec-user"
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "16px" }}>
                  <label htmlFor="sec-pass">Admin Password</label>
                  <input
                    className="form-control"
                    id="sec-pass"
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                  />
                </div>

                {securitySuccess && (
                  <p style={{ color: "var(--orange)", marginBottom: "12px" }}>
                    Credentials updated successfully!
                  </p>
                )}

                <button type="submit" className="btn btn-primary">
                  Save New Credentials
                </button>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
