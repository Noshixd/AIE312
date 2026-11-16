import type {
  TeamMember,
  TeamProject,
  TeamProfile
} from "../types/portfolio";

// ข้อมูลชุดเดียวกับ BE/seed/portfolio.json (ที่ AI ใช้ตอบคำถาม)
// ถ้าแก้ข้อมูลที่นี่ ให้แก้ใน BE/seed/portfolio.json ด้วย เพื่อให้หน้าเว็บกับคำตอบของ AI ตรงกัน

// ======================================
// 1. TEAM PROFILE
// ข้อมูลโดยรวมของกลุ่ม
// ======================================

export const teamInfo: TeamProfile = {
  name: "Quiksilver",

  tagline: "Different minds. One direction.",

  description:
    "A team of third-year Artificial Intelligence Engineering " +
    "and Data Science students from Bangkok University. " +
    "We bring together Backend Development, Frontend Design, " +
    "AI Engineering, and DevOps to build practical technology solutions.",

  email: "",
  github: "https://github.com/Noshixd/AIE312",
  instagram: "",
  linkedin: "",
  location: "Bangkok University, Thailand"
};

// ======================================
// 2. TEAM MEMBERS
// ข้อมูลสมาชิกทั้งหมด 3 คน
// ======================================

export const members: TeamMember[] = [

  // MEMBER 01
  {
    id: 1,

    name: "อัสสชิ บัวชุม (Noah)",

    role: "Backend Developer",

    initials: "N",

    isPlaceholder: false,

    bio:
      "Third-year student in Artificial Intelligence Engineering " +
      "and Data Science at Bangkok University. Interested in applying " +
      "AI and data to practical systems, including web applications, " +
      "robotics, and data analytics.",

    skills: [
      "Python",
      "TypeScript",
      "JavaScript",
      "SQL",
      "Express",
      "PostgreSQL",
      "React",
      "Supabase",
      "ROS2",
      "YOLO",
      "Docker",
      "Git"
    ],

    contribution:
      "Express API, PostgreSQL database and chat history",

    personalProjects: [
      "Hotel Management System - AIE313",
      "ROS2 Person Detection and Odometry",
      "Service Robot Kiosk",
      "Vehicle Routing Problem Solver",
      "Hotel Booking Demand Dashboard"
    ]
  },

  // MEMBER 02
  {
    id: 2,

    name: "ศวิตา โตประสิทธิ์ (Zene)",

    role: "Frontend Developer & UX/UI Designer",

    initials: "Z",

    isPlaceholder: false,

    bio:
      "Third-year student in Artificial Intelligence Engineering " +
      "and Data Science at Bangkok University. Interested in user " +
      "experience, interface design, and frontend development.",

    skills: [
      "React",
      "UX/UI Design",
      "Frontend Development",
      "Python",
      "SQL",
      "PostgreSQL",
      "Git",
      "GitHub",
      "Teamwork"
    ],

    contribution:
      "Portfolio website, Chat UI and UX/UI design",

    personalProjects: [
      "SMA - Smurf Mechanical Arm",
      "PDPA Hackathon"
    ]
  },

  // MEMBER 03
  {
    id: 3,

    name: "ปัณณธร บุ้งทอง (Stamp)",

    role: "AI Engineer & DevOps",

    initials: "S",

    isPlaceholder: false,

    bio:
      "Third-year student in Artificial Intelligence Engineering " +
      "and Data Science at Bangkok University. Focuses on building " +
      "AI applications, data systems, and reliable development " +
      "and deployment workflows.",

    skills: [
      "Python",
      "Machine Learning",
      "Data Science",
      "SQL",
      "PostgreSQL",
      "Supabase",
      "Docker",
      "CI/CD",
      "Pandas",
      "Scikit-learn",
      "Tableau",
      "Power BI"
    ],

    contribution:
      "AI integration, CI/CD pipeline and deployment",

    personalProjects: [
      "Digital Asset KYC & AML Transaction Monitoring System",
      "AI Hackathon Route Optimization 2026 (Top 21)",
      "OIL SHOCK HACK! 2026 (Top 9)",
      "AIHack Thailand 2025 (Top 8)",
      "Thailand Real Estate Case Competition 2025 (Top 20)"
    ]
  }

];

// ======================================
// 3. TEAM PROJECTS
// ผลงานของกลุ่ม
// ======================================

export const projects: TeamProject[] = [

  {
    id: 1,

    title: "TeamSpace AI - Group Portfolio",

    category: "AI WEB APPLICATION",

    description:
      "An AI-powered group portfolio website that introduces Quiksilver, " +
      "showcases member profiles and projects, and allows visitors " +
      "to ask questions through an AI chatbot.",

    technologies: [
      "React",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "LLM API",
      "Docker",
      "CI/CD"
    ],

    status: "LIVE",

    github: "https://github.com/Noshixd/AIE312",
    demo: "https://teamspace-web-pl79.onrender.com"
  },

  {
    id: 2,

    title: "Digital Asset KYC & AML Transaction Monitoring System",

    category: "DATABASE SYSTEM",

    description:
      "A digital asset exchange management database covering customer KYC, " +
      "account management, transaction monitoring, and AML risk analysis, " +
      "with 22 tables, 7 analytical views, 16 analytical SQL queries, " +
      "and an LLM-powered natural-language query interface.",

    technologies: [
      "PostgreSQL",
      "Supabase",
      "SQL",
      "LLM",
      "Database Design"
    ],

    status: "TEAM PROJECT"
  }

];
