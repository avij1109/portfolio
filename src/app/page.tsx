'use client';

import { useEffect, useState } from 'react';

// ── Shared primitives ──────────────────────────────────────────────────────────

function SectionHeader({
  eyebrow,
  heading,
  sub,
}: {
  eyebrow: string;
  heading: string;
  sub?: string;
}) {
  return (
    <div className="mb-14">
      <p
        className="text-xs tracking-widest uppercase font-medium mb-3"
        style={{ color: 'var(--color-muted)' }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-4xl md:text-5xl font-bold leading-tight"
        style={{ color: 'var(--color-text)' }}
      >
        {heading}
      </h2>
      {sub && (
        <p
          className="mt-4 text-base leading-relaxed max-w-xl"
          style={{ color: 'var(--color-muted)' }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-white/10 hover:border-white/[0.22] transition-colors duration-200 ${className}`}
      style={{ background: 'var(--color-surface)' }}
    >
      {children}
    </div>
  );
}

// ── Constants ──────────────────────────────────────────────────────────────────

const sectionIds = ['hero', 'experience', 'projects', 'contact'] as const;
const sectionLabels: Record<typeof sectionIds[number], string> = {
  hero: 'Home',
  experience: 'Experience',
  projects: 'Projects',
  contact: 'Contact',
};

const projects: Array<{
  id: number;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  siteUrl?: string;
}> = [
  {
    id: 1,
    title: 'VoxaHub — AI Voice Agent Platform',
    description:
      'Automates outbound sales and support calls using LLM-powered agents. Runs parallel calls with real-time voice (STT/TTS), handles appointment booking and lead qualification, and tracks per-user usage for billing.',
    tech: ['FastAPI', 'Python', 'LLM Agents', 'Deepgram', 'Sarvam', 'WebSockets'],
    githubUrl: '',
    siteUrl: 'https://voxahub.in',
  },
  {
    id: 2,
    title: 'VeriAI — Misinformation Detection',
    description:
      'Detects misinformation using autonomous LLM agents that crawl sources, chain evidence, and publish verification results to the Avalanche blockchain for tamper-proof trust scoring.',
    tech: ['React', 'FastAPI', 'LLM Agents', 'Avalanche'],
    githubUrl: 'https://github.com/avij1109/veri',
  },
  {
    id: 3,
    title: 'Hypertension Prediction via PPG',
    description:
      'Real-time blood pressure monitoring app that captures PPG signals via smartphone camera and predicts BP using XGBoost regression — 97.9% systolic / 87.5% diastolic accuracy, validated on real patient data from 29 subjects. Android (Java) frontend streams to a FastAPI backend over WebSocket for live signal processing at 15 FPS.',
    tech: ['Python', 'FastAPI', 'XGBoost', 'Android', 'WebSockets'],
    githubUrl: 'https://github.com/avij1109/ppg',
  },
  {
    id: 4,
    title: 'ML Music Recommender',
    description:
      'Cross-platform app that recommends music based on listening history. A Flask backend runs a k-NN similarity model against your Spotify library via OAuth to surface personalized picks.',
    tech: ['React Native', 'Flask', 'k-NN', 'Spotify API', 'OAuth'],
    githubUrl: 'https://github.com/avij1109/music',
  },
  {
    id: 5,
    title: "Women's Safety Alert App",
    description:
      'Sends SOS alerts with live GPS location to emergency contacts when a timed check-in is missed, using push notifications for low-latency delivery. Won Innovathon 2025.',
    tech: ['React Native', 'GPS Tracking', 'Push Notifications'],
    githubUrl: '',
  },
];

const experiences = [
  {
    title: 'Founder & Software Engineer',
    org: 'VoxaHub',
    date: 'Nov 2025 – Present',
    points: [
      'Building a production AI call automation platform with LLM-powered agents for parallel outbound calling.',
      'Architected real-time STT/TTS pipeline, agent workflows for appointment booking and lead qualification, and per-user billing.',
      'Built a RAG-based chatbot to answer user queries about the company and product.',
    ],
  },
  {
    title: 'Automation Engineering Intern',
    org: 'Rice Mill',
    date: 'May 2026 – Jun 2026',
    points: [
      "Led digitization of a paddy processing factory's workflow, replacing manual pen-and-paper tracking with an automated system.",
    ],
  },
  {
    title: 'Research Intern',
    org: 'IIIT Naya Raipur',
    date: 'Jun 2025 – Jul 2025',
    points: [
      'Built a real-time blood pressure monitoring system from smartphone camera PPG signals, achieving 97.9% systolic / 87.5% diastolic accuracy (XGBoost) on clinically validated data from 29 patients.',
    ],
  },
];

const education = [
  {
    title: 'Bachelor of Technology',
    org: 'Bhilai Institute of Technology',
    date: 'Sep 2023 – Jul 2027',
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<typeof sectionIds[number]>('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id as typeof sectionIds[number]);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));

    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main>
      {/* ── Nav ────────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-sm font-bold tracking-widest"
            style={{ color: 'var(--color-text)' }}
          >
            AJ
          </button>

          <div className="hidden md:flex gap-8">
            {sectionIds.map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="relative pb-0.5 text-sm transition-colors duration-200"
                style={{
                  color: activeSection === id ? 'var(--color-accent)' : 'var(--color-muted)',
                }}
              >
                {sectionLabels[id]}
                {activeSection === id && (
                  <span
                    className="absolute left-0 -bottom-1 h-px w-full"
                    style={{ background: 'var(--color-accent)' }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            style={{ color: 'var(--color-muted)' }}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/[0.06] mt-3">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
              {sectionIds.map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    scrollToSection(id);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-sm py-1"
                  style={{
                    color: activeSection === id ? 'var(--color-accent)' : 'var(--color-muted)',
                  }}
                >
                  {sectionLabels[id]}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section id="hero" className="min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full py-16">
          <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-20">

            {/* Left: name + tagline */}
            <div className="flex-1 min-w-0 animate-fade-up">
              <h1
                className="font-bold leading-none tracking-tight"
                style={{
                  fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                  color: 'var(--color-text)',
                }}
              >
                Avinash
                <br />
                Jain.
              </h1>
              <p
                className="text-2xl md:text-3xl font-medium mt-4"
                style={{ color: 'var(--color-accent)' }}
              >
                AI/ML Engineer
              </p>
            </div>

            {/* Vertical divider — desktop only */}
            <div className="hidden md:block w-px self-stretch bg-white/10" />

            {/* Right: current project + CTA */}
            <div className="md:w-80 shrink-0 animate-fade-up-delay">
              <div className="mb-10">
                <p
                  className="text-xs tracking-widest uppercase font-medium mb-3"
                  style={{ color: 'var(--color-muted)' }}
                >
                  Now
                </p>
                <p
                  className="font-bold leading-snug"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-text)' }}
                >
                  I build AI agents, RAG pipelines, and real-time voice systems.
                </p>
              </div>

              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-2.5 text-sm font-medium rounded transition-opacity hover:opacity-85"
                style={{ background: 'var(--color-accent)', color: 'var(--color-bg)' }}
              >
                View Work
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader eyebrow="" heading="Experience & Education" />

          <div className="space-y-12">
            {/* Experience sub-group */}
            <div>
              <h3
                className="text-xs uppercase tracking-widest font-medium mb-5 pb-3 border-b border-white/[0.06]"
                style={{ color: 'var(--color-muted)' }}
              >
                Experience
              </h3>
              <div className="space-y-4">
                {experiences.map((item, i) => (
                  <Card key={i} className="p-6">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                      <div>
                        {i === 0 ? (
                          <>
                            <h4 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
                              {item.org}
                            </h4>
                            <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--color-text)' }}>
                              {item.title}
                            </p>
                          </>
                        ) : (
                          <>
                            <h4 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
                              {item.title}
                            </h4>
                            <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--color-text)' }}>
                              {item.org}
                            </p>
                          </>
                        )}
                      </div>
                      <span className="text-xs font-mono shrink-0" style={{ color: 'var(--color-muted)' }}>
                        {item.date}
                      </span>
                    </div>
                    {item.points.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {item.points.map((pt, j) => (
                          <li key={j} className="flex gap-2.5 text-sm" style={{ color: 'var(--color-muted)' }}>
                            <span className="shrink-0 mt-[5px] w-1 h-1 rounded-full bg-white/25" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Education sub-group */}
            <div>
              <h3
                className="text-xs uppercase tracking-widest font-medium mb-5 pb-3 border-b border-white/[0.06]"
                style={{ color: 'var(--color-muted)' }}
              >
                Education
              </h3>
              <div className="space-y-4">
                {education.map((item, i) => (
                  <Card key={i} className="p-6">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <h4 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
                          {item.title}
                        </h4>
                        <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--color-text)' }}>
                          {item.org}
                        </p>
                      </div>
                      <span className="text-xs font-mono shrink-0" style={{ color: 'var(--color-muted)' }}>
                        {item.date}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader eyebrow="Work" heading="Projects" />

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((p) => (
              <Card key={p.id} className="p-6 flex flex-col">
                <span
                  className="text-xs font-mono mb-3 block"
                  style={{ color: 'var(--color-muted)', opacity: 0.6 }}
                >
                  {String(p.id).padStart(2, '0')}
                </span>
                <h3 className="text-base font-semibold mb-2.5" style={{ color: 'var(--color-text)' }}>
                  {p.title}
                </h3>
                <p
                  className="text-sm leading-[1.6] flex-1 mb-5"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2 py-0.5 border border-white/10 rounded"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/[0.06] flex gap-4 flex-wrap">
                  {p.siteUrl && (
                    <a
                      href={p.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium transition-opacity hover:opacity-80"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {p.siteUrl.replace('https://', '')} →
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium transition-opacity hover:opacity-80"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      GitHub →
                    </a>
                  )}
                  {!p.siteUrl && !p.githubUrl && (
                    <span
                      className="text-xs font-mono"
                      style={{ color: 'var(--color-muted)', opacity: 0.45 }}
                    >
                      private
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6">
          <p
            className="text-xs tracking-widest uppercase font-medium mb-4"
            style={{ color: 'var(--color-muted)' }}
          >
            Contact
          </p>
          <h2
            className="font-bold leading-none tracking-tight mb-5"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', color: 'var(--color-text)' }}
          >
            Let&apos;s talk.
          </h2>
          <p className="text-base mb-14" style={{ color: 'var(--color-muted)' }}>
            Actively looking for AI/ML and backend engineering opportunities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
            {[
              {
                label: 'GitHub',
                handle: 'avij1109',
                href: 'https://github.com/avij1109',
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                ),
              },
              {
                label: 'LinkedIn',
                handle: 'avinashjain-dev',
                href: 'https://www.linkedin.com/in/avinashjain-dev/',
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                label: 'X',
                handle: '@avij1109',
                href: 'https://x.com/avij1109',
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                ),
              },
            ].map(({ label, handle, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="p-5 h-full">
                  <div className="flex items-center gap-2.5 mb-2" style={{ color: 'var(--color-muted)' }}>
                    {icon}
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                      {label}
                    </span>
                  </div>
                  <p className="text-xs font-mono" style={{ color: 'var(--color-muted)' }}>
                    {handle}
                  </p>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
