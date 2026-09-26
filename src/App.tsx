import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import CinematicLoader from './components/CinematicLoader';
import GlobalEnvironment from './components/environment/GlobalEnvironment';

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Loading State
  const [isLoaded, setIsLoaded] = useState(false);

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 }
    }
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 50, damping: 15, mass: 1 }
    }
  };

  // Scroll detection for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll for drawer or loader
  useEffect(() => {
    if (isDrawerOpen || !isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isDrawerOpen, isLoaded]);

  // Track mouse for custom cursor
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const scrollTo = (id: string) => {
    setIsDrawerOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Education', id: 'education' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/charan-kumar-0500bb34b', Icon: FaLinkedin },
    { name: 'GitHub', url: 'https://github.com/CHARANKUMARCHUKKA', Icon: FaGithub },
    { name: 'Instagram', url: 'https://www.instagram.com/charan_____ch/?__pwa=1', Icon: FaInstagram }
  ];

  const skills = [
    {
      category: 'Programming Languages',
      items: ['Python', 'C (Basic)'],
    },
    {
      category: 'CS Fundamentals',
      items: ['Data Structures & Algorithms (Learning)', 'Object-Oriented Programming (OOP)', 'Problem Solving', 'Time & Space Complexity'],
    },
    {
      category: 'Artificial Intelligence',
      items: ['AI Fundamentals', 'Machine Learning (Learning)', 'Generative AI (Learning)', 'Prompt Engineering'],
    },
    {
      category: 'Systems',
      items: ['Operating Systems (Learning)', 'Computer Networks (Learning)', 'DBMS (Learning)', 'System Design (Learning)'],
    },
    {
      category: 'Web Development',
      items: ['HTML5', 'CSS3', 'JavaScript (Learning)', 'React (Learning)'],
    },
    {
      category: 'Tools & Technologies',
      items: ['Git', 'GitHub', 'VS Code', 'Linux (Basic)'],
    },
    {
      category: 'Cloud & Infrastructure',
      items: ['Amazon Web Services (AWS)'],
    },
    {
      category: 'Soft Skills',
      items: ['Analytical Thinking', 'Continuous Learning', 'Team Collaboration', 'Communication', 'Adaptability'],
    }
  ];

  return (
    <div className="relative w-full bg-transparent font-hn text-cream sm:cursor-none selection:bg-cream selection:text-[#141414]">
      
      <GlobalEnvironment />

      {!isLoaded && (
        <CinematicLoader onComplete={() => setIsLoaded(true)} />
      )}

      {/* Custom Cursor (Desktop Only) */}
      <div 
        className="pointer-events-none fixed top-0 left-0 z-[100] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream mix-blend-difference transition-transform duration-300 ease-out hidden sm:block"
        style={{ 
          transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) scale(${isHovering ? 3.5 : 1})`,
        }}
      />

      <motion.div
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Header (z-50 Fixed) */}
        <motion.header 
          variants={fadeUpVariant}
          className={`fixed inset-x-0 top-0 z-50 flex items-start justify-between px-6 transition-colors duration-300 sm:px-10 ${scrolled ? 'bg-[#141414]/90 backdrop-blur-md py-4 border-b border-cream/5 shadow-xl' : 'pt-6 sm:pt-8 bg-transparent'}`}
        >
          <button 
            onClick={() => scrollTo('hero')}
            className="font-hn text-lg tracking-wide sm:cursor-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            CHARAN
          </button>
          
          {/* Desktop Nav Cluster */}
          <div className="hidden sm:flex items-start gap-16 lg:gap-24">
          <div className="flex flex-col gap-2 text-sm mt-1">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollTo(link.id)}
                className="group flex items-center justify-end gap-3 opacity-70 hover:opacity-100 hover:-translate-x-2 duration-300 transition-all sm:cursor-none text-right" 
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span className="tracking-widest uppercase text-xs">{link.name}</span>
              </button>
            ))}
          </div>
          
          <div className="flex flex-col gap-2 text-sm mt-1">
            {socialLinks.map((link) => (
              <a 
                href={link.url}
                target="_blank"
                rel="noreferrer"
                key={link.name} 
                className="group flex items-center gap-3 opacity-70 hover:opacity-100 hover:scale-110 hover:-translate-y-1 duration-300 transition-all sm:cursor-none" 
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <link.Icon size={16} className="transition-transform duration-300 group-hover:rotate-6" />
                <span className="tracking-wide">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Hamburger Menu Toggle (z-50 Fixed) */}
      <motion.button 
        variants={fadeUpVariant}
        className={`sm:hidden fixed right-6 top-6 z-50 flex h-10 w-10 flex-col items-center justify-center ${isDrawerOpen ? 'opacity-0 pointer-events-none' : ''}`}
        onClick={() => setIsDrawerOpen(true)}
        aria-label="Open menu"
      >
        <div className="relative h-4 w-6 drop-shadow-md">
          <span className={`absolute left-0 top-0 h-0.5 w-6 bg-cream transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${isDrawerOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`absolute left-0 top-[7px] h-0.5 w-6 bg-cream transition-opacity duration-300 ${isDrawerOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`absolute left-0 top-[14px] h-0.5 w-6 bg-cream transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${isDrawerOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </div>
      </motion.button>

      {/* Hero Section */}
      <section id="hero" className="relative h-[100dvh] w-full overflow-hidden">
        {/* Background Image (z-default) */}
        <img
          src="/my-image.jpg"
          alt="Background"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${isLoaded ? 'scale-100 blur-0 opacity-100' : 'scale-110 blur-sm opacity-0'}`}
        />
        
        {/* Dark gradient overlay for readability when scrolling up */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent pointer-events-none z-[5]" />

        {/* Marquee Name (z-10) */}
        <motion.div 
          variants={fadeUpVariant}
          className="absolute inset-x-0 top-[16vh] sm:top-[14vh] z-10 overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] sm:text-[26vh] leading-none text-cream transition-all duration-700 hover:text-transparent hover:[-webkit-text-stroke:3px_#efeee9]">
            <span className="pr-[6vw]">CHARAN KUMAR CHUKKA&nbsp;&mdash;&nbsp;</span>
            <span className="pr-[6vw]">CHARAN KUMAR CHUKKA&nbsp;&mdash;&nbsp;</span>
          </div>
        </motion.div>

        {/* Cream Rule (z-10) */}
        <motion.div 
          variants={fadeUpVariant}
          className="absolute inset-x-6 sm:inset-x-10 bottom-[5.5rem] sm:bottom-28 z-10 h-0.5 bg-cream origin-left"
        />
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen w-full flex items-center justify-center px-6 py-24 sm:px-20 z-20">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          <h2 
            className="text-4xl sm:text-6xl uppercase tracking-[0.1em] font-hn border-b border-cream/20 pb-6 inline-block"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            About Me
          </h2>
          <div className="flex flex-col gap-8 text-lg sm:text-2xl leading-relaxed text-cream/80">
            <p>
              I'm a Computer Science Engineering student with a strong passion for Artificial Intelligence, System Design, and Software Development. My goal is to build intelligent, scalable, and high-performance systems that solve real-world problems.
            </p>
            <p>
              Currently, I'm strengthening my foundations in Python, Data Structures & Algorithms, Object-Oriented Programming, and Computer Science fundamentals while exploring the fields of Machine Learning, Generative AI, Backend Development, Cloud Computing, and Distributed Systems.
            </p>
            <p>
              I believe in continuous learning and consistent practice. Every project I build helps me improve my problem-solving skills, write cleaner code, and understand how modern software systems work behind the scenes.
            </p>
            <p>
              I'm actively working toward becoming an AI & Systems Engineer, creating impactful applications that combine intelligent decision-making with robust software architecture. My long-term vision is to contribute to innovative technologies that make a meaningful difference in people's lives.
            </p>
          </div>
          
          {/* Download Resume Button */}
          <div className="mt-4">
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cream/[0.05] border border-cream/20 text-cream font-hn tracking-widest text-sm uppercase hover:bg-cream hover:text-[#141414] transition-all duration-300 group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span>Download Resume</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="relative min-h-[40vh] w-full flex items-center justify-center px-6 pb-24 sm:px-20 z-20">
        <div className="max-w-4xl w-full mx-auto flex flex-col sm:flex-row gap-12 sm:gap-24 items-start border-t border-cream/10 pt-24">
          <h2 
            className="text-4xl sm:text-6xl uppercase tracking-[0.1em] font-hn shrink-0"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Education
          </h2>
          <div className="flex flex-col gap-6 w-full mt-2">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-cream/10 pb-8">
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl sm:text-3xl font-hn text-cream/90">Bachelor of Technology (B.Tech)</h3>
                <span className="text-cream/50 text-lg uppercase tracking-widest leading-relaxed max-w-sm">
                  Computer Science & Engineering
                </span>
              </div>
              <div className="text-cream/40 tracking-widest uppercase text-sm border border-cream/10 rounded-full px-5 py-2.5 self-start shrink-0 whitespace-nowrap">
                2024 &mdash; 2028 (Expected)
              </div>
            </div>
            <div className="flex items-center gap-4 text-xl sm:text-2xl text-cream/70 pt-2">
              <div className="h-2 w-2 rounded-full bg-cream/40 shrink-0" />
              Andhra University
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="relative min-h-[30vh] w-full flex items-center justify-center px-6 pb-24 sm:px-20 z-20">
        <div className="max-w-4xl w-full mx-auto flex flex-col sm:flex-row gap-12 sm:gap-24 items-start border-t border-cream/10 pt-24">
          <h2 
            className="text-4xl sm:text-6xl uppercase tracking-[0.1em] font-hn shrink-0"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Licenses &<br/>Certifications
          </h2>
          <div className="flex flex-col gap-6 w-full mt-2">
            
            {/* Certificate 1 */}
            <a 
              href="/CLOUD%20PRACTITIONER%20IN%20AWS.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="group flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-cream/10 pb-8 transition-colors hover:border-cream/40 cursor-none"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl sm:text-3xl font-hn text-cream/90 group-hover:text-cream transition-colors">AWS Certified Cloud Practitioner</h3>
                <span className="text-cream/50 text-lg uppercase tracking-widest leading-relaxed max-w-sm flex items-center gap-2">
                  Amazon Web Services <svg className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </span>
              </div>
              <div className="text-cream/40 tracking-widest uppercase text-sm border border-cream/10 rounded-full px-5 py-2.5 self-start shrink-0 whitespace-nowrap group-hover:border-cream/30 transition-colors">
                View Certificate
              </div>
            </a>

            {/* Certificate 2 */}
            <a 
              href="/Cloud%20computing%20with%20AWS%20Training.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="group flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-cream/10 pb-8 transition-colors hover:border-cream/40 cursor-none"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl sm:text-3xl font-hn text-cream/90 group-hover:text-cream transition-colors">Cloud Computing with AWS</h3>
                <span className="text-cream/50 text-lg uppercase tracking-widest leading-relaxed max-w-sm flex items-center gap-2">
                  Training Certificate <svg className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </span>
              </div>
              <div className="text-cream/40 tracking-widest uppercase text-sm border border-cream/10 rounded-full px-5 py-2.5 self-start shrink-0 whitespace-nowrap group-hover:border-cream/30 transition-colors">
                View Certificate
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 sm:px-20 z-20">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-16">
          <div className="flex justify-between items-end border-b border-cream/20 pb-6">
            <h2 
              className="text-4xl sm:text-6xl uppercase tracking-[0.1em] font-hn"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Skills & Tech
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col gap-6 p-8 rounded-2xl bg-cream/[0.02] border border-cream/5 hover:bg-cream/[0.04] hover:border-cream/20 transition-all duration-500"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <h3 className="text-xl uppercase tracking-widest text-cream/50 group-hover:text-cream transition-colors duration-500">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((item, i) => (
                    <span 
                      key={i} 
                      className="px-4 py-2 rounded-full text-sm bg-[#141414] border border-cream/10 text-cream/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section (Coming Soon) */}
      <section id="projects" className="relative min-h-[50vh] w-full flex flex-col items-center justify-center px-6 py-24 sm:px-20 z-20">
        <div 
          className="max-w-3xl w-full mx-auto flex flex-col items-center text-center gap-8 p-12 sm:p-20 rounded-3xl border border-cream/10 bg-cream/[0.02]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl sm:text-5xl uppercase tracking-[0.1em] font-hn text-cream/80">
              Projects
            </h2>
            <div className="h-0.5 w-16 bg-cream/20 mx-auto rounded-full" />
          </div>
          <p className="text-lg sm:text-xl text-cream/50 max-w-lg leading-relaxed">
            I am currently in the lab actively building out my first major projects. Case studies and technical deep-dives will be published here soon.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative w-full flex items-center justify-center px-6 py-32 z-20 bg-black">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-10">
          <h2 className="text-4xl sm:text-6xl uppercase tracking-[0.1em] font-hn text-cream">
            Let's Connect
          </h2>
          <p className="text-lg text-cream/60">
            Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
          </p>
          <a 
            href="mailto:charan21003@gmail.com" 
            className="group mt-4 px-8 py-4 rounded-full bg-cream text-[#141414] font-hn uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-cream/10 py-12 px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between text-sm text-cream/40">
        <div>&copy; 2026 Charan Kumar Chukka. All rights reserved.</div>
        <div className="mt-4 sm:mt-0">Designed for the Future.</div>
      </footer>

      {/* Mobile Drawer Overlay */}
      <button 
        className={`sm:hidden fixed right-6 top-6 z-[60] flex h-10 w-10 items-center justify-center transition-all duration-300 ${isDrawerOpen ? 'rotate-0 opacity-100 delay-300' : 'rotate-90 opacity-0 pointer-events-none'}`}
        onClick={() => setIsDrawerOpen(false)}
        aria-label="Close menu"
      >
        <X size={26} strokeWidth={1.5} className="text-cream" />
      </button>

      {/* Mobile Drawer */}
      <div className="sm:hidden">
        {/* Backdrop (Frosted Glass) */}
        <div 
          className={`fixed inset-0 z-[55] bg-black/60 backdrop-blur-md transition-opacity duration-500 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsDrawerOpen(false)}
        />
        
        {/* Panel (Glassmorphism) */}
        <div 
          className={`fixed inset-y-0 right-0 z-[55] w-[85%] max-w-sm bg-black/50 backdrop-blur-xl border-l border-cream/10 px-8 py-10 transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] overflow-y-auto ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="mt-16 flex flex-col gap-12">
            
            {/* Site Navigation */}
            <div>
              <div className={`text-cream/50 uppercase tracking-[0.2em] text-xs mb-8 transition-all duration-500 ${isDrawerOpen ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-4 opacity-0'}`}>
                Navigation
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <button 
                    onClick={() => scrollTo(link.id)}
                    key={link.name} 
                    className={`text-left text-4xl font-hn text-cream transition-all duration-500 ease-out hover:text-white ${isDrawerOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    style={{ transitionDelay: isDrawerOpen ? `${300 + i * 80}ms` : '0ms' }}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div className={`text-cream/50 uppercase tracking-[0.2em] text-xs mb-8 transition-all duration-500 ${isDrawerOpen ? 'translate-y-0 opacity-100 delay-500' : 'translate-y-4 opacity-0'}`}>
                Find Me
              </div>
              <div className="flex flex-col gap-6">
                {socialLinks.map((link, i) => (
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    key={link.name} 
                    className={`group flex items-center gap-5 text-2xl font-hn text-cream transition-all duration-500 ease-out hover:text-white ${isDrawerOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    style={{ transitionDelay: isDrawerOpen ? `${500 + i * 80}ms` : '0ms' }}
                  >
                    <div className="p-3 rounded-full bg-cream/5 transition-transform duration-300 group-hover:bg-cream/20 group-hover:rotate-6 group-hover:scale-110">
                      <link.Icon size={24} />
                    </div>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      </motion.div>
    </div>
  );
}
