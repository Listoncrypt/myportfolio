import { motion } from "motion/react";
import { ArrowLeft, Mail, MapPin, Globe, Download, Phone, ExternalLink } from "lucide-react";

interface ResumeProps {
  onBack: () => void;
}

export default function Resume({ onBack }: ResumeProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white pb-20"
    >
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 no-print">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest hover:text-slate-500 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="hidden xs:inline">Back to Portfolio</span>
          <span className="xs:hidden">Back</span>
        </button>
        <div className="flex gap-2 md:gap-4">
          <button 
            onClick={() => window.location.href = "mailto:listoncrypt@gmail.com"}
            className="flex items-center gap-2 bg-slate-900 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold hover:bg-slate-800 transition-colors"
          >
            <Mail size={16} />
            Contact
          </button>
          <button 
            onClick={() => {
              window.focus();
              window.print();
            }}
            className="flex items-center gap-2 border border-slate-200 text-slate-900 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold hover:bg-slate-50 transition-colors"
          >
            <Download size={16} />
            <span className="hidden xs:inline">Print / Download</span>
            <span className="xs:hidden">Print</span>
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-16 print-container">
        <header className="border-b-2 border-slate-900 pb-10 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-display font-extrabold tracking-tighter mb-2">
                UCHENNA <br /> EBUBE DAVID
              </h1>
              <p className="text-xl font-medium text-slate-500 uppercase tracking-widest">
                Full-Stack & Mobile Engineer (iOS & Android) | Cybersecurity Analyst
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} /> Abuja, Nigeria
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} /> listoncrypt@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} /> https://t.me/listoncrypt
              </div>
            </div>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-400 mb-4">Professional Summary</h2>
          <p className="text-lg leading-relaxed text-slate-700">
            I design and build complete systems — from secure backend architecture and high-performance web interfaces to native and cross-platform mobile apps for iOS and Android using Swift, Objective-C, Flutter, and React Native. I work comfortably across TypeScript, React, Flutter, Python, and Django, building scalable APIs and intuitive user experiences. My cybersecurity background influences how I architect systems: security-first, resilient, and production-ready. I enjoy rapidly transforming ideas into functional products and engineering clean, maintainable solutions from concept to deployment.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1 space-y-10">
            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-400 mb-6">Core Technologies</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-900 mb-2">Languages</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">Swift, Objective-C, Kotlin, Dart, Java, TypeScript, JavaScript, Python, Rust, Go, C, Solidity, PHP, Ruby, Bash, SQL, HTML5</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-900 mb-2">Mobile & Frontend</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">iOS (Swift / Objective-C), Android (Kotlin / Java), Flutter, React Native, React, TypeScript, Tailwind CSS</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-900 mb-2">Backend</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">Django, FastAPI, Flask</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-900 mb-2">Databases</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">PostgreSQL, MySQL</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-900 mb-2">Security Tools</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">Kali Linux, Metasploit, Burp Suite, BloodHound, Mimikatz, Wireshark</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-900 mb-2">Infrastructure</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">Docker, GitHub, Linux, REST APIs, JWT, SIEM</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-400 mb-6">Competencies</h2>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>iOS & Android App Development (Native & Cross-Platform)</li>
                <li>Penetration Testing</li>
                <li>Red Team Operations</li>
                <li>Incident Response</li>
                <li>Vulnerability Assessment</li>
                <li>Secure API Architecture</li>
                <li>Encryption & Data Protection</li>
                <li>Risk Management</li>
                <li>Compliance Standards</li>
                <li>Log Analysis & Monitoring</li>
                <li>Performance Optimization</li>
                <li>System Design</li>
                <li>Threat Intelligence</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-400 mb-6">Education</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">University of Toronto (U of T)</h3>
                  <p className="text-xs text-slate-500">Cybersecurity Certificate</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">FUNAI Alex Ekwueme University</h3>
                  <p className="text-xs text-slate-500">Computer Science</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-400 mb-6">Certifications</h2>
              <div className="space-y-2">
                <p className="text-sm font-bold text-slate-900">OSCP</p>
                <p className="text-sm font-bold text-slate-900">SC-900 Security</p>
              </div>
            </section>
          </div>

          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-400 mb-8">Experience</h2>
              
              <div className="space-y-12">
                <div className="relative pl-8 border-l border-slate-200">
                  <div className="absolute top-0 left-[-5px] w-[10px] h-[10px] rounded-full bg-slate-900" />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Lead Backend Developer</h3>
                      <p className="text-slate-500 font-medium">Cyber Sentinel</p>
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Jun 2025 – Present</span>
                  </div>
                  <p className="text-sm italic text-slate-500 mb-4">Security-focused AI project developing deepfake detection systems.</p>
                  <ul className="text-sm text-slate-700 space-y-2 list-disc pl-4">
                    <li>Architected and built the core backend infrastructure using Django and Flask.</li>
                    <li>Designed secure RESTful APIs for web and mobile platforms.</li>
                    <li>Implemented authentication, authorization, and encryption systems.</li>
                    <li>Optimized relational database models (PostgreSQL/MySQL) for high-volume transactions.</li>
                    <li>Integrated logging and monitoring solutions to improve reliability and security visibility.</li>
                    <li>Deployed and maintained containerized services using Docker.</li>
                    <li>Collaborated with cybersecurity teams to embed security controls into the development lifecycle.</li>
                  </ul>
                </div>

                <div className="relative pl-8 border-l border-slate-200">
                  <div className="absolute top-0 left-[-5px] w-[10px] h-[10px] rounded-full bg-slate-300" />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Ethical Hacker | Red Team</h3>
                      <p className="text-slate-500 font-medium">Hakai Security</p>
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase">July 2023 – May 2025</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest">Portugal</p>
                  <ul className="text-sm text-slate-700 space-y-2 list-disc pl-4">
                    <li>Conducted advanced penetration testing across corporate networks, web applications, and cloud environments.</li>
                    <li>Led incident response operations for ransomware and phishing attacks.</li>
                    <li>Developed reconnaissance and privilege escalation scripts in Python and Bash.</li>
                    <li>Simulated sophisticated threat actor tactics to test enterprise defenses.</li>
                    <li>Delivered executive-level security reports with actionable remediation strategies.</li>
                    <li>Collaborated with blue teams to integrate Red Team findings into SIEM detection rules.</li>
                  </ul>
                </div>

                <div className="relative pl-8 border-l border-slate-200">
                  <div className="absolute top-0 left-[-5px] w-[10px] h-[10px] rounded-full bg-slate-300" />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Cybersecurity Intern</h3>
                      <p className="text-slate-500 font-medium">NexusSec Solutions</p>
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Jun 2023 – Aug 2024</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest">Lagos, Nigeria</p>
                  <ul className="text-sm text-slate-700 space-y-2 list-disc pl-4">
                    <li>Performed Active Directory security assessments across enterprise environments.</li>
                    <li>Automated vulnerability scanning and reporting workflows using Python.</li>
                    <li>Conducted network traffic analysis with Wireshark.</li>
                    <li>Assisted in incident response investigations and forensic documentation.</li>
                    <li>Configured SIEM tools to correlate security events and detect anomalies.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-400 mb-6">Reading List</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded flex items-center justify-center font-bold">WA</div>
                  <div>
                    <p className="text-sm font-bold">The Web Application Hacker’s Handbook</p>
                    <p className="text-xs text-slate-500">Dafydd Stuttard & Marcus Pinto</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded flex items-center justify-center font-bold">CC</div>
                  <div>
                    <p className="text-sm font-bold">Clean Code</p>
                    <p className="text-xs text-slate-500">Robert C. Martin</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded flex items-center justify-center font-bold">DA</div>
                  <div>
                    <p className="text-sm font-bold">Designing Data-Intensive Applications</p>
                    <p className="text-xs text-slate-500">Martin Kleppmann</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
