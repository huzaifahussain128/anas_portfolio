# ANAS — SolidWorks Mechanical Designer Portfolio

A modern, high-performance portfolio application built with **Next.js 15 (App Router)**, **TypeScript**, and a dedicated **Python backend**, engineered specifically for **ANAS**, a professional SolidWorks Mechanical Designer specializing in 3D CAD modeling, sheet metal fabrication design, mechanical assemblies, and manufacturing-ready engineering drawings.

---

## 📐 Design Philosophy: "Drawing Sheet"

The website is crafted with a signature **"Drawing Sheet"** CAD aesthetic:
- **Technical Drawing Aesthetic:** Sections framed like CAD viewports with corner brackets, sheet revision indices (`SHEET 01 / HOME · REV A`), and isometric coordinate callouts.
- **Dynamic Lighting & Ambient FX:** Interactive technical grid with glowing accent blobs and micro-particles.
- **Engineered Color Themes:** Default **Charcoal Orange** palette with dynamic switching between Midnight Blue, Slate Purple, and Emerald Dark.
- **Typography:** Space Grotesk for display headlines, Inter for body copy, and JetBrains Mono for technical specifications and coordinates.

---

## 🚀 Key Features & Pages

### 1. Public Pages (Next.js App Router)
- **Home (`/`)**: Hero viewport with designer profile model, live animated metrics counters (2+ Years, 100+ CAD Designs, 50+ Projects), service overview, featured projects carousel, animated engineering capability bars, client testimonials slider, and tools grid.
- **About (`/about`)**: Full engineering journey timeline, detailed mechanical design philosophy, custom SVG exploded bracket assembly illustration, core skills confidence metrics, and awards & recognitions.
- **Services (`/services`)**: Comprehensive breakdown of 6 core design offerings (3D Modeling, Sheet Metal Design, Mechanical Assemblies, 2D Engineering Drawings, Product Design, CAD Conversion) with deliverables checklists, pricing, and technical viewport graphics.
- **Portfolio (`/portfolio`)**: Multi-category filterable project showcase (All, 3D CAD Modeling, Sheet Metal, Assemblies) with an accessible, keyboard-navigable Lightbox modal (`Escape`, `ArrowLeft`, `ArrowRight`).
- **Contact (`/contact`)**: Direct channels (Email, WhatsApp request, LinkedIn, Instagram, YouTube) and an interactive project inquiry form with real-time validation, status notifications, and automated email client fallback.

### 2. Admin Panel & CMS (`/admin`)
- Built-in secure dashboard for instant live-site updates:
  - **Overview:** Live counter of projects, services, awards, and active palette.
  - **Branding & Profile Photo:** Live image upload or reset to placeholder.
  - **Content Management:** Edit hero introductions, statistics, journey paragraphs, and services.
  - **Portfolio Manager:** Add, edit, reorder, feature, and upload renders for CAD projects.
  - **Theme Switcher:** One-click live recoloring across the entire site.
  - **Security:** Update dashboard credentials.

### 3. Backend & Dynamic Data
- **Next.js API (`/api/contact`)**: Form processing endpoint that records client submissions to local storage/JSON.
- **Python Backend (`backend/app.py`)**: Lightweight, robust Python server (with FastAPI compatibility) for processing inquiries, CAD data exchange, and dynamic server workflows.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Modular CSS Design System (`app/globals.css`, `app/admin.css`) with CSS custom properties
- **Fonts:** `next/font/google` (`Space Grotesk`, `Inter`, `JetBrains Mono`)
- **Backend:** Next.js Route Handlers + Python HTTP / FastAPI server (`backend/app.py`)
- **Storage:** LocalStorage synchronization + JSON data persistence (`data/inquiries.json`)

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18.18.0 or higher recommended)
- Python 3.9+ (optional, for Python backend)

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/huzaifahussain128/anas_portfolio.git
cd anas_portfolio
npm install
```

### 2. Run the Next.js Frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run the Python Backend (Optional)

In a separate terminal:

```bash
python backend/app.py
```

The backend server runs on [http://127.0.0.1:8000](http://127.0.0.1:8000).

### 4. Production Build

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```text
├── app/
│   ├── about/page.tsx          # About page
│   ├── admin/page.tsx          # Admin CMS panel
│   ├── api/contact/route.ts    # Contact form API route
│   ├── contact/page.tsx        # Contact page
│   ├── portfolio/page.tsx      # Portfolio & Lightbox page
│   ├── services/page.tsx       # Services page
│   ├── globals.css             # Main CAD design system stylesheet
│   ├── admin.css               # Admin panel stylesheet
│   ├── icon.svg                # Favicon / Brand mark
│   ├── layout.tsx              # Root layout & font definitions
│   └── page.tsx                # Home page
├── backend/
│   └── app.py                  # Python backend server
├── components/
│   ├── BackgroundFx.tsx        # Ambient grid & particle animations
│   ├── CapabilityBar.tsx       # Animated skill bar component
│   ├── ContactForm.tsx         # Interactive contact inquiry form
│   ├── Footer.tsx              # Universal site footer
│   ├── Navbar.tsx              # Scrolled nav & mobile drawer
│   ├── ProjectLightbox.tsx     # Fullscreen CAD project lightbox
│   ├── StatCard.tsx            # Animated numerical counter card
│   └── TestimonialSlider.tsx   # Client testimonials carousel
├── lib/
│   ├── content.ts              # Single source of truth data & types
│   └── ContentContext.tsx      # React context & live storage sync
├── data/
│   └── inquiries.json          # Form submissions database
├── .env                        # Environment configurations
├── .gitignore                  # Git ignore rules
├── next.config.mjs             # Next.js configuration
├── package.json                # Project dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

---

## 🔒 Admin Credentials (Default)

- **URL:** `/admin`
- **Username:** `admin`
- **Password:** `Admin@123`

*(You can customize these credentials directly from the Security tab inside the Admin Panel.)*

---

## 📄 License

All rights reserved © 2026 ANAS.
