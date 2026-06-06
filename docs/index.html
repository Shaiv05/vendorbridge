<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>VendorBridge — README</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #040810;
    --surface: #080f1e;
    --surface2: #0d1830;
    --border: rgba(56, 139, 253, 0.15);
    --accent: #3b82f6;
    --accent2: #06b6d4;
    --accent3: #8b5cf6;
    --gold: #f59e0b;
    --text: #e2e8f0;
    --muted: #64748b;
    --green: #10b981;
    --glow: 0 0 40px rgba(59,130,246,0.25);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Mono', monospace;
    overflow-x: hidden;
    cursor: none;
  }

  /* Custom cursor */
  .cursor {
    width: 12px; height: 12px;
    background: var(--accent);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    mix-blend-mode: screen;
  }
  .cursor-ring {
    width: 40px; height: 40px;
    border: 1px solid rgba(59,130,246,0.5);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.15s ease, left 0.1s ease, top 0.1s ease;
  }

  /* Grid background */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
  }

  /* Radial glow top */
  body::after {
    content: '';
    position: fixed;
    top: -30%;
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
    height: 60vh;
    background: radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .container {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 32px;
    position: relative;
    z-index: 1;
  }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 32px;
    position: relative;
    overflow: hidden;
  }

  .hero-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    animation: floatOrb 8s ease-in-out infinite;
  }
  .hero-orb-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%);
    top: 10%; left: -10%;
    animation-delay: 0s;
  }
  .hero-orb-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%);
    bottom: 10%; right: -5%;
    animation-delay: -4s;
  }
  .hero-orb-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%);
    top: 40%; right: 15%;
    animation-delay: -2s;
  }

  @keyframes floatOrb {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-30px) scale(1.05); }
  }

  .hero-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.3em;
    color: var(--accent);
    text-transform: uppercase;
    margin-bottom: 24px;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards 0.2s;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .hero-eyebrow::before, .hero-eyebrow::after {
    content: '';
    display: inline-block;
    width: 32px;
    height: 1px;
    background: var(--accent);
    opacity: 0.6;
  }

  .hero-logo {
    font-family: 'Syne', sans-serif;
    font-size: clamp(64px, 12vw, 110px);
    font-weight: 800;
    line-height: 0.9;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #fff 0%, #93c5fd 40%, #7c3aed 80%, #06b6d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0;
    animation: fadeUp 0.9s ease forwards 0.4s;
    margin-bottom: 8px;
    position: relative;
  }

  .hero-logo::after {
    content: 'VendorBridge';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #fff 0%, #93c5fd 40%, #7c3aed 80%, #06b6d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: blur(20px);
    opacity: 0.4;
    z-index: -1;
  }

  .hero-tagline {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: clamp(18px, 3vw, 26px);
    color: rgba(226,232,240,0.7);
    margin-bottom: 20px;
    opacity: 0;
    animation: fadeUp 0.9s ease forwards 0.6s;
  }

  .hero-sub {
    font-size: 13px;
    color: var(--muted);
    letter-spacing: 0.05em;
    margin-bottom: 48px;
    opacity: 0;
    animation: fadeUp 0.9s ease forwards 0.75s;
  }

  .badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-bottom: 56px;
    opacity: 0;
    animation: fadeUp 0.9s ease forwards 0.9s;
  }

  .badge {
    padding: 6px 14px;
    border: 1px solid var(--border);
    border-radius: 100px;
    font-size: 11px;
    letter-spacing: 0.08em;
    color: var(--accent);
    background: rgba(59,130,246,0.06);
    transition: all 0.3s ease;
  }
  .badge:hover {
    background: rgba(59,130,246,0.15);
    border-color: rgba(59,130,246,0.4);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(59,130,246,0.2);
  }
  .badge.purple { color: #a78bfa; border-color: rgba(139,92,246,0.2); background: rgba(139,92,246,0.06); }
  .badge.cyan { color: #67e8f9; border-color: rgba(6,182,212,0.2); background: rgba(6,182,212,0.06); }
  .badge.green { color: #6ee7b7; border-color: rgba(16,185,129,0.2); background: rgba(16,185,129,0.06); }

  .scroll-hint {
    opacity: 0;
    animation: fadeUp 0.9s ease forwards 1.1s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: var(--muted);
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  .scroll-line {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, var(--accent), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(1.1); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── SECTION STYLES ── */
  section {
    padding: 100px 0;
    border-top: 1px solid var(--border);
    position: relative;
    z-index: 1;
  }

  .section-label {
    font-size: 10px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-label::before {
    content: '';
    display: block;
    width: 24px;
    height: 1px;
    background: var(--accent);
  }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin-bottom: 20px;
  }

  .section-desc {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.8;
    max-width: 560px;
    margin-bottom: 56px;
  }

  /* ── PROBLEM ── */
  .problem-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }
  .problem-item {
    background: var(--surface);
    padding: 32px 28px;
    position: relative;
    transition: background 0.3s ease;
  }
  .problem-item:hover { background: var(--surface2); }
  .problem-icon {
    font-size: 28px;
    margin-bottom: 16px;
    display: block;
  }
  .problem-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #fff;
  }
  .problem-desc {
    font-size: 12px;
    color: var(--muted);
    line-height: 1.7;
  }

  /* ── WORKFLOW ── */
  .workflow-wrap {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
  }
  .workflow-wrap::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent, var(--accent), var(--accent3), transparent);
    opacity: 0.4;
  }
  .workflow-step {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    padding: 20px 0;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.6s ease;
  }
  .workflow-step.visible {
    opacity: 1;
    transform: translateX(0);
  }
  .step-num {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--surface);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 500;
    color: var(--accent);
    flex-shrink: 0;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
  }
  .workflow-step:hover .step-num {
    background: var(--accent);
    color: #fff;
    box-shadow: 0 0 20px rgba(59,130,246,0.5);
  }
  .step-content { padding-top: 8px; }
  .step-name {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 4px;
  }
  .step-detail { font-size: 12px; color: var(--muted); }

  /* ── FEATURES ── */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }
  .feature-card {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    background: var(--surface);
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
  }
  .feature-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .feature-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top left, rgba(59,130,246,0.06), transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .feature-card:hover {
    transform: translateY(-4px);
    border-color: rgba(59,130,246,0.35);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(59,130,246,0.1);
  }
  .feature-card:hover::before { opacity: 1; }

  .feature-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin-bottom: 20px;
    position: relative;
  }
  .feature-icon.blue { background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); }
  .feature-icon.purple { background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.2); }
  .feature-icon.cyan { background: rgba(6,182,212,0.1); border: 1px solid rgba(6,182,212,0.2); }
  .feature-icon.gold { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.2); }
  .feature-icon.green { background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); }
  .feature-icon.rose { background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.2); }

  .feature-name {
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 12px;
  }
  .feature-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .feature-list li {
    font-size: 12px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .feature-list li::before {
    content: '›';
    color: var(--accent);
    font-size: 14px;
    line-height: 1;
  }

  /* ── TECH STACK ── */
  .stack-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  @media (max-width: 600px) { .stack-wrap { grid-template-columns: 1fr; } }

  .stack-card {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    background: var(--surface);
    position: relative;
    overflow: hidden;
  }
  .stack-card::after {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 100px; height: 100px;
    background: radial-gradient(circle, rgba(59,130,246,0.08), transparent);
    pointer-events: none;
  }
  .stack-card.purple-glow::after {
    background: radial-gradient(circle, rgba(139,92,246,0.1), transparent);
  }

  .stack-header {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .stack-header.purple { color: var(--accent3); }

  .tech-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .tech-item:last-child { border-bottom: none; }
  .tech-name { font-size: 13px; color: var(--text); }
  .tech-val { font-size: 11px; color: var(--muted); font-family: 'DM Mono', monospace; }

  /* ── SETUP ── */
  .setup-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  @media (max-width: 640px) { .setup-grid { grid-template-columns: 1fr; } }

  .setup-card {
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    background: var(--surface);
  }
  .setup-header {
    padding: 16px 24px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 600;
  }
  .setup-header .dot {
    width: 8px; height: 8px;
    border-radius: 50%;
  }
  .setup-body { padding: 24px; }
  .code-block {
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
    padding: 16px 20px;
    font-size: 12px;
    line-height: 1.9;
    color: #93c5fd;
    overflow-x: auto;
  }
  .code-block .cmd::before { content: '$ '; color: var(--muted); }
  .url-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 16px;
    padding: 8px 14px;
    background: rgba(16,185,129,0.08);
    border: 1px solid rgba(16,185,129,0.2);
    border-radius: 8px;
    font-size: 12px;
    color: #6ee7b7;
  }

  /* ── ROADMAP ── */
  .roadmap-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
  }
  .roadmap-item {
    padding: 16px 20px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--surface);
    font-size: 13px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    cursor: default;
  }
  .roadmap-item:hover {
    border-color: rgba(139,92,246,0.3);
    color: var(--text);
    background: var(--surface2);
    transform: translateX(4px);
  }
  .roadmap-item::before {
    content: '○';
    color: var(--accent3);
    font-size: 10px;
    flex-shrink: 0;
  }

  /* ── AUTHOR ── */
  .author-section {
    padding: 80px 0;
    border-top: 1px solid var(--border);
    text-align: center;
    position: relative;
    z-index: 1;
  }
  .author-card {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 48px 64px;
    border: 1px solid var(--border);
    border-radius: 24px;
    background: var(--surface);
    position: relative;
    overflow: hidden;
  }
  .author-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center top, rgba(59,130,246,0.07), transparent 60%);
  }
  .author-avatar {
    width: 64px; height: 64px;
    border-radius: 50%;
    border: 2px solid var(--border);
    background: linear-gradient(135deg, var(--accent), var(--accent3));
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
  }
  .author-name {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
  }
  .author-role {
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 0.1em;
  }

  /* ── FOOTER ── */
  footer {
    border-top: 1px solid var(--border);
    padding: 40px 0;
    text-align: center;
    position: relative;
    z-index: 1;
  }
  .footer-text {
    font-size: 12px;
    color: var(--muted);
  }
  .footer-text span { color: var(--accent); }

  /* ── SCROLL ANIMATIONS ── */
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── ANIMATED TITLE GLOW ── */
  .glow-text {
    animation: glowPulse 4s ease-in-out infinite;
  }
  @keyframes glowPulse {
    0%, 100% { text-shadow: 0 0 30px rgba(59,130,246,0.3); }
    50% { text-shadow: 0 0 60px rgba(59,130,246,0.5), 0 0 100px rgba(139,92,246,0.2); }
  }

  /* ── DIVIDER ── */
  .divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 24px 0 48px;
  }
  .divider-line { flex: 1; height: 1px; background: var(--border); }
  .divider-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); opacity: 0.5; }

  /* FLOATING NAV */
  .nav {
    position: fixed;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    background: rgba(4,8,16,0.8);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 10px 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: fadeDown 0.8s ease forwards 1.3s;
    opacity: 0;
  }
  @keyframes fadeDown {
    from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  .nav a {
    font-size: 11px;
    letter-spacing: 0.08em;
    color: var(--muted);
    text-decoration: none;
    padding: 5px 12px;
    border-radius: 100px;
    transition: all 0.2s;
  }
  .nav a:hover { color: #fff; background: rgba(255,255,255,0.08); }
  .nav-sep { width: 1px; height: 14px; background: var(--border); }

  @media (max-width: 600px) { .nav { display: none; } }
</style>
</head>
<body>

<div class="cursor" id="cursor"></div>
<div class="cursor-ring" id="cursorRing"></div>

<nav class="nav">
  <a href="#overview">Overview</a>
  <div class="nav-sep"></div>
  <a href="#workflow">Workflow</a>
  <div class="nav-sep"></div>
  <a href="#features">Features</a>
  <div class="nav-sep"></div>
  <a href="#stack">Stack</a>
  <div class="nav-sep"></div>
  <a href="#setup">Setup</a>
</nav>

<!-- HERO -->
<section class="hero" id="overview">
  <div class="hero-orb hero-orb-1"></div>
  <div class="hero-orb hero-orb-2"></div>
  <div class="hero-orb hero-orb-3"></div>

  <div class="hero-eyebrow">Procurement Platform</div>
  <h1 class="hero-logo glow-text">VendorBridge</h1>
  <p class="hero-tagline">Smart Procurement & Vendor Management</p>
  <p class="hero-sub">Streamlining the complete procurement lifecycle · Built at Hackathon</p>

  <div class="badge-row">
    <span class="badge">Next.js 15</span>
    <span class="badge">TypeScript</span>
    <span class="badge cyan">TailwindCSS</span>
    <span class="badge purple">Django 5</span>
    <span class="badge purple">DRF</span>
    <span class="badge green">JWT Auth</span>
    <span class="badge cyan">Framer Motion</span>
    <span class="badge">Zod</span>
  </div>

  <div class="scroll-hint">
    <div class="scroll-line"></div>
    scroll
  </div>
</section>

<!-- PROBLEM -->
<section id="problem">
  <div class="container">
    <div class="reveal">
      <div class="section-label">The Problem</div>
      <h2 class="section-title">Traditional procurement<br>is broken</h2>
      <p class="section-desc">Manual workflows, scattered email threads, and zero centralized visibility create costly procurement bottlenecks. VendorBridge fixes that.</p>
    </div>

    <div class="problem-grid reveal">
      <div class="problem-item">
        <span class="problem-icon">📋</span>
        <div class="problem-title">Manual Tracking</div>
        <div class="problem-desc">Vendors tracked in spreadsheets with no single source of truth</div>
      </div>
      <div class="problem-item">
        <span class="problem-icon">📧</span>
        <div class="problem-title">Email RFQs</div>
        <div class="problem-desc">RFQ management buried in overflowing inboxes with no audit trail</div>
      </div>
      <div class="problem-item">
        <span class="problem-icon">🔢</span>
        <div class="problem-title">Hard Comparisons</div>
        <div class="problem-desc">No structured way to compare vendor quotations and pricing</div>
      </div>
      <div class="problem-item">
        <span class="problem-icon">🏝️</span>
        <div class="problem-title">Data Silos</div>
        <div class="problem-desc">Procurement data scattered across teams, tools, and formats</div>
      </div>
      <div class="problem-item">
        <span class="problem-icon">⏳</span>
        <div class="problem-title">Slow Approvals</div>
        <div class="problem-desc">Time-consuming approval chains with no workflow automation</div>
      </div>
    </div>
  </div>
</section>

<!-- WORKFLOW -->
<section id="workflow">
  <div class="container">
    <div class="reveal">
      <div class="section-label">System Workflow</div>
      <h2 class="section-title">End-to-end<br>procurement pipeline</h2>
      <p class="section-desc">Nine clearly defined stages from vendor onboarding to invoice processing — every step tracked, every decision auditable.</p>
    </div>

    <div class="workflow-wrap">
      <div class="workflow-step">
        <div class="step-num">01</div>
        <div class="step-content">
          <div class="step-name">Vendor Registration</div>
          <div class="step-detail">Onboard vendors with profiles, categories, and contact management</div>
        </div>
      </div>
      <div class="workflow-step">
        <div class="step-num">02</div>
        <div class="step-content">
          <div class="step-name">Vendor Management</div>
          <div class="step-detail">Maintain a searchable vendor directory with status tracking</div>
        </div>
      </div>
      <div class="workflow-step">
        <div class="step-num">03</div>
        <div class="step-content">
          <div class="step-name">RFQ Creation</div>
          <div class="step-detail">Create and assign RFQs to specific vendors with deadlines</div>
        </div>
      </div>
      <div class="workflow-step">
        <div class="step-num">04</div>
        <div class="step-content">
          <div class="step-name">Quotation Submission</div>
          <div class="step-detail">Vendors submit bids through a structured portal</div>
        </div>
      </div>
      <div class="workflow-step">
        <div class="step-num">05</div>
        <div class="step-content">
          <div class="step-name">Quotation Comparison</div>
          <div class="step-detail">Side-by-side price, delivery, and criteria evaluation</div>
        </div>
      </div>
      <div class="workflow-step">
        <div class="step-num">06</div>
        <div class="step-content">
          <div class="step-name">Vendor Selection</div>
          <div class="step-detail">Smart ranking engine surfaces the optimal supplier</div>
        </div>
      </div>
      <div class="workflow-step">
        <div class="step-num">07</div>
        <div class="step-content">
          <div class="step-name">Approval Workflow</div>
          <div class="step-detail">Structured sign-off process with role-based access</div>
        </div>
      </div>
      <div class="workflow-step">
        <div class="step-num">08</div>
        <div class="step-content">
          <div class="step-name">Purchase Order</div>
          <div class="step-detail">Auto-generated POs sent to selected vendors</div>
        </div>
      </div>
      <div class="workflow-step">
        <div class="step-num">09</div>
        <div class="step-content">
          <div class="step-name">Invoice Processing</div>
          <div class="step-detail">Track invoices and close the procurement loop</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FEATURES -->
<section id="features">
  <div class="container">
    <div class="reveal">
      <div class="section-label">Key Features</div>
      <h2 class="section-title">Everything procurement<br>teams need</h2>
      <p class="section-desc">Six core modules covering authentication, vendor management, RFQs, quotations, comparison, and analytics.</p>
    </div>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon blue">🔐</div>
        <div class="feature-name">Auth & Security</div>
        <ul class="feature-list">
          <li>JWT Authentication</li>
          <li>Secure Login & Registration</li>
          <li>Role-Based Access Control</li>
          <li>Protected Routes</li>
          <li>Session Management</li>
        </ul>
      </div>
      <div class="feature-card">
        <div class="feature-icon cyan">🏢</div>
        <div class="feature-name">Vendor Management</div>
        <ul class="feature-list">
          <li>Vendor Directory</li>
          <li>Rich Vendor Profiles</li>
          <li>Category Management</li>
          <li>Contact Management</li>
          <li>Search & Filtering</li>
        </ul>
      </div>
      <div class="feature-card">
        <div class="feature-icon purple">📋</div>
        <div class="feature-name">RFQ Management</div>
        <ul class="feature-list">
          <li>Create & Manage RFQs</li>
          <li>Assign to Vendors</li>
          <li>RFQ Tracking</li>
          <li>Deadline Monitoring</li>
        </ul>
      </div>
      <div class="feature-card">
        <div class="feature-icon gold">💰</div>
        <div class="feature-name">Quotation Management</div>
        <ul class="feature-list">
          <li>Quotation Submission Portal</li>
          <li>Vendor Participation Tracking</li>
          <li>Bid Management</li>
          <li>Status Management</li>
        </ul>
      </div>
      <div class="feature-card">
        <div class="feature-icon green">📊</div>
        <div class="feature-name">Comparison Engine</div>
        <ul class="feature-list">
          <li>Smart Vendor Ranking</li>
          <li>Price Comparison</li>
          <li>Delivery Comparison</li>
          <li>Decision Support</li>
        </ul>
      </div>
      <div class="feature-card">
        <div class="feature-icon rose">📈</div>
        <div class="feature-name">Dashboard & Analytics</div>
        <ul class="feature-list">
          <li>Procurement Insights</li>
          <li>Vendor Statistics</li>
          <li>RFQ Metrics</li>
          <li>Live Tracking</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- TECH STACK -->
<section id="stack">
  <div class="container">
    <div class="reveal">
      <div class="section-label">Tech Stack</div>
      <h2 class="section-title">Modern full-stack<br>architecture</h2>
    </div>

    <div class="stack-wrap reveal">
      <div class="stack-card">
        <div class="stack-header">⚡ Frontend</div>
        <div class="tech-item">
          <span class="tech-name">Framework</span>
          <span class="tech-val">Next.js 15</span>
        </div>
        <div class="tech-item">
          <span class="tech-name">Language</span>
          <span class="tech-val">TypeScript</span>
        </div>
        <div class="tech-item">
          <span class="tech-name">Styling</span>
          <span class="tech-val">Tailwind CSS</span>
        </div>
        <div class="tech-item">
          <span class="tech-name">Animations</span>
          <span class="tech-val">Framer Motion</span>
        </div>
        <div class="tech-item">
          <span class="tech-name">Forms</span>
          <span class="tech-val">React Hook Form</span>
        </div>
        <div class="tech-item">
          <span class="tech-name">Validation</span>
          <span class="tech-val">Zod</span>
        </div>
        <div class="tech-item">
          <span class="tech-name">HTTP Client</span>
          <span class="tech-val">Axios</span>
        </div>
      </div>

      <div class="stack-card purple-glow">
        <div class="stack-header purple">🐍 Backend</div>
        <div class="tech-item">
          <span class="tech-name">Framework</span>
          <span class="tech-val">Django 5</span>
        </div>
        <div class="tech-item">
          <span class="tech-name">API</span>
          <span class="tech-val">Django REST Framework</span>
        </div>
        <div class="tech-item">
          <span class="tech-name">Authentication</span>
          <span class="tech-val">JWT</span>
        </div>
        <div class="tech-item">
          <span class="tech-name">Database</span>
          <span class="tech-val">SQLite</span>
        </div>
        <div class="tech-item">
          <span class="tech-name">CORS</span>
          <span class="tech-val">django-cors-headers</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SETUP -->
<section id="setup">
  <div class="container">
    <div class="reveal">
      <div class="section-label">Getting Started</div>
      <h2 class="section-title">Up and running<br>in minutes</h2>
    </div>

    <div class="setup-grid reveal">
      <div class="setup-card">
        <div class="setup-header">
          <div class="dot" style="background:#ef4444"></div>
          <div class="dot" style="background:#f59e0b"></div>
          <div class="dot" style="background:#10b981"></div>
          &nbsp;&nbsp;Backend Setup
        </div>
        <div class="setup-body">
          <div class="code-block">
            <div class="cmd">cd backend</div>
            <div class="cmd">python3 -m venv venv</div>
            <div class="cmd">source venv/bin/activate</div>
            <div class="cmd">pip install -r requirements.txt</div>
            <div class="cmd">python manage.py migrate</div>
            <div class="cmd">python manage.py runserver</div>
          </div>
          <div class="url-badge">🟢 http://localhost:8000</div>
        </div>
      </div>

      <div class="setup-card">
        <div class="setup-header">
          <div class="dot" style="background:#ef4444"></div>
          <div class="dot" style="background:#f59e0b"></div>
          <div class="dot" style="background:#10b981"></div>
          &nbsp;&nbsp;Frontend Setup
        </div>
        <div class="setup-body">
          <div class="code-block">
            <div class="cmd">cd frontend</div>
            <div class="cmd">npm install</div>
            <div class="cmd">cp .env.example .env.local</div>
            <div class="cmd">npm run dev</div>
          </div>
          <div class="url-badge">🟢 http://localhost:3000</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ROADMAP -->
<section id="roadmap">
  <div class="container">
    <div class="reveal">
      <div class="section-label">Future Enhancements</div>
      <h2 class="section-title">What's coming<br>next</h2>
    </div>

    <div class="roadmap-grid reveal">
      <div class="roadmap-item">Approval Workflow</div>
      <div class="roadmap-item">Purchase Orders</div>
      <div class="roadmap-item">Invoice Management</div>
      <div class="roadmap-item">PDF Generation</div>
      <div class="roadmap-item">Email Notifications</div>
      <div class="roadmap-item">AI Vendor Recommendation</div>
      <div class="roadmap-item">Procurement Analytics</div>
      <div class="roadmap-item">Vendor Performance Scoring</div>
    </div>
  </div>
</section>

<!-- AUTHOR -->
<div class="author-section">
  <div class="container" style="display:flex;justify-content:center;">
    <div class="author-card reveal">
      <div class="author-avatar">SP</div>
      <div>
        <div class="author-name">Shaiv Patel</div>
        <div class="author-role" style="margin-top:6px;">Computer Engineering Student</div>
        <div class="author-role" style="margin-top:4px;">Built at Procurement & Vendor Management Hackathon</div>
      </div>
    </div>
  </div>
</div>

<footer>
  <div class="container">
    <p class="footer-text">
      <span>VendorBridge</span> — Built with Next.js + Django REST + TypeScript<br>
      <span style="font-size:10px;color:#334155;margin-top:8px;display:block;">⭐ Star this repository if you found it useful</span>
    </p>
  </div>
</footer>

<script>
  // Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx - 6 + 'px';
    cursor.style.top = my - 6 + 'px';
  });
  function animateRing() {
    rx += (mx - rx - 20) * 0.12;
    ry += (my - ry - 20) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .feature-card, .workflow-step').forEach((el, i) => {
    if (el.classList.contains('feature-card')) {
      el.style.transitionDelay = (i % 6) * 80 + 'ms';
    }
    observer.observe(el);
  });
</script>
</body>
</html>
