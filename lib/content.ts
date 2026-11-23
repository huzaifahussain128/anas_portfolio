export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  deliverables: string[];
  price: string;
  cta: string;
}

export interface ProjectItem {
  id: string;
  category: "cad" | "sheet-metal" | "assemblies";
  categoryLabel: string;
  title: string;
  desc: string;
  full: string;
  software: string;
  type: string;
  output: string;
  image: string | null;
  featured: boolean;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  desc: string;
}

export interface SiteContent {
  profilePhoto: string | null;
  brand: {
    name: string;
    title: string;
    tagline: string;
  };
  home: {
    heroIntro: string;
    stats: Stat[];
  };
  about: {
    heroIntro: string;
    story: string[];
    storyClosing: string;
  };
  services: {
    heroIntro: string;
    items: ServiceItem[];
  };
  portfolio: {
    intro: string;
  };
  projects: ProjectItem[];
  awards: AwardItem[];
  contact: {
    email: string;
    whatsapp: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
  theme: string;
}

function svgUri(inner: string, viewBox: string = "0 0 480 360"): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${inner}</svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

export const PLACEHOLDER_PROFILE = svgUri(
  '<rect width="480" height="360" fill="#12161b"/>' +
  '<rect x="0" y="288" width="480" height="72" fill="#181c22"/>' +
  '<path d="M90 320 C90 270 112 232 150 224 C182 218 198 232 196 260 C195 280 187 296 187 320 Z" fill="#0a0c0f" stroke="#3a4048"/>' +
  '<circle cx="146" cy="182" r="24" fill="#0a0c0f" stroke="#3a4048"/>' +
  '<path d="M124 182 C124 162 138 150 152 152 C166 154 170 170 166 182" fill="#12161b" stroke="#3a4048"/>' +
  '<rect x="230" y="90" width="200" height="150" rx="8" fill="#171c22" stroke="#3ea8ff" stroke-opacity="0.3"/>' +
  '<path d="M260 200 L300 178 L340 200 L300 222 Z" fill="none" stroke="#3ea8ff" stroke-width="1.4"/>' +
  '<circle cx="300" cy="200" r="8" fill="none" stroke="#ff7a29" stroke-width="1.4"/>' +
  '<text x="248" y="260" font-family="monospace" font-size="10" fill="#5c6670">PROFILE PHOTO — REPLACE IN ADMIN PANEL</text>',
  "0 0 480 360"
);

export const PLACEHOLDER_CAD = svgUri(
  '<rect width="240" height="200" fill="#12161b"/>' +
  '<path d="M60 130 L60 70 L100 50 L140 70 L140 130 L100 150 Z" fill="none" stroke="#eef1f4" stroke-opacity="0.85" stroke-width="1.3"/>' +
  '<path d="M60 70 L100 90 L140 70 M100 90 L100 150" stroke="#3ea8ff" stroke-width="1.3" fill="none" stroke-dasharray="3 3"/>' +
  '<circle cx="100" cy="100" r="14" stroke="#ff7a29" stroke-width="1.3" fill="none"/>',
  "0 0 240 200"
);

export const PLACEHOLDER_SHEETMETAL = svgUri(
  '<rect width="240" height="200" fill="#12161b"/>' +
  '<path d="M45 130 L45 65 L80 48 L155 48 L155 115 L120 130 Z" fill="none" stroke="#eef1f4" stroke-opacity="0.85" stroke-width="1.3"/>' +
  '<path d="M45 65 L120 65 L155 48 M120 65 L120 130" stroke="#3ea8ff" stroke-width="1.3" fill="none" stroke-dasharray="3 3"/>' +
  '<rect x="58" y="82" width="20" height="14" stroke="#ff7a29" stroke-width="1.3" fill="none"/>',
  "0 0 240 200"
);

export const PLACEHOLDER_ASSEMBLY = svgUri(
  '<rect width="240" height="200" fill="#12161b"/>' +
  '<circle cx="80" cy="90" r="30" stroke="#eef1f4" stroke-opacity="0.85" stroke-width="1.3" fill="none"/>' +
  '<circle cx="80" cy="90" r="10" stroke="#ff7a29" stroke-width="1.3" fill="none"/>' +
  '<circle cx="132" cy="70" r="18" stroke="#3ea8ff" stroke-width="1.3" fill="none"/>',
  "0 0 240 200"
);

export const CATEGORY_PLACEHOLDER: Record<string, string> = {
  cad: PLACEHOLDER_CAD,
  "sheet-metal": PLACEHOLDER_SHEETMETAL,
  assemblies: PLACEHOLDER_ASSEMBLY,
};

export const ICONS: Record<string, string> = {
  modeling: '<path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z"/><path d="M3 7 L12 12 L21 7"/><path d="M12 12 V22"/>',
  sheetmetal: '<path d="M4 4 H16 V10 H20 V20 H8 V14 H4 Z"/><path d="M16 4 L20 10" stroke-dasharray="2 2"/>',
  assembly: '<circle cx="7" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><circle cx="12" cy="18" r="3"/><path d="M9 9 L11 16 M15 9 L13 16 M10 7 H14"/>',
  drawings: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M7 8 H17 M7 12 H13 M7 16 H15" stroke-dasharray="1.5 2"/>',
  product: '<path d="M3 12 L9 6 L15 12 L21 6"/><path d="M3 18 L9 12 L15 18 L21 12"/>',
  conversion: '<path d="M4 4 H12 V12 H4 Z"/><path d="M14 6 H20 M14 10 H20 M14 14 H20"/><path d="M6 14 L6 20 M4 17 L8 17"/>',
  generic: '<circle cx="12" cy="12" r="9"/><path d="M12 7 V12 L15 15"/>',
};

export const THEMES: Record<string, { label: string; vars: Record<string, string> }> = {
  "charcoal-orange": {
    label: "Charcoal Orange",
    vars: {
      "--bg": "#0a0c0f",
      "--bg-soft": "#0e1114",
      "--panel": "#12161b",
      "--panel-2": "#171c22",
      "--border": "rgba(255,255,255,0.08)",
      "--border-strong": "rgba(255,255,255,0.14)",
      "--text": "#eef1f4",
      "--text-muted": "#93a0ab",
      "--text-faint": "#5c6670",
      "--orange": "#ff7a29",
      "--orange-soft": "rgba(255,122,41,0.14)",
      "--orange-line": "rgba(255,122,41,0.35)",
      "--blue": "#3ea8ff",
      "--blue-soft": "rgba(62,168,255,0.14)",
      "--blue-line": "rgba(62,168,255,0.35)",
    },
  },
  "midnight-blue": {
    label: "Midnight Blue",
    vars: {
      "--bg": "#070a12",
      "--bg-soft": "#0a0e18",
      "--panel": "#0f1524",
      "--panel-2": "#141b2e",
      "--border": "rgba(255,255,255,0.08)",
      "--border-strong": "rgba(255,255,255,0.15)",
      "--text": "#eef1f8",
      "--text-muted": "#93a0c0",
      "--text-faint": "#5c6690",
      "--orange": "#5fb4ff",
      "--orange-soft": "rgba(95,180,255,0.14)",
      "--orange-line": "rgba(95,180,255,0.35)",
      "--blue": "#7c8bff",
      "--blue-soft": "rgba(124,139,255,0.14)",
      "--blue-line": "rgba(124,139,255,0.35)",
    },
  },
  "slate-purple": {
    label: "Slate Purple",
    vars: {
      "--bg": "#0c0a12",
      "--bg-soft": "#100d18",
      "--panel": "#161222",
      "--panel-2": "#1c1730",
      "--border": "rgba(255,255,255,0.08)",
      "--border-strong": "rgba(255,255,255,0.15)",
      "--text": "#f0eef8",
      "--text-muted": "#a596c0",
      "--text-faint": "#6b5c8c",
      "--orange": "#b673ff",
      "--orange-soft": "rgba(182,115,255,0.14)",
      "--orange-line": "rgba(182,115,255,0.35)",
      "--blue": "#ff7ab8",
      "--blue-soft": "rgba(255,122,184,0.14)",
      "--blue-line": "rgba(255,122,184,0.35)",
    },
  },
  "emerald-dark": {
    label: "Emerald Dark",
    vars: {
      "--bg": "#080f0d",
      "--bg-soft": "#0b1310",
      "--panel": "#101a17",
      "--panel-2": "#15221d",
      "--border": "rgba(255,255,255,0.08)",
      "--border-strong": "rgba(255,255,255,0.14)",
      "--text": "#edf5f1",
      "--text-muted": "#8fada2",
      "--text-faint": "#54685f",
      "--orange": "#33d1a0",
      "--orange-soft": "rgba(51,209,160,0.14)",
      "--orange-line": "rgba(51,209,160,0.35)",
      "--blue": "#66c2ff",
      "--blue-soft": "rgba(102,194,255,0.14)",
      "--blue-line": "rgba(102,194,255,0.35)",
    },
  },
};

export const defaultSiteContent: SiteContent = {
  profilePhoto: null,
  brand: {
    name: "ANAS",
    title: "SolidWorks Mechanical Designer",
    tagline: "Turning engineering ideas into accurate, manufacturable designs.",
  },
  home: {
    heroIntro:
      "I create precise 3D CAD models, sheet metal designs, assemblies, and manufacturing-ready engineering drawings using SolidWorks and AutoCAD. My focus is on accuracy, functionality, manufacturability, and clean engineering documentation.",
    stats: [
      { label: "Years Experience", value: 2, suffix: "+" },
      { label: "CAD Designs", value: 100, suffix: "+" },
      { label: "Projects Completed", value: 50, suffix: "+" },
      { label: "Design Commitment", value: 100, suffix: "%" },
    ],
  },
  about: {
    heroIntro:
      "I am ANAS, a Mechanical Designer specializing in SolidWorks, Sheet Metal Design, 3D CAD Modeling, Mechanical Assemblies, and Engineering Drawings. With 2 years of experience, I focus on transforming engineering ideas, sketches, and concepts into accurate and practical CAD designs.",
    story: [
      "My journey into mechanical design started with an interest in understanding how things are built and how engineering ideas can be transformed into practical products. Over time, I developed my skills in CAD modeling and began working extensively with SolidWorks, focusing on creating accurate 3D models and practical mechanical designs.",
      "As I gained experience, I became particularly interested in Sheet Metal Design, mechanical assemblies, and manufacturing-oriented CAD development. I learned that good mechanical design is not only about creating a visually accurate 3D model, but also about understanding how that design will actually be manufactured, assembled, and used.",
      "Today, I work as a Mechanical Designer creating SolidWorks models, sheet metal components, assemblies, and engineering drawings. My goal is to take an initial idea, sketch, reference, or set of dimensions and turn it into a clean, functional, and manufacturable engineering design.",
    ],
    storyClosing:
      "For me, mechanical design is where engineering knowledge, precision, creativity, and practical manufacturing come together.",
  },
  services: {
    heroIntro:
      "I provide professional SolidWorks and mechanical design services, helping clients transform concepts, sketches, reference images, and engineering requirements into accurate 3D CAD models and practical manufacturing-ready designs.",
    items: [
      {
        id: "svc-modeling",
        icon: "modeling",
        title: "SolidWorks 3D Modeling",
        desc: "Create accurate 3D mechanical parts and components from sketches, dimensions, drawings, PDFs, images, or reference models.",
        deliverables: [
          "Part modeling",
          "3D mechanical components",
          "Parametric modeling",
          "Feature-based modeling",
          "Design modifications",
          "CAD reconstruction",
          "Manufacturing-oriented geometry",
        ],
        price: "Starting at $50 / part",
        cta: "Request 3D Modeling",
      },
      {
        id: "svc-sheetmetal",
        icon: "sheetmetal",
        title: "Sheet Metal Design",
        desc: "Professional sheet metal components designed with practical bends, flanges, thicknesses, flat patterns, and fabrication requirements in mind.",
        deliverables: [
          "Sheet metal parts",
          "Enclosures",
          "Brackets",
          "Panels",
          "Cabinets",
          "Flanges",
          "Bend features",
          "Flat patterns",
        ],
        price: "Starting at $75 / component",
        cta: "Request Sheet Metal",
      },
      {
        id: "svc-assembly",
        icon: "assembly",
        title: "Mechanical Assembly Design",
        desc: "Build complete SolidWorks assemblies by combining multiple components into accurate and organized mechanical systems.",
        deliverables: [
          "Multi-part assemblies",
          "Assembly mates",
          "Component positioning",
          "Sub-assemblies",
          "Design revisions",
          "Interference checking",
          "Assembly organization",
        ],
        price: "Starting at $100 / assembly",
        cta: "Request Assembly",
      },
      {
        id: "svc-drawings",
        icon: "drawings",
        title: "2D Engineering Drawings",
        desc: "Create clear and professional manufacturing drawings from 3D CAD models with dimensions, annotations, views, sections, and technical information.",
        deliverables: [
          "Orthographic views",
          "Section views",
          "Detail views",
          "Dimensions",
          "Tolerances",
          "Material specifications",
          "Annotations",
          "Manufacturing info",
        ],
        price: "Starting at $40 / drawing",
        cta: "Request Drawing",
      },
      {
        id: "svc-product",
        icon: "product",
        title: "Product & Mechanical Design",
        desc: "Transform an initial idea, concept, sketch, or reference into a functional mechanical product design using professional CAD workflows.",
        deliverables: [
          "Concept development",
          "Mechanical component design",
          "Product modeling",
          "Design improvements",
          "Functional considerations",
          "Component integration",
          "Design refinement",
        ],
        price: "Starting at $100 / project",
        cta: "Start Product Design",
      },
      {
        id: "svc-conversion",
        icon: "conversion",
        title: "CAD Conversion & Reconstruction",
        desc: "Convert existing drawings, sketches, PDFs, images, or reference models into clean and editable SolidWorks 3D CAD models.",
        deliverables: [
          "2D to 3D conversion",
          "PDF to CAD",
          "Image/reference modeling",
          "Model reconstruction",
          "CAD modifications",
          "Dimension-based rebuild",
          "Editable SolidWorks files",
        ],
        price: "Starting at $50 / model",
        cta: "Request Conversion",
      },
    ],
  },
  portfolio: {
    intro:
      "Explore a selection of my mechanical design work, from detailed SolidWorks 3D models and sheet metal components to mechanical assemblies and technical engineering drawings. Each project is developed with attention to accuracy, functionality, and manufacturability.",
  },
  projects: [
    {
      id: "p01",
      category: "cad",
      categoryLabel: "3D CAD Modeling",
      title: "Industrial Machine Component",
      desc: "Detailed SolidWorks 3D model developed from engineering dimensions with focus on accurate geometry and manufacturability.",
      full: "Detailed SolidWorks 3D model developed from engineering dimensions with focus on accurate geometry and manufacturability. Surface continuity, fillets, and functional tolerances were verified before the model was released for downstream drawing work.",
      software: "SolidWorks",
      type: "3D Part Modeling",
      output: "3D Model + Drawing",
      image: null,
      featured: true,
    },
    {
      id: "p02",
      category: "cad",
      categoryLabel: "3D CAD Modeling",
      title: "Custom Mechanical Housing",
      desc: "Designed a complete mechanical housing with mounting features and internal component clearance.",
      full: "Designed a complete mechanical housing with mounting features and internal component clearance. The model accounts for wall thickness, rib placement, and assembly access for the internal components it protects.",
      software: "SolidWorks",
      type: "3D Part Modeling",
      output: "3D Model + Drawing",
      image: null,
      featured: false,
    },
    {
      id: "p03",
      category: "cad",
      categoryLabel: "3D CAD Modeling",
      title: "Precision Shaft Component",
      desc: "Created a detailed mechanical shaft model with accurately defined dimensions and functional features.",
      full: "Created a detailed mechanical shaft model with accurately defined dimensions and functional features, including keyway, shoulders, and fillet radii sized for fatigue performance.",
      software: "SolidWorks",
      type: "3D Part Modeling",
      output: "3D Model + Drawing",
      image: null,
      featured: false,
    },
    {
      id: "p04",
      category: "cad",
      categoryLabel: "3D CAD Modeling",
      title: "Mechanical Product Concept",
      desc: "Developed a complete 3D CAD concept from an initial design idea into a functional mechanical model.",
      full: "Developed a complete 3D CAD concept from an initial design idea into a functional mechanical model, iterating on form and fit before locking geometry for detailed engineering.",
      software: "SolidWorks",
      type: "Concept Modeling",
      output: "3D Model + Drawing",
      image: null,
      featured: true,
    },
    {
      id: "p05",
      category: "sheet-metal",
      categoryLabel: "Sheet Metal Design",
      title: "Sheet Metal Electrical Enclosure",
      desc: "Designed a fabricated sheet metal enclosure including bends, mounting holes, flanges, and flat pattern development.",
      full: "Designed a complete sheet metal electrical enclosure using SolidWorks. The model includes accurately defined sheet thickness, bends, mounting holes, flange features, and a manufacturing-ready flat pattern. The design was developed with practical fabrication requirements in mind.",
      software: "SolidWorks",
      type: "Sheet Metal",
      output: "3D Model + Flat Pattern + Engineering Drawing",
      image: null,
      featured: true,
    },
    {
      id: "p06",
      category: "sheet-metal",
      categoryLabel: "Sheet Metal Design",
      title: "Industrial Mounting Bracket",
      desc: "Developed a practical sheet metal mounting bracket with accurate bends and manufacturing-friendly geometry.",
      full: "Developed a practical sheet metal mounting bracket with accurate bends and manufacturing-friendly geometry, including relief cuts sized to the material's minimum bend radius.",
      software: "SolidWorks",
      type: "Sheet Metal",
      output: "3D Model + Flat Pattern + Engineering Drawing",
      image: null,
      featured: false,
    },
    {
      id: "p07",
      category: "sheet-metal",
      categoryLabel: "Sheet Metal Design",
      title: "Control Panel Housing",
      desc: "Created a sheet metal control panel enclosure with mounting features and fabrication considerations.",
      full: "Created a sheet metal control panel enclosure with mounting features and fabrication considerations, including cut-outs for switches, indicators, and a hinged access door.",
      software: "SolidWorks",
      type: "Sheet Metal",
      output: "3D Model + Flat Pattern + Engineering Drawing",
      image: null,
      featured: false,
    },
    {
      id: "p08",
      category: "sheet-metal",
      categoryLabel: "Sheet Metal Design",
      title: "Fabrication Panel Assembly",
      desc: "Designed interconnected sheet metal panels with accurate dimensions and assembly features.",
      full: "Designed interconnected sheet metal panels with accurate dimensions and assembly features, including tab-and-slot alignment for repeatable fabrication and assembly.",
      software: "SolidWorks",
      type: "Sheet Metal",
      output: "3D Model + Flat Pattern + Engineering Drawing",
      image: null,
      featured: true,
    },
    {
      id: "p09",
      category: "assemblies",
      categoryLabel: "Mechanical Assemblies & Drawings",
      title: "Mechanical Gear Assembly",
      desc: "Created a multi-component SolidWorks assembly with properly defined mates and component relationships.",
      full: "Created a multi-component SolidWorks assembly with properly defined mates and component relationships, verified for interference and correct gear mesh through motion study.",
      software: "SolidWorks",
      type: "Assembly",
      output: "Assembly Model + Drawing Package",
      image: null,
      featured: true,
    },
    {
      id: "p10",
      category: "assemblies",
      categoryLabel: "Mechanical Assemblies & Drawings",
      title: "Machine Assembly",
      desc: "Developed a complete mechanical assembly consisting of multiple components designed for functional integration.",
      full: "Developed a complete mechanical assembly consisting of multiple components designed for functional integration, with a structured sub-assembly hierarchy for maintainability.",
      software: "SolidWorks",
      type: "Assembly",
      output: "Assembly Model + Drawing Package",
      image: null,
      featured: false,
    },
    {
      id: "p11",
      category: "assemblies",
      categoryLabel: "Mechanical Assemblies & Drawings",
      title: "Manufacturing Drawing Package",
      desc: "Prepared detailed engineering drawings with dimensions, annotations, section views, and manufacturing information.",
      full: "Prepared detailed engineering drawings with dimensions, annotations, section views, and manufacturing information, formatted to a consistent drawing standard across the full part set.",
      software: "SolidWorks",
      type: "Engineering Drawing",
      output: "Multi-Sheet Drawing Package",
      image: null,
      featured: false,
    },
    {
      id: "p12",
      category: "assemblies",
      categoryLabel: "Mechanical Assemblies & Drawings",
      title: "Fabrication-Ready Mechanical Design",
      desc: "Developed a complete mechanical design package including 3D models, assembly structure, and technical drawings.",
      full: "Developed a complete mechanical design package including 3D models, assembly structure, and technical drawings, delivered as a single fabrication-ready release.",
      software: "SolidWorks",
      type: "Full Design Package",
      output: "3D Models + Assembly + Drawing Package",
      image: null,
      featured: true,
    },
  ],
  awards: [
    {
      id: "a01",
      title: "Add Your Award Title",
      issuer: "Organization Name",
      year: "2026",
      desc: "Use the Admin Panel to add your real awards, certifications, and achievements here.",
    },
    {
      id: "a02",
      title: "Add Another Achievement",
      issuer: "Organization Name",
      year: "2025",
      desc: "Recognitions, completed certifications, or notable project outcomes can go here.",
    },
  ],
  contact: {
    email: "Anasahmed1869@gmail.com",
    whatsapp: "",
    instagram: "",
    youtube: "",
    linkedin: "",
  },
  theme: "charcoal-orange",
};

export const CONTENT_STORAGE_KEY = "anas_site_content_v1";
export const THEME_STORAGE_KEY = "anas_site_theme_v1";
export const AUTH_STORAGE_KEY = "anas_admin_auth_v1";
