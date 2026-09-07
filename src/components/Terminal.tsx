import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMANDS: Record<string, string | (() => string)> = {
  help: 'Available commands: whoami, skills, projects, contact, clear, exit, date',
  whoami: 'Uchenna Ebube David | Full-Stack & Mobile Engineer (iOS & Android) & Cybersecurity Analyst. Building secure, scalable systems and native/cross-platform apps.',
  skills: 'Swift, Objective-C, Kotlin, Flutter, Dart, React Native, TypeScript, JavaScript, Python, Rust, Go, Java, C, Solidity, PHP, Ruby, Bash, SQL, React, Django, FastAPI, Docker, PostgreSQL, Kali Linux, OSCP.',
  projects: 'Confirmedit.com (Escrow), Ungodly ACHV (Social Rewards), Cyber Sentinel (Deepfake Detection), Red Team Toolkit, Secure API Framework.',
  contact: 'Email: listoncrypt@gmail.com | Telegram: t.me/listoncrypt',
  date: () => new Date().toLocaleString(),
  logs: () => {
    return 'Checking SSL certificate... OK\nScanning for vulnerabilities... None found\nEncrypting session data... Done\nSystem Integrity: 100%';
  },
  clear: 'CLEAR_COMMAND',
};

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output'; content: string }[]>([
    { type: 'output', content: 'Welcome to UE Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'input', content: cmd }];

    if (cmd === 'clear') {
      setHistory([]);
    } else if (cmd === 'exit') {
      onClose();
    } else if (COMMANDS[cmd]) {
      const output = typeof COMMANDS[cmd] === 'function' ? (COMMANDS[cmd] as Function)() : COMMANDS[cmd];
      setHistory([...newHistory, { type: 'output', content: output }]);
    } else {
      setHistory([...newHistory, { type: 'output', content: `Command not found: ${cmd}. Type "help" for assistance.` }]);
    }

    setInput('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          height: isMinimized ? '40px' : (windowWidth < 768 ? '350px' : '400px'),
          width: isMinimized ? '150px' : (windowWidth < 768 ? 'calc(100vw - 2rem)' : '500px')
        }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] bg-[#0c0c0c] border border-white/10 rounded-lg shadow-2xl overflow-hidden font-mono text-sm flex flex-col"
      >
        <div className="bg-white/5 px-4 py-2 flex justify-between items-center cursor-default select-none border-b border-white/5">
          <div className="flex items-center gap-2 opacity-60">
            <TerminalIcon size={14} />
            <span className="text-xs font-bold uppercase tracking-widest">UE_Terminal</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-accent transition-colors">
              {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
            </button>
            <button onClick={onClose} className="hover:text-red-500 transition-colors">
              <X size={14} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-2"
            >
              {history.map((line, i) => (
                <div key={i} className={line.type === 'input' ? 'text-accent' : 'text-white/70'}>
                  {line.type === 'input' ? '> ' : ''}{line.content}
                </div>
              ))}
            </div>

            <form onSubmit={handleCommand} className="p-4 pt-0 flex gap-2 items-center">
              <span className="text-accent font-bold">{'>'}</span>
              <input
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-white caret-accent text-base md:text-sm"
                spellCheck={false}
              />
            </form>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
