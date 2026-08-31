// All content sourced from full_details.md and cross-checked against the resume.
// Nothing here is invented — see planing.md content rules.

export const profile = {
  name: "Sonu Suman Ojha",
  initials: "SO",
  headline: "Computer Science Student · Data Analytics & Data Science",
  intro:
    "B.Tech Computer Science & Engineering student building a foundation in data analytics and data science. I work across Python, SQL and Power BI/Tableau to turn raw data into dashboards and decisions, and I've shipped full-stack projects end to end — from Spendly's expense tracker to a Netflix content analysis dashboard.",
  location: "Odisha, India",
  email: "sonusumanojha62@gmail.com",
  resumeFile: "Sonu_Suman_Ojha_Resume.pdf",
  social: {
    github: "https://github.com/sonusuman147",
    linkedin: "https://www.linkedin.com/in/sonu-suman-ojha/",
    instagram: "https://www.instagram.com/nxt__sonu__/",
    twitter: "https://x.com/SonusumanO",
  },
};

export const stats = [
  { value: "5", suffix: "+", label: "Projects shipped" },
  { value: "3", suffix: "", label: "Certifications" },
  { value: "2", suffix: "×", label: "IIT Bhubaneswar Hackathons" },
];

export const about = {
  paragraphs: [
    "I'm a B.Tech Computer Science & Engineering student at DRIEMS University, currently building my path toward data analytics and data science. My focus is on finding the story inside a dataset — cleaning it, modeling it, and presenting it in a way that helps someone make a decision.",
    "Most of my hands-on learning comes from projects: building interactive dashboards in Power BI and Tableau, writing analysis scripts in Python with Pandas and NumPy, and pairing that analytical side with full-stack web development so I can ship the tools people actually use. I've also taken that problem-solving mindset into hackathons, including two editions at IIT Bhubaneswar and the Smart India Hackathon.",
  ],
  focusAreas: [
    "Data Analysis & Visualization",
    "Dashboard Development",
    "Database Management",
    "Full-Stack Web Development",
  ],
};

export type SkillGroup = {
  title: string;
  note: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming & Web",
    note: "core.languages",
    skills: ["Python", "HTML", "CSS"],
  },
  {
    title: "Data Analysis",
    note: "analysis.libs",
    skills: ["Pandas", "NumPy", "Advanced Excel"],
  },
  {
    title: "Databases",
    note: "storage.sql",
    skills: ["MySQL", "PostgreSQL"],
  },
  {
    title: "Visualization & BI",
    note: "viz.tools",
    skills: ["Power BI", "Tableau"],
  },
  {
    title: "Version Control",
    note: "workflow.vcs",
    skills: ["Git", "GitHub"],
  },
];

export type Project = {
  id: string;
  name: string;
  category: string;
  type: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  team?: boolean;
};

export const projects: Project[] = [
  {
    id: "spendly",
    name: "Spendly",
    category: "Finance & Expense Tracking",
    type: "Full-Stack Web Application",
    description:
      "A modern, lightweight personal finance and expense tracking web application built with Flask and SQLite. Spendly gives users one place to manage expenses, budgets, savings goals, transactions and financial reports.",
    features: [
      "Secure auth with Google OAuth + security-question password recovery",
      "Full expense lifecycle management with CRUD operations",
      "High-performance transactions ledger & custom categories",
      "Visual spending analytics with interactive charts",
      "Monthly budgets with threshold alerts",
      "Savings goals with milestone tracking",
      "Per-user light/dark appearance settings",
      "Searchable Help & Support center with ticket submission",
    ],
    tech: ["Python", "Flask", "SQLite", "JavaScript", "Jinja2", "Google OAuth", "Pytest"],
    github: "https://github.com/sonusuman147/spendly",
    live: "https://spendly-xlgy.onrender.com/",
    featured: true,
  },
  {
    id: "netflix-tableau",
    name: "Netflix Tableau Dashboard",
    category: "Data Visualization & BI",
    type: "Data Visualization Project",
    description:
      "An interactive Tableau dashboard that turns Netflix's content catalog into visual insight — movies vs. TV shows, genre mix, country distribution, and release timelines.",
    features: [
      "Movie & TV show trend analysis",
      "Country-wise content distribution",
      "Genre-wise breakdown",
      "Content release timeline visualization",
      "Interactive dashboard elements for exploration",
    ],
    tech: ["Tableau", "Data Visualization", "Data Analysis"],
    github: "https://github.com/sonusuman147/Netflix-Tableau-Dashboard",
  },
  {
    id: "stem-quest",
    name: "STEM Quest",
    category: "Education & Gamification",
    type: "Gamified Learning Platform for Rural Education",
    description:
      "An interactive educational platform that turns core STEM subjects into game-based challenges, designed to lift engagement and retention for rural and underserved learners.",
    features: [
      "Gamified, play-based learning experience",
      "Offline-access support for low-connectivity regions",
      "Local-language content support",
      "Learner-friendly, accessible interface",
    ],
    tech: ["Web Development", "Gamification", "Offline-First", "Localization"],
    github: "https://github.com/sonusuman147/gamified-learning-rural",
    live: "https://gamified-learning-rural.vercel.app/",
  },
  {
    id: "superstore",
    name: "Super Store Sales Dashboard & Forecasting",
    category: "Business Intelligence & Forecasting",
    type: "Power BI Project",
    description:
      "An interactive Power BI dashboard analyzing sales and profitability for a superstore, tracking monthly trends, customer segments and payment modes — plus a 15-day sales forecast.",
    features: [
      "Sales & profitability performance analysis",
      "Regional and category-wise breakdowns",
      "Trend analysis across monthly sales data",
      "15-day sales forecasting for decision support",
    ],
    tech: ["Power BI", "Data Analytics", "Forecasting"],
    github: "https://github.com/sonusuman147/Super-Store-Sale-PowerBi-Dashboard",
  },
  {
    id: "urban-skill-exchange",
    name: "Urban Skill Exchange",
    category: "Full-Stack & Community Platform",
    type: "Full-Stack Hyperlocal Talent Sharing Platform",
    description:
      "A full-stack platform connecting people within urban communities for skill sharing, learning, collaboration and monetization — spanning programming, tutoring, fitness and crafts.",
    features: [
      "Skill-based user profiles & discovery",
      "Connects local learners with skilled individuals",
      "Support for monetizing skills",
      "Hyperlocal, community-focused design",
    ],
    tech: ["Full-Stack Development", "User Profiles", "Community Platform"],
    live: "https://skillhub.bolt.host/",
    team: true,
  },
];

export type EducationItem = {
  degree: string;
  school: string;
  period: string;
  note: string;
};

export const education: EducationItem[] = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    school: "DRIEMS University",
    period: "2024 – 2028",
    note: "Focus areas: programming, data analytics, databases, software development and emerging technologies.",
  },
  {
    degree: "Intermediate (12th) — Science & Commerce",
    school: "Model HS School Science & Commerce",
    period: "2022 – 2024",
    note: "Built foundational analytical, mathematical and commerce knowledge.",
  },
  {
    degree: "Matriculation (10th)",
    school: "Bairimal Government High School",
    period: "2020 – 2022",
    note: "Built a strong academic foundation for higher education.",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  focus: string[];
};

export const certifications: Certification[] = [
  {
    title: "Power BI Masterclass",
    issuer: "NoviTech",
    focus: ["Data visualization", "Dashboard creation", "Power BI"],
  },
  {
    title: "Data Analytics Certification",
    issuer: "CTTC (MSME)",
    focus: ["Python", "SQL", "Advanced Excel", "Tableau", "Basic Machine Learning"],
  },
  {
    title: "Python Programming Certification",
    issuer: "Cisco",
    focus: ["Python programming", "Programming fundamentals", "Problem solving"],
  },
];

export type Achievement = {
  title: string;
  role: string;
  place: string;
  period?: string;
  description: string;
};

export const achievements: Achievement[] = [
  {
    title: "Student Ambassador",
    role: "Ambassador",
    place: "Remote",
    period: "April 2025",
    description:
      "Promoted technology education, helping students discover technical skills and educational opportunities while supporting awareness and engagement activities — building communication, leadership and teamwork skills along the way.",
  },
  {
    title: "IIT Bhubaneswar Hackathon",
    role: "Participant",
    place: "Bhubaneswar, Odisha",
    period: "2 times",
    description:
      "Participated in two hackathons at IIT Bhubaneswar, working in teams to develop solutions under strict time constraints — contributing to brainstorming, prototyping and presentation.",
  },
  {
    title: "Smart India Hackathon",
    role: "Participant",
    place: "DRIEMS University, Cuttack",
    description:
      "Tackled real-world problem statements from government and industry stakeholders, collaborating with a team to analyze problems, design solutions and build rapid prototypes.",
  },
];

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];
