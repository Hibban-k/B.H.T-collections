'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Close the dialog when pathname changes
    if (dialogRef.current?.open) {
      dialogRef.current.close();
      document.body.classList.remove('locked');
    }
  }, [pathname]);

  const openMenu = () => {
    dialogRef.current?.showModal();
    document.body.classList.add('locked');
  };

  const closeMenu = () => {
    dialogRef.current?.close();
    document.body.classList.remove('locked');
  };

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="brand" aria-label="B.H.T. Collections home">
            <span className="logo-crop">
              <Image src="/reference-logo-lockup.png" alt="" width={68} height={68} />
            </span>
            <span className="brand-name">
              B.H.T. COLLECTIONS<small>Blanket House Trading</small>
            </span>
          </Link>
          
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link 
              href="/collections" 
              data-nav="collections"
              aria-current={pathname.startsWith('/collections') ? 'page' : undefined}
            >
              Collections
            </Link>
            <Link 
              href="/about" 
              data-nav="about"
              aria-current={pathname.startsWith('/about') ? 'page' : undefined}
            >
              About
            </Link>
            <Link 
              href="/brands-partners" 
              data-nav="brands-partners"
              aria-current={pathname.startsWith('/brands-partners') ? 'page' : undefined}
            >
              Brand &amp; Partners
            </Link>
            <Link 
              href="/region" 
              data-nav="region"
              aria-current={pathname.startsWith('/region') ? 'page' : undefined}
            >
              Region
            </Link>
          </nav>
          
          <div className="header-actions">
            <Link className="btn" href="/contact">
              Enquire{' '}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <button 
              className="icon-btn menu-trigger" 
              id="menu-open" 
              aria-label="Open navigation" 
              aria-haspopup="dialog"
              onClick={openMenu}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 7h18M3 12h18M3 17h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <dialog 
        className="menu-dialog" 
        id="menu-dialog" 
        aria-labelledby="menu-title"
        ref={dialogRef}
      >
        <div className="dialog-top">
          <span className="eyebrow" id="menu-title">Explore B.H.T.</span>
          <button 
            className="icon-btn" 
            data-close="menu-dialog" 
            aria-label="Close navigation"
            onClick={closeMenu}
          >
            ✕
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          <Link href="/">Home</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/about">About</Link>
          <Link href="/brands-partners">Brand &amp; Partners</Link>
          <Link href="/region">Region</Link>
        </nav>
        <Link href="/contact" className="btn">Enquire →</Link>
      </dialog>
    </>
  );
}
