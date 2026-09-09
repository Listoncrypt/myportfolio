import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import {
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Send,
  ExternalLink,
  ArrowRight,
  Menu,
  X,
  Terminal as TerminalIcon
} from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import Resume from "./components/Resume";
import Terminal from "./components/Terminal";

interface ShelfItem {
  name: string;
  type: string;
  category: "Languages" | "Frameworks" | "Cloud & DevOps" | "Data & Security" | "Books";
  icon: ReactNode;
}

const shelfCategories = ["All", "Languages", "Frameworks", "Cloud & DevOps", "Data & Security", "Books"] as const;

const shelfItems: ShelfItem[] = [
  { name: "TypeScript", type: "Language", category: "Languages", icon: <span className="font-mono font-black text-sky-400">TS</span> },
  { name: "React", type: "Frontend Library", category: "Frameworks", icon: "⚛️" },
  { name: "Rust", type: "Language", category: "Languages", icon: "🦀" },
  { name: "JavaScript", type: "Language", category: "Languages", icon: <span className="font-mono font-black text-amber-300">JS</span> },
  { name: "Go", type: "Language", category: "Languages", icon: <span className="font-mono font-black text-cyan-400">GO</span> },
  { name: "Java", type: "Language", category: "Languages", icon: "☕" },
  { name: "Python", type: "Language", category: "Languages", icon: "🐍" },
  { name: "Bash Script", type: "Language", category: "Languages", icon: <span className="font-mono font-black text-emerald-400">$_</span> },
  { name: "Solidity", type: "Language", category: "Languages", icon: "💎" },
  { name: "Swift", type: "Mobile (iOS)", category: "Languages", icon: "🦅" },
  { name: "Objective-C", type: "Mobile (iOS)", category: "Languages", icon: <span className="font-mono font-black text-amber-500">ObjC</span> },
  { name: "Kotlin", type: "Mobile (Android)", category: "Languages", icon: <span className="font-mono font-black text-purple-400">KT</span> },
  { name: "Dart", type: "Mobile (Flutter)", category: "Languages", icon: <span className="font-mono font-black text-cyan-500">🎯</span> },
  { name: "PHP", type: "Language", category: "Languages", icon: <span className="font-mono font-black text-indigo-400">PHP</span> },
  { name: "Ruby", type: "Language", category: "Languages", icon: <span className="font-mono font-black text-red-500">◆</span> },
  { name: "C", type: "Language", category: "Languages", icon: <span className="font-mono font-black text-blue-500">C</span> },
  { name: "HTML5", type: "Markup", category: "Languages", icon: <span className="font-mono font-black text-orange-500">&lt;/&gt;</span> },
  { name: "GraphQL", type: "Query Language", category: "Languages", icon: "◈" },
  { name: "SQL", type: "Query Language", category: "Languages", icon: "🗄️" },

  { name: "React Native", type: "Mobile Framework", category: "Frameworks", icon: "📱" },
  { name: "Django", type: "Web Framework", category: "Frameworks", icon: <span className="font-mono font-black text-emerald-600">DJ</span> },
  { name: "FastAPI", type: "API Framework", category: "Frameworks", icon: "⚡" },
  { name: "Flask", type: "Microframework", category: "Frameworks", icon: "🧪" },
  { name: "NestJS", type: "Node Framework", category: "Frameworks", icon: "🦁" },
  { name: "Angular", type: "Web Framework", category: "Frameworks", icon: "🅰️" },
  { name: "SolidJS", type: "Reactive UI", category: "Frameworks", icon: "🔷" },
  { name: "Flutter", type: "Cross-Platform", category: "Frameworks", icon: "💙" },
  { name: "Electron", type: "Desktop Apps", category: "Frameworks", icon: "⚛" },
  { name: "Gatsby", type: "Static Generator", category: "Frameworks", icon: "🟣" },
  { name: "Vue / Vuetify", type: "UI Framework", category: "Frameworks", icon: "🟢" },

  { name: "Docker", type: "Containers", category: "Cloud & DevOps", icon: "🐳" },
  { name: "AWS", type: "Cloud Provider", category: "Cloud & DevOps", icon: "☁️" },
  { name: "Azure", type: "Cloud Provider", category: "Cloud & DevOps", icon: "🔷" },
  { name: "Google Cloud", type: "Cloud Platform", category: "Cloud & DevOps", icon: "☁️" },
  { name: "Cloudflare", type: "CDN & Edge Security", category: "Cloud & DevOps", icon: "🟧" },
  { name: "Vercel", type: "Edge Deployment", category: "Cloud & DevOps", icon: "▲" },
  { name: "Netlify", type: "Web Hosting", category: "Cloud & DevOps", icon: "💎" },
  { name: "Nginx", type: "Reverse Proxy", category: "Cloud & DevOps", icon: "🟩" },
  { name: "Render", type: "Cloud Hosting", category: "Cloud & DevOps", icon: "🚀" },
  { name: "Heroku", type: "Cloud PaaS", category: "Cloud & DevOps", icon: "🟣" },

  { name: "PostgreSQL", type: "Relational Database", category: "Data & Security", icon: "🐘" },
  { name: "SQLite", type: "Embedded DB", category: "Data & Security", icon: "💾" },
  { name: "Supabase", type: "Backend & Postgres", category: "Data & Security", icon: "⚡" },
  { name: "Prisma", type: "Type-Safe ORM", category: "Data & Security", icon: "◬" },
  { name: "Kali Linux", type: "Security OS", category: "Data & Security", icon: "🐉" },
  { name: "OSCP", type: "Security Cert", category: "Data & Security", icon: "🛡️" },
  { name: "Splunk", type: "SIEM & Analytics", category: "Data & Security", icon: "🔍" },
  { name: "Apache Airflow", type: "Workflow Orchestration", category: "Data & Security", icon: "🌪️" },
  { name: "Pandas", type: "Data Analysis", category: "Data & Security", icon: "🐼" },

  { name: "Hacker's Handbook", type: "Security Book", category: "Books", icon: "📚" },
  { name: "Clean Code", type: "Software Design Book", category: "Books", icon: "📖" },
  { name: "Data-Intensive Apps", type: "Architecture Book", category: "Books", icon: "🏗️" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "resume">("home");
  const [selectedShelfCategory, setSelectedShelfCategory] = useState<string>("All");
  const [isShelfExpanded, setIsShelfExpanded] = useState(false);
  const INITIAL_SHELF_COUNT = 8;
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinks = [
    { name: "What I Built", href: "#work", type: "anchor" },
    { name: "Contributions", href: "#contributions", type: "anchor" },
    { name: "The Craft", href: "#shelf", type: "anchor" },
    { name: "My Résumé", href: "#resume", type: "page" },
    { name: "Contact", href: "mailto:listoncrypt@gmail.com", type: "external" },
  ];

  const socialLinks = [
    { icon: <Twitter size={18} />, label: "TW", href: "https://x.com/listoncrypt" },
    { icon: <Github size={18} />, label: "GH", href: "https://github.com/listoncrypt" },
    { icon: <Linkedin size={18} />, label: "LN", href: "https://www.linkedin.com/in/ebube-uchenna-9aab612a5/" },
    { icon: <Youtube size={18} />, label: "YT", href: "https://youtube.com" },
  ];

  if (currentPage === "resume") {
    return <Resume onBack={() => setCurrentPage("home")} />;
  }

  return (
    <div className="min-h-screen selection:bg-accent selection:text-bg overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentPage === "home" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="fixed top-0 left-0 w-8 h-8 bg-accent rounded-full pointer-events-none z-50 custom-cursor hidden md:block"
              animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
              transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
            />

            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[60]"
              style={{ scaleX }}
            />

            <header className="fixed top-0 left-0 w-full z-40 px-6 py-8 md:px-12 flex justify-between items-center mix-blend-difference">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-display font-bold tracking-tighter cursor-pointer"
                onClick={() => setCurrentPage("home")}
              >
                UE.
              </motion.div>

              <nav className="hidden md:flex gap-8 items-center">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.name}
                    onClick={() => {
                      if (link.type === "page") {
                        setCurrentPage("resume");
                      } else if (link.type === "external") {
                        window.location.href = link.href;
                      } else {
                        const el = document.querySelector(link.href);
                        el?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-sm font-medium uppercase tracking-widest hover:text-accent transition-colors"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </nav>

              <div className="flex gap-6 items-center">
                <div className="hidden lg:flex gap-4">
                  {socialLinks.map((social, i) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="opacity-60 hover:opacity-100 transition-opacity"
                      title={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>

                <button
                  className="md:hidden p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </header>

            <motion.div
              initial={false}
              animate={isMenuOpen ? { x: 0 } : { x: "100%" }}
              className="fixed inset-0 bg-bg z-50 flex flex-col items-center justify-center gap-8 md:hidden"
            >
              <button
                className="absolute top-8 right-6 p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={32} />
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (link.type === "page") {
                      setCurrentPage("resume");
                    } else if (link.type === "external") {
                      window.location.href = link.href;
                    } else {
                      const el = document.querySelector(link.href);
                      el?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-4xl font-display font-bold uppercase tracking-tighter hover:text-accent"
                >
                  {link.name}
                </button>
              ))}
              <div className="flex gap-8 mt-8">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} className="text-accent">
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            <main id="main" className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
              <section className="min-h-[70vh] flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="text-accent font-display font-medium uppercase tracking-[0.2em] text-sm mb-6">
                    Full-Stack & Mobile Engineer | Cybersecurity Analyst
                  </h2>
                  <h1 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-display font-extrabold leading-[0.9] tracking-tighter mb-12">
                    HEY, I'M <br />
                    <span className="text-stroke">UCHENNA</span> <br />
                    EBUBE
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end"
                >
                  <div className="max-w-xl">
                    <p className="text-xl md:text-2xl text-fg/80 leading-relaxed font-light">
                      I design and build complete systems — from secure backend architectures and scalable APIs to native/cross-platform mobile apps for iOS and Android using Swift, Objective-C, Flutter, and React Native. I work across TypeScript, React, Python, and Django, crafting resilient, production-ready systems and intuitive user experiences.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 items-start md:items-end">
                    <a
                      href="mailto:listoncrypt@gmail.com"
                      className="group flex items-center gap-3 text-lg font-medium hover:text-accent transition-colors"
                    >
                      listoncrypt@gmail.com
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </a>
                    <a
                      href="https://t.me/listoncrypt"
                      className="group flex items-center gap-3 text-lg font-medium hover:text-accent transition-colors"
                    >
                      t.me/listoncrypt
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </a>
                  </div>
                </motion.div>
              </section>

              <section className="mt-40 grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-fg/10 pt-20">
                <div className="md:col-span-4">
                  <h3 className="text-sm uppercase tracking-widest text-fg/40 font-bold sticky top-32">
                    01. Background
                  </h3>
                </div>
                <div className="md:col-span-8 space-y-12">
                  <p className="text-2xl md:text-3xl leading-snug font-light">
                    I am a <span className="text-accent font-medium">Full-Stack & Mobile Engineer</span> and <span className="text-accent font-medium">Cybersecurity Analyst</span> who enjoys rapidly transforming ideas into functional products. Whether building native mobile applications with <span className="text-accent font-medium">Swift</span>, <span className="text-accent font-medium">Objective-C</span>, and <span className="text-accent font-medium">Kotlin</span>, cross-platform apps with <span className="text-accent font-medium">Flutter</span> and <span className="text-accent font-medium">React Native</span>, or engineering scalable backend infrastructure, I deliver clean, maintainable solutions from concept to deployment.
                  </p>
                  <p className="text-2xl md:text-3xl leading-snug font-light">
                    Currently, I serve as Lead Backend Developer at <span className="text-accent font-medium">Cyber Sentinel</span>, a security-focused project developing deepfake detection systems. I architect and maintain the core backend infrastructure using Django and Flask, ensuring scalability, secure authentication systems, encryption mechanisms, and real-time processing pipelines.
                  </p>
                  <p className="text-2xl md:text-3xl leading-snug font-light">
                    Previously, I worked as an Ethical Hacker (Red Team) at <span className="text-accent font-medium">Hakai Security</span>, where I conducted advanced penetration testing across corporate networks, cloud systems, and web applications. I developed automated reconnaissance and privilege escalation scripts in Python and Bash, simulated real-world attack scenarios, and delivered executive-level security reports aligned with compliance frameworks.
                  </p>
                  <p className="text-2xl md:text-3xl leading-snug font-light">
                    My engineering philosophy is simple: build fast, build secure, build systems that scale.
                  </p>
                </div>
              </section>

              <section id="work" className="mt-40 border-t border-fg/10 pt-20">
                <div className="flex justify-between items-end mb-20">
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-fg/40 font-bold mb-4">
                      02. What I Have Built
                    </h3>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tighter">
                      WHAT I HAVE <br />
                      <span className="text-stroke">BUILT.</span>
                    </h2>
                  </div>
                  <a href="#shelf" className="hidden md:flex items-center gap-2 text-accent font-bold hover:underline">
                    Explore the craft <ArrowRight size={16} />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Confirmedit.com – Secure Escrow Platform",
                      category: "Full-Stack Development",
                      description: "A solo-engineered escrow platform (confirmedit.com) designed for secure, transparent peer-to-peer transactions with automated dispute resolution.",
                      image: "https://i.postimg.cc/3Nf1Vms1/mockup-studio-image-3.png",
                      color: "bg-amber-500/10",
                      link: "https://confirmedit.com",
                      badges: ["AES-256", "JWT Auth", "Pen-Tested"]
                    },
                    {
                      title: "Ungodly ACHV – Web3 Engagement & Rewards Platform",
                      category: "Full-Stack Web3 Platform",
                      description: "An automated social growth and reward platform (ungodlyachv.com) where users earn by engaging, commenting, and liking X (Twitter) posts, helping Web3 projects build organic audiences.",
                      image: "/ungodlyachv.png",
                      color: "bg-cyan-500/10",
                      link: "https://www.ungodlyachv.com/",
                      badges: ["Web3", "Social Rewards", "X API", "Organic Growth"]
                    },
                    {
                      title: "Cyber Sentinel – Deepfake Detection Infrastructure",
                      category: "AI Security & Backend Architecture",
                      description: "Designed and built the backend infrastructure powering a deepfake detection platform. Implemented RESTful APIs, authentication systems, encrypted data handling, optimized relational database models (PostgreSQL/MySQL), and containerized deployment pipelines using Docker.",
                      image: "https://picsum.photos/seed/cyber-security/800/600",
                      color: "bg-emerald-500/10",
                      badges: ["Docker", "PostgreSQL", "Encryption"]
                    },
                    {
                      title: "Red Team Automation Toolkit",
                      category: "Offensive Security Engineering",
                      description: "Developed automated reconnaissance and privilege escalation scripts using Python and Bash to improve penetration testing efficiency and vulnerability discovery across enterprise networks.",
                      image: "https://picsum.photos/seed/hacking/800/600",
                      color: "bg-blue-500/10",
                      badges: ["Python", "Bash", "Red Team"]
                    },
                    {
                      title: "Secure API Architecture Framework",
                      category: "Backend Systems Design",
                      description: "Engineered scalable API systems using Django and FastAPI with JWT authentication, rate limiting, logging, monitoring integrations, and security hardening practices to ensure high availability and data integrity.",
                      image: "https://picsum.photos/seed/server-security/800/600",
                      color: "bg-purple-500/10",
                      badges: ["FastAPI", "JWT", "Scalable"]
                    }
                  ].map((project, i) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group cursor-none"
                    >
                      <div
                        className={`aspect-[4/3] overflow-hidden rounded-2xl mb-6 relative ${project.color} cursor-pointer`}
                        onClick={() => project.link && window.open(project.link, '_blank')}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-bg/20 group-hover:bg-transparent transition-colors" />
                      </div>
                      <div className="flex justify-between items-start">
                        <div
                          className="cursor-pointer"
                          onClick={() => project.link && window.open(project.link, '_blank')}
                        >
                          <span className="text-xs uppercase tracking-widest text-accent font-bold mb-2 block">
                            {project.category}
                          </span>
                          <h4 className="text-2xl font-display font-bold group-hover:text-accent transition-colors">
                            {project.title}
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.badges?.map((badge) => (
                              <span key={badge} className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-fg/5 border border-fg/10 opacity-60">
                                {badge}
                              </span>
                            ))}
                          </div>
                          <p className="text-fg/60 mt-3 max-w-sm">
                            {project.description}
                          </p>
                        </div>
                        <button
                          onClick={() => project.link && window.open(project.link, '_blank')}
                          className="w-12 h-12 rounded-full border border-fg/10 flex items-center justify-center group-hover:bg-fg group-hover:text-bg transition-all"
                        >
                          <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section id="contributions" className="mt-40 border-t border-fg/10 pt-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-fg/40 font-bold mb-4">
                      03. Open Source
                    </h3>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tighter">
                      CONTRIBUTIONS <br />
                      <span className="text-stroke">TO TOP PROJECTS.</span>
                    </h2>
                  </div>
                  <p className="max-w-md text-fg/60 text-lg">
                    Repositories I have contributed to — spanning backend systems, Web3 smart contracts, esports infrastructure, and more.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      repo: "StellarFlow-Network/stellarflow-backend",
                      tag: "Backend",
                      desc: "Contributed to the backend infrastructure of the StellarFlow decentralised network — TypeScript, REST API design, and database optimisations.",
                      href: "https://github.com/StellarFlow-Network/stellarflow-backend",
                      color: "text-sky-400",
                    },
                    {
                      repo: "etournity/etournity",
                      tag: "Esports",
                      desc: "Open-source esports tournament management platform — contributed backend API improvements and authentication hardening.",
                      href: "https://github.com/etournity/etournity",
                      color: "text-amber-400",
                    },
                    {
                      repo: "Stream-Scholar/Stream-Scholar-contracts",
                      tag: "Web3 / Rust",
                      desc: "Contributed to Rust-based smart contracts for the Stream Scholar decentralised scholarship protocol — security reviews and contract logic refinement.",
                      href: "https://github.com/Stream-Scholar/Stream-Scholar-contracts",
                      color: "text-emerald-400",
                    },
                    {
                      repo: "amina69/PetAd-backend",
                      tag: "Full-Stack",
                      desc: "Contributed to the PetAd platform backend — TypeScript API development, JWT authentication, and PostgreSQL schema work.",
                      href: "https://github.com/amina69/PetAd-backend",
                      color: "text-purple-400",
                    },
                    {
                      repo: "Alien-Protocol/Alien-Protocol",
                      tag: "Rust / Systems",
                      desc: "Contributed to the Alien Protocol Rust-based systems project — low-level code reviews, vulnerability assessment, and performance improvements.",
                      href: "https://github.com/Listoncrypt/Alien-Protocol",
                      color: "text-red-400",
                    },
                  ].map((item, i) => (
                    <motion.a
                      key={item.repo}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="group p-6 rounded-2xl border border-fg/10 bg-fg/[0.02] hover:bg-fg/[0.05] hover:border-accent/30 transition-all duration-300 flex flex-col gap-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className={`text-xs font-mono font-bold uppercase tracking-widest ${item.color}`}>
                          {item.tag}
                        </span>
                        <ExternalLink size={14} className="opacity-30 group-hover:opacity-100 group-hover:text-accent transition-all shrink-0" />
                      </div>
                      <h4 className="font-display font-bold text-lg leading-snug group-hover:text-accent transition-colors break-all">
                        {item.repo}
                      </h4>
                      <p className="text-fg/50 text-sm leading-relaxed flex-1">{item.desc}</p>
                      <span className="text-xs font-mono text-fg/30 group-hover:text-accent/60 transition-colors">
                        github.com/{item.repo}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </section>

              <section id="shelf" className="mt-40 border-t border-fg/10 pt-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-fg/40 font-bold mb-4">
                      04. Craft
                    </h3>
                    <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter">
                      THE <span className="text-stroke">CRAFT.</span> <br />
                      THINGS I USE.
                    </h2>
                  </div>
                  <p className="max-w-md text-fg/60 text-lg">
                    A curated collection of languages, frameworks, and tools that power my engineering workflow and cross-platform apps.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-10">
                  {shelfCategories.map((category) => {
                    const isSelected = selectedShelfCategory === category;
                    const count = category === "All"
                      ? shelfItems.length
                      : shelfItems.filter((item) => item.category === category).length;
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedShelfCategory(category);
                          setIsShelfExpanded(false);
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${isSelected
                            ? "bg-accent text-bg font-bold shadow-lg shadow-accent/20"
                            : "bg-fg/5 text-fg/70 hover:bg-fg/10 hover:text-fg border border-fg/10"
                          }`}
                      >
                        <span>{category}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-bg/20 text-bg" : "bg-fg/10 text-fg/50"
                          }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {(() => {
                  const filteredItems = selectedShelfCategory === "All"
                    ? shelfItems
                    : shelfItems.filter((item) => item.category === selectedShelfCategory);
                  const displayedItems = isShelfExpanded
                    ? filteredItems
                    : filteredItems.slice(0, INITIAL_SHELF_COUNT);

                  return (
                    <>
                      <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        <AnimatePresence mode="popLayout">
                          {displayedItems.map((item) => (
                            <motion.div
                              layout
                              key={item.name}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                              className="p-8 rounded-2xl border border-fg/5 bg-fg/[0.02] hover:bg-fg/[0.05] hover:border-accent/30 transition-all duration-300 group"
                            >
                              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center h-10">
                                {item.icon}
                              </div>
                              <h4 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">{item.name}</h4>
                              <span className="text-xs uppercase tracking-widest opacity-40 font-bold">
                                {item.type}
                              </span>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>

                      {filteredItems.length > INITIAL_SHELF_COUNT && (
                        <div className="flex justify-center mt-12">
                          <button
                            onClick={() => setIsShelfExpanded(!isShelfExpanded)}
                            className="px-8 py-3 rounded-full border border-fg/20 hover:border-accent bg-fg/5 hover:bg-accent hover:text-bg text-xs md:text-sm font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 group"
                          >
                            <span>
                              {isShelfExpanded
                                ? "Show Less"
                                : `Show More (${filteredItems.length - INITIAL_SHELF_COUNT} more)`}
                            </span>
                            <ArrowRight
                              size={16}
                              className={`transition-transform duration-300 ${isShelfExpanded ? "-rotate-90" : "rotate-90 group-hover:translate-y-0.5"
                                }`}
                            />
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </section>

              <section className="mt-40 py-40 border-t border-fg/10 text-center">
                <motion.div
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-6xl lg:text-8xl font-display font-extrabold tracking-tighter mb-12">
                    HAVE A PROPOSAL? <br />
                    <span className="text-stroke">LET'S TALK.</span>
                  </h2>
                  <a
                    href="mailto:listoncrypt@gmail.com"
                    className="inline-flex items-center gap-4 bg-accent text-bg px-10 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform active:scale-95"
                  >
                    Contact Me
                    <Send size={24} />
                  </a>
                </motion.div>
              </section>
            </main>

            <footer className="px-6 md:px-12 py-12 border-t border-fg/10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-sm opacity-40">
                © {new Date().getFullYear()} Uchenna Ebube. All rights reserved.
              </div>

              <div className="flex gap-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-sm font-bold tracking-widest hover:text-accent transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>

              <div className="flex gap-6 items-center">
                <span className="text-xs uppercase tracking-widest opacity-40">Built with</span>
                <div className="flex gap-4">
                  <span className="text-xs font-bold">REACT</span>
                  <span className="text-xs font-bold">TYPESCRIPT</span>
                  <span className="text-xs font-bold">TAILWIND</span>
                  <span className="text-xs font-bold">MOTION</span>
                </div>
              </div>
            </footer>

            <div className="bg-accent/10 border-t border-accent/20 py-2 overflow-hidden whitespace-nowrap no-print">
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-12 items-center text-[10px] font-mono uppercase tracking-widest text-accent/60"
              >
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex gap-12 items-center">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      System Status: Secure
                    </span>
                    <span>Firewall: Active</span>
                    <span>Threat Level: Low</span>
                    <span>Encrypted Tunnel: Established</span>
                    <span>Last Scan: {new Date().toLocaleTimeString()}</span>
                    <span className="opacity-30">|</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="resume"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Resume onBack={() => setCurrentPage("home")} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 w-12 h-12 md:w-14 md:h-14 bg-accent text-bg rounded-full flex items-center justify-center shadow-lg hover:shadow-accent/20 transition-shadow"
      >
        <TerminalIcon size={windowWidth < 768 ? 20 : 24} />
      </motion.button>

      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
