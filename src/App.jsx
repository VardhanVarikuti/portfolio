import { useState, useEffect, useCallback } from 'react';
import profileImg from './assets/profile.png';
import resumeFile from './assets/resume.pdf';
import './index.css';

/* ===========================
   DATA
   =========================== */

const roles = [
  'AI Engineer',
  'ML Engineer',
  'Data Scientist',
  'Agentic AI Engineer',
  'Data Analyst',
  'Business Analyst',
];

const HoverPreview = ({ active, preview, mousePos }) => {
  return (
    <div className="hover-preview-container">
      <div
        className={`hover-preview ${active ? 'visible' : ''}`}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="hover-preview-img" />
        ) : (
          <div className="hover-preview-placeholder">Preview Image<br />(Coming Soon)</div>
        )}
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      const isHoverable =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null;
      setActive(isHoverable);
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div
      className={`custom-cursor ${active ? 'active' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    />
  );
};

const projects = [
  {
    id: 1,
    emoji: '📊',
    visual: 'AI BI Agent',
    visualSub: 'Agentic AI',
    title: 'AI-Powered Business Intelligence Agent',
    highlight: 'Automated SQL generation and insights, reducing analysis time by 80%',
    problem: 'Business stakeholders struggle to extract insights from data without technical SQL knowledge, leading to delays and dependency on data teams.',
    desc: 'Built an agentic AI system that converts natural language queries into validated SQL with 95% accuracy. Integrated query validation, schema understanding, and context-aware reasoning using LLMs to automate 50+ manual reports, reducing data dependency significantly.',
    tags: ['Agentic AI', 'NL to SQL', 'Automation', 'LLM Systems'],
    tech: ['Python', 'PostgreSQL', 'LangChain', 'ChromaDB', 'Groq API', 'Pandas'],
    github: 'https://github.com/VardhanVarikuti/ai-bi-agent',
    preview: 'src/assets/ai-bi.png'
  },
  {
    id: 2,
    emoji: '🧠',
    visual: 'Customer Segmentation',
    visualSub: 'Machine Learning',
    title: 'Customer Segmentation using RFM & Clustering',
    highlight: 'Segmented customers into actionable groups for targeted marketing strategies',
    problem: 'Businesses often lack clarity on customer behavior, making it difficult to target high-value users and optimize marketing efforts.',
    desc: 'Performed RFM analysis on customer transaction data and applied K-Means clustering to identify 4 distinct behavioral segments. Analyzed behavior for 10k+ users to identify high-value clusters, enabling data-driven marketing and optimized retention strategies.',
    tags: ['Clustering', 'RFM Analysis', 'Customer Analytics', 'Segmentation'],
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
    github: 'https://github.com/VardhanVarikuti/customer-segmentation-retail',
    preview: 'src/assets/segmentation.png'
  },
  {
    id: 3,
    emoji: '📈',
    visual: 'Stock Market Analytics',
    visualSub: 'Business Intelligence',
    title: 'Real-Time Stock Market Analytics Dashboard',
    highlight: 'Built an interactive dashboard to analyze stock trends and market sentiment with 5s update intervals',
    problem: 'Stock market data is often complex and difficult to interpret, making it challenging for analysts and stakeholders to quickly identify trends, volatility, and trading patterns.',
    desc: 'Developed a real-time Power BI dashboard tracking 15+ critical KPIs like bullish/bearish trends and volatility. Engineered automated data pipelines with Power Query to refresh at 5-second intervals, providing deep analysis of 12 months of historical and live market trends.',
    tags: ['Stock Analysis', 'Business Intelligence', 'Data Visualization', 'KPI Analysis'],
    tech: ['Power BI', 'DAX', 'Power Query'],
    github: 'https://github.com/VardhanVarikuti/Real-Time-Stock-Market-Analytics-Dashboard',
    preview: ''
  },
  {
    id: 4,
    emoji: '🚴',
    visual: 'Bicycle Dashboard',
    visualSub: 'Business Analysis',
    title: 'Bicycle Sales Dashboard using Excel & DAX',
    highlight: 'Derived actionable insights from $2M+ sales data to support business decision-making',
    problem: 'Businesses often struggle to interpret raw sales data and identify meaningful trends for improving performance and strategy.',
    desc: 'Developed a comprehensive dashboard using Excel and DAX to analyze over $2M in sales data across diverse segments. Identified 5 key actionable growth insights and automated the reporting workflow, reducing monthly reporting and analysis time by 60%.',
    tags: ['Dashboarding', 'Data Analysis', 'DAX', 'Business Insights'],
    tech: ['Excel', 'DAX', 'PowerPoint'],
    github: 'https://github.com/VardhanVarikuti/bicycle-dashboard',
    preview: 'src/assets/bicycle.png'
  }
];

const techStack = {
  'Languages': [
    { name: 'Python', icon: 'logos:python' },
    { name: 'SQL', icon: 'logos:postgresql' },
    { name: 'C++', icon: 'logos:c-plusplus' }
  ],
  'Libraries & Frameworks': [
    { name: 'Scikit-learn', icon: 'devicon:scikitlearn' },
    { name: 'TensorFlow', icon: 'logos:tensorflow' },
    { name: 'PyTorch', icon: 'logos:pytorch-icon' },
    { name: 'Pandas', icon: 'logos:pandas-icon' },
    { name: 'NumPy', icon: 'logos:numpy' },
    { name: 'Matplotlib', icon: 'logos:matplotlib-icon' },
    { name: 'Seaborn', icon: 'devicon:seaborn' },
    { name: 'Plotly', icon: 'devicon:plotly' },
    { name: 'FastAPI', icon: 'logos:fastapi-icon' },
    { name: 'Flask', icon: 'simple-icons:flask' },
    { name: 'Streamlit', icon: 'logos:streamlit' },
    { name: 'LangChain', icon: 'simple-icons:langchain' },
    { name: 'LangGraph', icon: 'simple-icons:langchain' },
    { name: 'OpenCV', icon: 'logos:opencv' },
    { name: 'Keras', icon: 'devicon:keras' }
  ],
  'Tools & Platforms': [
    { name: 'Git', icon: 'logos:git-icon' },
    { name: 'Docker', icon: 'logos:docker-icon' },
    { name: 'AWS', icon: 'logos:aws' },
    { name: 'Jupyter', icon: 'logos:jupyter' },
    { name: 'VS Code', icon: 'logos:visual-studio-code' },
    { name: 'Linux', icon: 'logos:linux-tux' },
    { name: 'MongoDB', icon: 'logos:mongodb-icon' },
    { name: 'PostgreSQL', icon: 'logos:postgresql' },
    { name: 'Power BI', icon: 'logos:microsoft-power-bi' },
    { name: 'Excel', icon: 'vscode-icons:file-type-excel' },
    { name: 'Tableau', icon: 'logos:tableau-icon' },
    { name: 'GitHub', icon: 'logos:github-icon' },
    { name: 'Postman', icon: 'logos:postman-icon' }
  ],
};

const certifications = [
  {
    icon: '💻',
    title: 'Python (Basic)',
    org: 'HackerRank',
    preview: 'src/assets/py basic.png'
  },
  {
    icon: 'logos:hackerrank',
    title: 'SQL (Basic)',
    org: 'HackerRank',
    preview: 'src/assets/sql basic.png'
  },
  {
    icon: 'logos:hackerrank',
    title: 'SQL (Intermediate)',
    org: 'HackerRank',
    preview: 'src/assets/sql inter.png'
  },
  {
    icon: 'logos:hackerrank',
    title: 'Problem Solving (Intermediate)',
    org: 'HackerRank',
    preview: 'src/assets/pro inter.png'
  },
  {
    icon: 'mdi:security-network',
    title: 'Privacy and Security in Online Social Media',
    org: 'NPTEL',
    preview: 'src/assets/nptel.png'
  },
  {
    icon: 'logos:google-icon',
    title: 'The Bits and Bytes of Computer Networking',
    org: 'Google · Coursera',
    preview: 'src/assets/bits and bytes.png'
  }

];

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'services', label: 'Skills' },
  { id: 'tech', label: 'Stack' },
  { id: 'certs', label: 'Certs' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const education = [
  {
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    school: 'Lovely Professional University',
    city: 'Jalandhar',
    cgpa: '8.2',
    year: '2023 — 2027',
    status: 'Expected'
  },
  {
    degree: 'Intermediate (MPC)',
    school: 'Narayana Junior College',
    city: 'Vijayawada',
    percentage: '78%',
    year: '2020 — 2022',
    status: 'Completed'
  }
];

/* ===========================
   SVG ICONS
   =========================== */

const GithubSVG = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInSVG = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailSVG = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ArrowUpSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const GridSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 16, height: 16 }}>
    <path d="M4 12h16M12 4v16M8 8l8 8M16 8l-8 8" />
  </svg>
);

/* ===========================
   SCROLL PROGRESS
   =========================== */

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(h > 0 ? (s / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

/* ===========================
   TOP BAR
   =========================== */

function TopBar({ activeSection, theme, toggle, roleIdx }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navTo = useCallback((id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <nav className="topbar">
      <div className="topbar-left">
        <GridSVG /> Vardhan Varikuti
      </div>

      <div className={`topbar-center${mobileOpen ? ' open' : ''}`}>
        {navLinks.map((l) => (
          <a
            key={l.id}
            className={activeSection === l.id ? 'active' : ''}
            href={`#${l.id}`}
            onClick={(e) => { e.preventDefault(); navTo(l.id); }}
          >{l.label}</a>
        ))}
      </div>

      <div className="topbar-right">
        <span className="topbar-label" key={roleIdx}>{roles[roleIdx]}</span>
        <button className="theme-btn" onClick={toggle} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button
          className={`mobile-toggle${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

/* ===========================
   SPLASH SCREEN — Full-screen name on load
   =========================== */

const splashNames = [
  'Vardhan Varikuti',
  'వర్ధన్ వరికూటి',
  'वर्धन वरीकूटी',
  'VARDHAN VARIKUTI',
];

/* ===========================
   HERO — Multilingual greeting + photo + uni bar
   =========================== */

const greetings = [
  { text: 'Hello,', sub: 'English' },
  { text: 'నమస్కారం,', sub: 'Telugu' },
  { text: 'नमस्ते,', sub: 'Hindi' },
  { text: 'Bonjour,', sub: 'French' },
  { text: 'নমস্কাৰ,', sub: 'Assamese' },
  { text: 'Hola,', sub: 'Spanish' },
  { text: 'നമസ്കാരം,', sub: 'Malayalam' },
  { text: 'こんにちは,', sub: 'Japanese' },
  { text: 'Привет,', sub: 'Russian' },
  { text: 'ನಮಸ್ಕಾರ,', sub: 'Kannada' },
  { text: '你好,', sub: 'Chinese' },
  { text: 'வணக்கம்,', sub: 'Tamil' },
  { text: 'Ciao,', sub: 'Italian' },
  { text: '안녕하세요,', sub: 'Korean' },
  { text: 'مرحبا,', sub: 'Arabic' },
  { text: 'Olá,', sub: 'Portuguese' },
];

const Hero = ({ splashPhase, splashName, roleIdx, setIsResumeOpen }) => {
  const [greetIdx, setGreetIdx] = useState(0);
  const isDone = splashPhase === 'done';
  const isCenter = splashPhase === 'cycling';

  useEffect(() => {
    if (!isDone) return;
    const t = setInterval(() => {
      setGreetIdx((p) => (p + 1) % greetings.length);
    }, 2200);
    return () => clearInterval(t);
  }, [isDone]);

  return (
    <section className="hero" id="hero">
      <div className={`hero-content-fade ${isDone ? 'visible' : ''}`}>
        <div className="main flex-grow">
          <div className="hero-inner">
            {/* Left side — greeting + tagline */}
            <div className="hero-left">
              <div className={`hero-tagline${isDone ? ' visible' : ''}`}>
                <div className="hero-greeting-block">
                  <span className="hero-greeting-text" key={greetIdx}>
                    {greetings[greetIdx].text}
                  </span>
                </div>
                <h1 className="tagline-main">
                  I build<br />
                  intelligent systems<br />
                  that turn data into
                  decisions
                </h1>
              </div>

              <div className={`hero-ctas-row${isDone ? ' visible' : ''}`}>
                <a href="#projects" className="btn-pill btn-pill-filled">↓ View Work</a>
                <button 
                  onClick={() => setIsResumeOpen(true)} 
                  className="btn-pill"
                  style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Resume
                </button>
                <a href="https://github.com/VardhanVarikuti" target="_blank" rel="noopener noreferrer"
                  className="btn-pill" style={{ padding: '11px 14px' }}><GithubSVG /></a>
                <a href="https://www.linkedin.com/in/vardhan-varikuti" target="_blank" rel="noopener noreferrer"
                  className="btn-pill" style={{ padding: '11px 14px' }}><LinkedInSVG /></a>
              </div>
            </div>

            {/* Right side — profile photo */}
            <div className={`hero-right${isDone ? ' visible' : ''}`}>
              <div className="hero-photo-container">
                <img src={profileImg} alt="Vardhan Varikuti" className="hero-photo" />
              </div>
            </div>
          </div>
        </div>

        {/* White status bar — role + university + name */}
        <div className={`hero-status-bar${isDone ? ' visible' : ''}`}>
          <div className="hero-status-bar-inner">
            <span className="hero-status-left" key={roleIdx}>
              {roles[roleIdx]}
            </span>
            <span className="hero-status-center">B.Tech @ LPU, Punjab</span>

          </div>
        </div>
      </div>

      <div className={`hero-watermark ${isCenter ? 'splash-center' : ''}`}>{splashName}</div>
    </section>
  );
}

/* ===========================
   MARQUEE
   =========================== */

function Marquee() {
  const items = roles.flatMap((r) => [r, '•']);
  // Duplicate for seamless loop
  const all = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {all.map((item, i) =>
          item === '•' ? (
            <span key={i} className="marquee-item"><span className="dot" /></span>
          ) : (
            <span key={i} className="marquee-item">{item}</span>
          )
        )}
      </div>
    </div>
  );
}

/* ===========================
   ABOUT
   =========================== */

function About() {
  return (
    <section className="about-section" id="about">
      <div className="main">
        <div className="section-bar reveal">
          <span className="section-bar-label">© Personal Profile</span>
          <span className="section-bar-label">About Me</span>
        </div>

        <p className="about-text reveal d1">
          I&apos;m an engineer who builds{' '}
          <span className="dim">intelligent systems at the intersection of</span>{' '}
          machine learning, agentic AI, and data analysis
          <span className="dim">
            . I care about solutions that actually ship{' '}
          </span>
          measuring outcomes that matter
          <span className="dim">, not just building projects.</span>
        </p>
      </div>
    </section>
  );
}

/* ===========================
   PROJECTS
   =========================== */

function Projects({ setHoveredPreview }) {
  return (
    <section className="projects-section" id="projects">
      <div className="main">
        <div className="section-bar reveal">
          <span className="section-bar-label">© Selected Work</span>
          <span className="section-bar-label">Case Studies</span>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`project-card reveal d${(i % 4) + 1}`}
              onMouseEnter={() => setHoveredPreview({ active: true, img: p.preview })}
              onMouseLeave={() => setHoveredPreview({ active: false, img: null })}
            >
              <div className="project-visual">
                <div className="project-visual-inner">
                  <div className="project-visual-emoji">{p.emoji}</div>
                  <div className="project-visual-title">{p.visual}</div>
                  <div className="project-visual-sub">{p.visualSub}</div>
                </div>
              </div>

              <div className="project-info">
                <h3 className="project-info-title">{p.title}</h3>

                <div className="project-tags-row">
                  {p.tags.map((t) => (
                    <span key={t} className="project-tag-item">{t}</span>
                  ))}
                </div>

                <p className="project-desc">{p.desc}</p>

                <div className="project-link-row">
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    className="project-link-btn">
                    View Code →
                  </a>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    {p.tech.join(' · ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   SERVICES (What I Do)
   =========================== */

function Services() {
  const items = [
    { num: '01', title: 'Machine Learning', desc: 'Building predictive models and intelligent systems — from regression and classification to deep learning pipelines deployed at scale.' },
    { num: '02', title: 'Data Analysis', desc: 'Extracting actionable insights from complex datasets using statistical methods, visualization, and exploratory analysis to drive informed decisions.' },
    { num: '03', title: 'Agentic AI', desc: 'Designing autonomous AI agents and multi-step workflows that reason, plan, and execute tasks with minimal human intervention.' },
    { num: '04', title: 'Business Analysis', desc: 'Translating business problems into data-driven solutions — from stakeholder analysis to KPI dashboards and strategic recommendations.' },
  ];

  return (
    <section className="services-section" id="services">
      <div className="main">
        <div className="section-bar reveal">
          <span className="section-bar-label">© Expertise</span>
          <span className="section-bar-label">What I Do</span>
        </div>

        <p className="services-statement reveal d1">
          From raw data to{' '}
          <span className="dim">autonomous systems —</span>{' '}
          I build solutions across the full intelligence stack
          <span className="dim">, always with a bias toward impact.</span>
        </p>

        <div className="services-list reveal d2">
          {items.map((s) => (
            <div key={s.num} className="service-item">
              <div className="service-item-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   TECH STACK
   =========================== */

function TechStack() {
  return (
    <section className="tech-section" id="tech">
      <div className="main">
        <div className="section-bar reveal">
          <span className="section-bar-label">© Tech Stack</span>
          <span className="section-bar-label">Tools of the Trade</span>
        </div>

        <p className="tech-statement reveal d1">
          The technologies I use to{' '}
          <span className="dim">build, analyze, and deploy</span>{' '}
          intelligent systems.
        </p>

        <div className="tech-groups">
          {Object.entries(techStack).map(([category, items], ci) => (
            <div key={category} className={`reveal d${ci + 1}`}>
              <div className="tech-group-label">{category}</div>
              <div className="tech-row">
                {items.map((item) => (
                  <span key={item.name} className="tech-chip">
                    <iconify-icon icon={item.icon} />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   CERTIFICATIONS
   =========================== */

function Certifications({ setHoveredPreview }) {
  return (
    <section className="certs-section" id="certs">
      <div className="main">
        <div className="section-bar reveal">
          <span className="section-bar-label">© Credentials</span>
          <span className="section-bar-label">Certificates</span>
        </div>

        <div className="certs-list reveal d1">
          {certifications.map((c) => (
            <div
              key={c.title}
              className="cert-row"
              onMouseEnter={() => setHoveredPreview({ active: true, img: c.preview })}
              onMouseLeave={() => setHoveredPreview({ active: false, img: null })}
            >
              <div className="cert-row-icon">
                <iconify-icon icon={c.icon} style={{ fontSize: '1.2rem' }} />
              </div>
              <div className="cert-row-info">
                <h3>{c.title}</h3>
                <p>{c.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   EDUCATION
   =========================== */

function Education() {
  return (
    <section className="education-section" id="education">
      <div className="main">
        <div className="section-bar reveal">
          <span className="section-bar-label">© Personal Journey</span>
          <span className="section-bar-label">Education</span>
        </div>

        <div className="education-list reveal d1">
          {education.map((e) => (
            <div key={e.degree} className="edu-row">
              <div className="edu-row-info">

                <div className="edu-row-header">
                  <h3>{e.degree}</h3>
                  <span className="edu-year">{e.year}</span>
                </div>

                <p className="edu-school">
                  {e.school}, {e.city}
                  <span className="edu-status"> • {e.status}</span>
                </p>
                <div className="edu-extra">
                  {e.cgpa && <span>CGPA: {e.cgpa}</span>}
                  {e.percentage && <span>Percentage: {e.percentage}</span>}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   CONTACT
   =========================== */

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="main">
        <div className="section-bar reveal">
          <span className="section-bar-label">© Contact</span>
          <span className="section-bar-label">Get in Touch</span>
        </div>

        <h2 className="contact-heading reveal d1">
          Interested in working together,{' '}
          <span className="serif-italic">discussing ML,</span>{' '}
          or building something cool?
        </h2>

        <div className="contact-links reveal d2">
          <a href="mailto:varikutivardhan@gmail.com?subject=Let's%20Connect&body=Hi%20Vardhan" className="contact-link">
            <MailSVG /> Email Me
          </a>
          <a href="https://github.com/VardhanVarikuti" target="_blank" rel="noopener noreferrer" className="contact-link">
            <GithubSVG /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/vardhan-varikuti/" target="_blank" rel="noopener noreferrer" className="contact-link">
            <LinkedInSVG /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===========================
   FOOTER
   =========================== */

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <button className="back-to-top" onClick={scrollToTop}>
        <ArrowUpSVG /> Back to Top
      </button>
      <div className="footer-year">©{new Date().getFullYear()}</div>
      <p className="footer-credit">
        Designed & built by <a href="#">Vardhan Varikuti</a>
      </p>
    </footer>
  );
}

/* ===========================
   APP
   =========================== */

function App() {
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined' ? (localStorage.getItem('portfolio-theme') || 'dark') : 'dark'
  );
  const [activeSection, setActiveSection] = useState('hero');
  const [splashPhase, setSplashPhase] = useState('cycling'); // 'cycling' | 'moving' | 'done'
  const [nameIdx, setNameIdx] = useState(0);
  const [roleIdx, setRoleIdx] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [hoveredPreview, setHoveredPreview] = useState({ active: false, img: null });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    // 1. Cycle names
    const cycleTimer = setInterval(() => {
      setNameIdx(p => {
        if (p >= splashNames.length - 1) return 0;
        return p + 1;
      });
    }, 500);

    // 2. Cycle roles
    const roleTimer = setInterval(() => {
      setRoleIdx(p => (p + 1) % roles.length);
    }, 3000);

    // 3. Stop cycling and move to final position
    const moveTimer = setTimeout(() => {
      clearInterval(cycleTimer);
      setNameIdx(3); // 'VARDHAN VARIKUTI'
      setSplashPhase('moving');

      // 4. Mark as done to fade in other content
      setTimeout(() => {
        setSplashPhase('done');
      }, 1200); // allow the overlay to fade out smoothly
    }, 2000);

    return () => {
      clearInterval(cycleTimer);
      clearInterval(roleTimer);
      clearTimeout(moveTimer);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggle = useCallback(() => setTheme((p) => (p === 'dark' ? 'light' : 'dark')), []);

  /* Scroll spy */
  useEffect(() => {
    const ids = ['hero', ...navLinks.map((l) => l.id)];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-30% 0px -65% 0px' }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { rootMargin: '0px 0px -40px 0px', threshold: 0.05 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Global Escape key for Resume */
  useEffect(() => {
    if (!isResumeOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsResumeOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isResumeOpen]);

  const isDone = splashPhase === 'done';

  return (
    <>
      <CustomCursor />
      <HoverPreview
        active={hoveredPreview.active}
        preview={hoveredPreview.img}
        mousePos={mousePos}
      />

      {/* Fullscreen splash overlay */}
      <div className={`splash-overlay ${splashPhase === 'moving' ? 'fading' : ''} ${isDone ? 'hidden' : ''}`}>
        <div className="splash-name" key={nameIdx}>{splashNames[nameIdx]}</div>
      </div>

      <div className="glow-left" />
      <div className="glow-right" />

      <ScrollProgress />

      <div className={`app-fade-in ${isDone ? 'visible' : ''}`}>
        <TopBar activeSection={activeSection} theme={theme} toggle={toggle} roleIdx={roleIdx} />
      </div>

      <Hero splashPhase={splashPhase} splashName={splashNames[nameIdx]} roleIdx={roleIdx} setIsResumeOpen={setIsResumeOpen} />

      <div className={`app-fade-in ${isDone ? 'visible' : ''}`}>
        <Marquee />
        <About />
        <Projects setHoveredPreview={setHoveredPreview} />
        <Services />
        <TechStack />
        <Certifications setHoveredPreview={setHoveredPreview} />
        <Education />
        <Contact />
        <Footer />
      </div>

      

      {isResumeOpen && (
        <div
          className="resume-overlay"
          onClick={() => setIsResumeOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setIsResumeOpen(false)}
          tabIndex={-1}
        >
          <div className="resume-modal" onClick={e => e.stopPropagation()}>
            <button className="resume-close" onClick={() => setIsResumeOpen(false)} aria-label="Close Resume">
              ×
            </button>
            <div className="resume-content">
              <iframe
                src={resumeFile}
                title="Resume Preview"
                className="resume-iframe"
              />
              <div className="resume-footer">
                <p>Don't see the preview? <a href={resumeFile} download="Vardhan_Varikuti_Resume.pdf" target="_blank" rel="noopener noreferrer">Download PDF</a></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
