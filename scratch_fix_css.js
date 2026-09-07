const fs = require('fs');

const cssContent = `@import "tailwindcss";

@theme {
  --color-navy: #0C1220;
  --color-navy-light: #171F2E;
  --color-charcoal: #1B2432;
  --color-brand-red: #C8102E;
  --color-brand-red-dark: #A30D24;
  --color-ivory: #FAFAF7;
  --color-warm-white: #F7F6F3;
  --color-stone: #E8E6E1;
  --color-slate: #6B7280;
  --color-slate-light: #9CA3AF;
  --color-dark: #111827;
  --font-playfair: var(--font-playfair-display), Georgia, "Times New Roman", serif;
  --font-montserrat: var(--font-montserrat-var), system-ui, -apple-system, sans-serif;
}

@utility section-padding {
  padding-top: 6rem;
  padding-bottom: 6rem;

  @media (max-width: 768px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  background-color: #FAFAF7;
  color: #111827;
  font-family: var(--font-montserrat-var, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.7;
  font-size: 15px;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-playfair-display, Georgia, serif);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: inherit;
}

a {
  text-decoration: none;
  color: inherit;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #C8102E;
  color: #ffffff;
  font-family: var(--font-montserrat-var, system-ui, sans-serif);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 1rem 2rem;
  font-size: 0.75rem;
  border: none;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: none;
}

.btn-primary:hover {
  background-color: #A30D24;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(200, 16, 46, 0.2);
}

.btn-primary:active {
  background-color: #8B0A1E;
  transform: translateY(0);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: transparent;
  color: #111827;
  font-family: var(--font-montserrat-var, system-ui, sans-serif);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 1rem 2rem;
  font-size: 0.75rem;
  border: 1.5px solid #D1D5DB;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: #111827;
  background-color: #111827;
  color: #ffffff;
  transform: translateY(-1px);
}

.btn-secondary:active {
  background-color: #1B2432;
  border-color: #1B2432;
  color: #ffffff;
  transform: translateY(0);
}

.btn-accent-blue {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #111827;
  color: #ffffff;
  font-family: var(--font-montserrat-var, system-ui, sans-serif);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 1rem 2rem;
  font-size: 0.75rem;
  border: none;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.btn-accent-blue:hover {
  background-color: #1B2432;
  transform: translateY(-1px);
}

.tag-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background-color: #111827;
  color: #ffffff;
  font-family: var(--font-montserrat-var, system-ui, sans-serif);
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.3rem 0.65rem;
  border: 1px solid #111827;
  border-radius: 2px;
  transition: all 0.25s ease;
}

.tag-badge:hover {
  background-color: #1B2432;
  border-color: #1B2432;
  color: #ffffff;
}

a, button {
  transition: color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

:focus-visible {
  outline: 2px solid #C8102E;
  outline-offset: 3px;
  border-radius: 2px;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #9CA3AF; }

img { max-width: 100%; height: auto; }

::selection {
  background-color: #C8102E;
  color: #ffffff;
}
`;

fs.writeFileSync('app/globals.css', cssContent, { encoding: 'utf8', flag: 'w' });
console.log('Successfully updated app/globals.css with color: inherit');
