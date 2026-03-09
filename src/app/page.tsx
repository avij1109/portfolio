'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Import the Spline scene component
const SplineScene = dynamic(() => import('../components/SplineScene'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen text-white">
      <div className="text-center">
        <div className="text-2xl mb-4">🚀</div>
        <div>Loading 3D Scene...</div>
      </div>
    </div>
  )
});

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Additional JavaScript to hide watermark after component loads
    const hideWatermark = () => {
      const watermarks = document.querySelectorAll('[class*="watermark"], [class*="logo"], [id*="spline"], [class*="spline"]');
      watermarks.forEach(el => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.textContent?.toLowerCase().includes('spline') || 
            htmlEl.textContent?.toLowerCase().includes('built with')) {
          htmlEl.style.display = 'none';
        }
      });
    };

    const timer = setTimeout(hideWatermark, 2000);
    const interval = setInterval(hideWatermark, 1000);

    // After 2 seconds, start the slide-right animation
    const slideTimer = setTimeout(() => {
      setShowOverlay(false);
    }, 2000);

    // Cursor following animation for about section
    const handleMouseMove = (e: MouseEvent) => {
      const aboutSection = document.getElementById('about');
      const cursorFollower = document.querySelector('.cursor-follower') as HTMLElement;
      
      if (aboutSection && cursorFollower) {
        const rect = aboutSection.getBoundingClientRect();
        const isInAboutSection = e.clientY >= rect.top && e.clientY <= rect.bottom;
        
        // Always update position
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
        
        if (isInAboutSection) {
          cursorFollower.style.opacity = '0.8';
          cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
          cursorFollower.style.display = 'block';
        } else {
          cursorFollower.style.opacity = '0';
          cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
        }
      }
    };

    // Add hover effects for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const cursorFollower = document.querySelector('.cursor-follower') as HTMLElement;
      const butterflyImage = document.querySelector('.butterfly-image') as HTMLElement;
      const target = e.target as HTMLElement;
      
      if (cursorFollower && butterflyImage && target.closest('#about')) {
        if (target.closest('h2, h3, h4, p, li, button')) {
          // Excited butterfly - bigger and faster wing flap
          cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.4) rotate(10deg)';
          cursorFollower.style.opacity = '1';
          cursorFollower.style.filter = 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.8)) drop-shadow(0 0 35px rgba(245, 158, 11, 0.5))';
          butterflyImage.style.animation = 'wing-flap-excited 0.3s ease-in-out infinite alternate';
          
          // Make sparkles more intense
          const sparkles = document.querySelectorAll('.sparkle-dot');
          sparkles.forEach((sparkle, index) => {
            const sparkleEl = sparkle as HTMLElement;
            sparkleEl.style.opacity = '1';
            sparkleEl.style.animation = `sparkle-twinkle 0.${3 + index}s ease-in-out infinite alternate`;
          });
        } else {
          // Normal butterfly
          cursorFollower.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
          cursorFollower.style.opacity = '0.9';
          cursorFollower.style.filter = 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.6))';
          butterflyImage.style.animation = 'wing-flap 0.8s ease-in-out infinite alternate';
          
          // Reset sparkles to gentle animation
          const sparkles = document.querySelectorAll('.sparkle-dot');
          sparkles.forEach(sparkle => {
            const sparkleEl = sparkle as HTMLElement;
            sparkleEl.style.animation = 'sparkle-gentle 2s ease-in-out infinite';
          });
        }
      }
    };

    // Initialize cursor follower
    const initCursorFollower = () => {
      const cursorFollower = document.querySelector('.cursor-follower') as HTMLElement;
      if (cursorFollower) {
        cursorFollower.style.display = 'none';
        cursorFollower.style.position = 'fixed';
        cursorFollower.style.pointerEvents = 'none';
        cursorFollower.style.zIndex = '9999';
      }
    };

    // Wait for DOM to be ready
    setTimeout(initCursorFollower, 100);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      clearTimeout(slideTimer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const projects = [
    {
      id: 1,
      title: "VoxaHub — AI Voice Agent Platform",
      description: "Production-ready AI call automation system with LLM-powered agents for parallel outbound calls, featuring real-time STT/TTS, agent workflows for appointment booking and lead qualification, call analytics, and user billing architecture.",
      tech: ["FastAPI", "Python", "LLM Agents", "Deepgram", "ElevenLabs", "WebSockets"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "VeriAI — AI Misinformation Detection",
      description: "Full-stack agentic system for misinformation detection with autonomous reasoning, crawler agents, and blockchain-based trust scoring. Features LLM-driven verification with chain-of-thought reasoning, evidence retrieval, and Avalanche blockchain integration.",
      tech: ["React", "FastAPI", "LLM Agents", "RAG", "Blockchain", "Avalanche"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "Hypertension Prediction using PPG Signals",
      description: "Java-based application predicting blood pressure trends from PPG signals using machine learning. Extracts time and frequency-domain features with wavelet transforms and Random Forest classifier.",
      tech: ["Java", "Machine Learning", "Random Forest", "PyWavelets"],
      liveUrl: "#",
      githubUrl: "https://github.com/avij1109/ppg",
    },
    {
      id: 4,
      title: "ML-Based Music Recommender System",
      description: "Cross-platform music recommendation app in React Native using Flask ML backend with k-NN similarity algorithm and Spotify OAuth integration for personalized recommendations.",
      tech: ["React Native", "Flask", "k-NN", "Spotify API", "OAuth"],
      liveUrl: "#",
      githubUrl: "https://github.com/avij1109/music",
    },
    {
      id: 5,
      title: "Women's Safety Alert App",
      description: "React Native safety application with automated check-in timers, SOS alerts with live location sharing, emergency contact notifications, GPS tracking, and push notifications.",
      tech: ["React Native", "JavaScript", "GPS Tracking", "Push Notifications"],
      liveUrl: "#",
      githubUrl: "#",
    }
  ];

  return (
    <main className="relative">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo/Name */}
            <button onClick={() => scrollToSection('hero')} className="text-xl font-bold text-white hover:text-purple-300 transition-colors">
              AJ
            </button>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('hero')} className="text-white hover:text-purple-300 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-white hover:text-purple-300 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('experience')} className="text-white hover:text-purple-300 transition-colors">
                Experience
              </button>
              <button onClick={() => scrollToSection('projects')} className="text-white hover:text-purple-300 transition-colors">
                Projects
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-white hover:text-purple-300 transition-colors">
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-purple-300 transition-colors"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10">
              <div className="flex flex-col space-y-4 pt-4">
                <button 
                  onClick={() => {
                    scrollToSection('hero');
                    setMobileMenuOpen(false);
                  }} 
                  className="text-left text-white hover:text-purple-300 transition-colors py-2"
                >
                  Home
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('about');
                    setMobileMenuOpen(false);
                  }} 
                  className="text-left text-white hover:text-purple-300 transition-colors py-2"
                >
                  About
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('experience');
                    setMobileMenuOpen(false);
                  }} 
                  className="text-left text-white hover:text-purple-300 transition-colors py-2"
                >
                  Experience
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('projects');
                    setMobileMenuOpen(false);
                  }} 
                  className="text-left text-white hover:text-purple-300 transition-colors py-2"
                >
                  Projects
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('contact');
                    setMobileMenuOpen(false);
                  }} 
                  className="text-left text-white hover:text-purple-300 transition-colors py-2"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen relative bg-gradient-to-b from-black via-black to-purple-950/40 text-white">
        {/* Spline Background */}
        <div className="absolute inset-0 z-0">
          <SplineScene 
            scene="https://prod.spline.design/nwa7xQ2XoztDEbYD/scene.splinecode"
            style={{ width: '100%', height: '100vh' }}
          />
        </div>
        
        {/* Content Layer */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 pt-16">
          {/* Welcome Text */}
          <div className={`mb-12 text-center transition-all duration-1000 ${!showOverlay ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              <span className="inline-block animate-wave-text">W</span>
              <span className="inline-block animate-wave-text animation-delay-100">e</span>
              <span className="inline-block animate-wave-text animation-delay-200">l</span>
              <span className="inline-block animate-wave-text animation-delay-300">c</span>
              <span className="inline-block animate-wave-text animation-delay-400">o</span>
              <span className="inline-block animate-wave-text animation-delay-500">m</span>
              <span className="inline-block animate-wave-text animation-delay-600">e</span>
              <span className="inline-block text-purple-300 animate-wave-text animation-delay-700 mx-2">to</span>
              <span className="inline-block animate-wave-text animation-delay-800">m</span>
              <span className="inline-block animate-wave-text animation-delay-900">y</span>
              <span className="inline-block text-purple-300 animate-wave-text animation-delay-1000 ml-2">portfolio</span>
            </h2>
          </div>

          <h1 className={`text-4xl md:text-6xl font-bold mb-8 text-center transition-all duration-1000 ${!showOverlay ? 'animate-fade-in-delay' : 'opacity-0'}`}>
            Avinash Jain
          </h1>
          
          {/* CTA Button */}
          <button 
            onClick={() => scrollToSection('projects')} 
            className={`px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all font-medium duration-1000 ${!showOverlay ? 'animate-fade-in-delay-2' : 'opacity-0'}`}
          >
            View My Work
          </button>
        </div>

        {/* Hide bottom right corner completely - covers the watermark */}
        <div className="absolute bottom-0 right-0 w-40 h-20 bg-black z-50"></div>
      </section>

      {/* Slide Right Overlay */}
      <div className={`fixed inset-0 z-50 bg-gradient-to-br from-black via-black to-purple-950/30 backdrop-blur-sm flex items-center justify-center transition-transform duration-1000 ease-in-out ${
        showOverlay ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white animate-pulse">
            Avinash Jain
          </h1>
          <div className="mt-4 w-16 h-1 bg-purple-400 mx-auto animate-pulse"></div>
        </div>
      </div>
      {/* About Section */}
      <section id="about" className="min-h-screen relative bg-gradient-to-br from-purple-950/30 via-black to-black text-white py-24 overflow-hidden">
        {/* Gradient overlay with more visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-black z-0"></div>
        
        {/* Mesh gradient effect */}
        <div className="absolute inset-0 opacity-30 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/10 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent"></div>
        </div>
        
        {/* Cursor Following Animation - Your Butterfly */}
        <div 
          className="cursor-follower fixed opacity-0 pointer-events-none transition-all duration-300 ease-out"
          style={{ 
            transform: 'translate(-50%, -50%)', 
            zIndex: 9999,
            filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.6))'
          }}
        >
          <div className="relative cursor-container">
            {/* Your downloaded butterfly cursor */}
            <img 
              src="/cursor.png" 
              alt="Butterfly cursor"
              className="butterfly-image"
              style={{ 
                width: '40px', 
                height: 'auto',
                imageRendering: 'pixelated', // For crisp pixel art cursors
                animation: 'wing-flap 0.8s ease-in-out infinite alternate'
              }}
            />
            
            {/* Wing overlay animations */}
            <div className="absolute inset-0 wing-effects">
              {/* Subtle sparkle effects */}
              <div className="sparkle-dot sparkle-1" style={{ 
                position: 'absolute', 
                top: '8px', 
                left: '8px', 
                width: '3px', 
                height: '3px', 
                background: '#fbbf24', 
                borderRadius: '50%',
                opacity: '0.7'
              }}></div>
              <div className="sparkle-dot sparkle-2" style={{ 
                position: 'absolute', 
                top: '12px', 
                right: '8px', 
                width: '2px', 
                height: '2px', 
                background: '#ec4899', 
                borderRadius: '50%',
                opacity: '0.6'
              }}></div>
              <div className="sparkle-dot sparkle-3" style={{ 
                position: 'absolute', 
                bottom: '10px', 
                left: '12px', 
                width: '2.5px', 
                height: '2.5px', 
                background: '#a855f7', 
                borderRadius: '50%',
                opacity: '0.8'
              }}></div>
            </div>
          </div>
        </div>
        
        {/* Interactive Background Elements - Enhanced */}
        <div className="absolute inset-0 overflow-hidden z-5">
          {/* More visible gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/12 to-blue-500/12 rounded-full blur-3xl animate-pulse-slow-delayed"></div>
          
          {/* Additional accent orbs */}
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-600/8 rounded-full blur-2xl animate-pulse-slow"></div>
          
          {/* Floating particles with more presence */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-40"></div>
          <div className="absolute top-32 right-32 w-1.5 h-1.5 bg-pink-300 rounded-full animate-float-delayed opacity-35"></div>
          <div className="absolute bottom-20 left-32 w-2 h-2 bg-purple-400 rounded-full animate-float-slow opacity-40"></div>
          <div className="absolute bottom-32 right-20 w-1.5 h-1.5 bg-purple-300 rounded-full animate-float opacity-35"></div>
          <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-float-delayed opacity-30"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">About Me</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Full-stack developer and ML enthusiast building AI-powered applications with React, FastAPI, and LLM agents.
            </p>
          </div>

          {/* About Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Bio */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Who I Am</h3>
              <p className="text-gray-300 mb-4">
                Full-stack developer and ML enthusiast experienced in building AI-powered applications using React, React Native, FastAPI, and Python.
              </p>
              <p className="text-gray-300">
                Developed systems involving LLM agents, blockchain trust scoring, and machine learning models for real-world applications. Interested in AI/ML and software engineering.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Technical Skills</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300">
                  <h4 className="font-semibold mb-2 text-purple-200">Languages & Frameworks</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>JavaScript, TypeScript, Python, Java</li>
                    <li>React, Next.js, React Native</li>
                    <li>FastAPI, Flask, Node.js, Express.js</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300">
                  <h4 className="font-semibold mb-2 text-purple-200">AI/ML & Backend</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>LLM Agents, Prompt Engineering, RAG</li>
                    <li>Scikit-learn, PyWavelets, OpenCV</li>
                    <li>REST APIs, WebSockets, Task Queues</li>
                    <li>Blockchain (Avalanche, Smart Contracts)</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300">
                  <h4 className="font-semibold mb-2 text-purple-200">Databases & Tools</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>MongoDB, Supabase, Firebase</li>
                    <li>Git, Docker, Postman, Linux</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button onClick={() => scrollToSection('projects')} className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors font-medium mr-4">
              View My Projects
            </button>
            <button onClick={() => scrollToSection('contact')} className="inline-block px-8 py-3 border border-purple-600 text-purple-300 hover:bg-purple-600 hover:text-white rounded-full transition-colors font-medium">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen relative bg-gradient-to-b from-black via-purple-950/20 to-black text-white py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/10 to-transparent z-0"></div>
        
        {/* Accent elements */}
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Experience & Education</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              My academic journey and professional development in technology and machine learning.
            </p>
          </div>

          {/* Education */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-purple-300">Education</h3>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-white">B.Tech, Bhilai Institute of Technology, Durg</h4>
                  <p className="text-purple-200">Bachelor of Technology</p>
                </div>
                <span className="text-sm text-gray-400">Sep 2023 - Jul 2027</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-purple-300">Experience</h3>
            
            {/* ML Training */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-xl font-semibold text-white">Machine Learning Vocational Trainee</h4>
                  <p className="text-purple-200">IIIT Naya Raipur</p>
                </div>
                <span className="text-sm text-gray-400">2026</span>
              </div>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Completed vocational training in Machine Learning at the International Institute of Information Technology, Naya Raipur</li>
                <li>Implemented classification and regression models using Python and Scikit-learn</li>
                <li>Applied feature engineering, model training, and evaluation on real datasets</li>
              </ul>
            </div>

            {/* Development Experience */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h4 className="text-xl font-semibold text-white mb-3">Full Stack Development, App Development, and Machine Learning</h4>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Built full-stack applications using React, React Native, FastAPI, and Node.js</li>
                <li>Integrated machine learning models and APIs into production-ready applications</li>
              </ul>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-purple-300">Achievements</h3>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h4 className="text-xl font-semibold text-white mb-2">Winner, Innovathon 2025</h4>
              <p className="text-gray-300">
                Built a Women&apos;s Safety Alert App with SOS alerts, live location sharing, and automated check-ins
              </p>
            </div>
          </div>

          
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen relative bg-gradient-to-b from-black via-purple-950/20 to-black text-white py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/10 to-transparent z-0"></div>
        
        {/* Accent elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">My Projects</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A showcase of my work spanning web development, mobile apps, machine learning, and data science projects.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
            {projects.map((project) => (
              <div key={project.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:transform hover:scale-105 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Links */}
                  {project.githubUrl !== "#" && (
                    <div className="flex justify-center">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-purple-600 text-purple-300 hover:bg-purple-600 hover:text-white text-center rounded-lg transition-colors text-sm">
                        View on GitHub
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-300 mb-6">Interested in working together?</p>
            <button onClick={() => scrollToSection('contact')} className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors font-medium">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen relative bg-gradient-to-t from-purple-950/30 via-black to-black text-white py-24 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/15 via-transparent to-transparent z-0"></div>
        
        {/* Accent glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="max-w-lg mx-auto px-6 relative z-10">
          {/* Contact Card */}
          <div className="bg-white rounded-2xl p-8 text-center text-black shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Let&apos;s Connect!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              I&apos;m always excited to collaborate on new projects and connect with fellow developers. 
              Let&apos;s build something amazing together!
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              <a 
                href="https://github.com/avij1109" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors group"
              >
                <svg className="w-6 h-6 text-gray-700 group-hover:text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/avinashjain-dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors group"
              >
                <svg className="w-6 h-6 text-gray-700 group-hover:text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <a 
                href="https://x.com/avj1109" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors group"
              >
                <svg className="w-6 h-6 text-gray-700 group-hover:text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hide Spline watermark */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delay-2 {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delay-3 {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wave-text {
          0%, 60%, 100% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-20px) scale(1.2); }
        }
        @keyframes bounce-slow {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(90deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.1; }
          50% { transform: scale(1.1) rotate(180deg); opacity: 0.2; }
        }
        @keyframes pulse-slow-delayed {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.1; }
          50% { transform: scale(1.2) rotate(-180deg); opacity: 0.15; }
        }
        @keyframes wing-flap {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(3deg) scale(1.02); }
          50% { transform: rotate(0deg) scale(1.05); }
          75% { transform: rotate(-3deg) scale(1.02); }
          100% { transform: rotate(0deg) scale(1); }
        }
        @keyframes wing-flap-excited {
          0% { transform: rotate(0deg) scale(1); }
          20% { transform: rotate(8deg) scale(1.1); }
          40% { transform: rotate(-8deg) scale(1.05); }
          60% { transform: rotate(5deg) scale(1.08); }
          80% { transform: rotate(-5deg) scale(1.03); }
          100% { transform: rotate(0deg) scale(1); }
        }
        @keyframes sparkle-gentle {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
        @keyframes sparkle-twinkle {
          0% { transform: scale(1) rotate(0deg); opacity: 0.7; }
          50% { transform: scale(1.4) rotate(180deg); opacity: 1; }
          100% { transform: scale(1.1) rotate(360deg); opacity: 0.8; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.5s both;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in-delay-2 1s ease-out 0.8s both;
        }
        .animate-fade-in-delay-3 {
          animation: fade-in-delay-3 1s ease-out 1.1s both;
        }
        .animate-wave-text {
          animation: wave-text 2s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slow-delayed {
          animation: pulse-slow-delayed 10s ease-in-out infinite;
        }
        .animate-wing-flap {
          animation: wing-flap 0.8s ease-in-out infinite alternate;
        }
        
        /* Sparkle animations */
        .sparkle-dot {
          animation: sparkle-gentle 2s ease-in-out infinite;
        }
        .sparkle-1 { animation-delay: 0s; }
        .sparkle-2 { animation-delay: 0.7s; }
        .sparkle-3 { animation-delay: 1.4s; }
        
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1000 { animation-delay: 1.0s; }
        
        spline-viewer[loading-anim-type="spinner-small-dark"],
        spline-viewer .logo,
        spline-viewer .watermark,
        [data-spline-watermark],
        .spline-watermark,
        canvas + div,
        canvas ~ div {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
      `}</style>
    </main>
  );
}

