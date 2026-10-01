'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function Header() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Close the dialog when pathname changes
    if (dialogRef.current?.open) {
      dialogRef.current.close();
      document.body.classList.remove('locked');
    }
  }, [pathname]);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setMenuOpen(true);
    document.body.classList.add('locked');
  };

  const closeMenu = () => {
    dialogRef.current?.close();
    document.body.classList.remove('locked');
    setMenuOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => { if (desktop.matches) dialogRef.current?.close(); };
    desktop.addEventListener('change', onResize);
    return () => { desktop.removeEventListener('change', onResize); document.body.classList.remove('locked'); };
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="brand" aria-label="B.H.T. Collections home">
            <span className="logo-crop">
              <Image src="/bht-flower-icon.png" alt="" width={68} height={68} className="absolute max-w-none left-[-14px] top-[-10px] lg:top-[-11px] object-contain w-[62px] h-[62px] lg:w-[68px] lg:h-[68px]" />
            </span>
            <span className="brand-name">
              B.H.T. COLLECTIONS<small>Blanket House Trading</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            <Link
              href="/collections"
              className={pathname.startsWith('/collections') ? 'active' : ''}
            >
              Collections
            </Link>
            <Link
              href="/about"
              className={`flex items-center min-h-[48px] text-[11px] font-medium relative after:absolute after:left-0 after:right-0 after:bottom-2 after:h-px after:bg-red after:origin-left after:transition-transform duration-200 ${pathname.startsWith('/about') ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
            >
              About
            </Link>
            <Link
              href="/brands-partners"
              className={`flex items-center min-h-[48px] text-[11px] font-medium relative after:absolute after:left-0 after:right-0 after:bottom-2 after:h-px after:bg-red after:origin-left after:transition-transform duration-200 ${pathname.startsWith('/brands-partners') ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
            >
              Brand &amp; Partners
            </Link>
            <Link
              href="/region"
              className={`flex items-center min-h-[48px] text-[11px] font-medium relative after:absolute after:left-0 after:right-0 after:bottom-2 after:h-px after:bg-red after:origin-left after:transition-transform duration-200 ${pathname.startsWith('/region') ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
            >
              Region
            </Link>
          </nav>

          <div className="flex gap-2.5">
            <div className="hidden lg:block">
            <Button href="/contact" className="px-5 py-[11px] min-h-[44px]">
              Enquire
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[15px] h-[15px] fill-none stroke-current stroke-[2] ml-2">
                <path d="M4 12h15m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
            </div>
            <button
              className="lg:hidden inline-flex items-center justify-center w-[46px] h-[46px] border border-border bg-transparent rounded-full hover:bg-ink hover:text-ivory hover:border-ink transition-colors"
              id="menu-open"
              aria-label="Open navigation"
              aria-haspopup="dialog"
              aria-controls="menu-dialog"
              aria-expanded={menuOpen}
              ref={triggerRef}
              onClick={openMenu}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-none stroke-current stroke-[2]">
                <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <dialog
        className="fixed inset-[var(--header)_0_0] m-0 max-w-none w-full max-h-none h-[calc(100dvh-var(--header))] border-0 p-7 px-6 bg-ivory backdrop:bg-[#172c2666]"
        id="menu-dialog"
        aria-labelledby="menu-title"
        ref={dialogRef}
        onClose={() => { document.body.classList.remove('locked'); setMenuOpen(false); }}
        onClick={(event) => { if ((event.target as HTMLElement).closest('a')) closeMenu(); }}
      >
        <div className="flex justify-between items-center mb-7">
          <span className="block text-[10px] md:text-[11px] font-semibold leading-relaxed tracking-[0.15em] uppercase text-red" id="menu-title">Explore B.H.T.</span>
          <button
            className="inline-flex items-center justify-center w-[46px] h-[46px] border border-border bg-transparent rounded-full hover:bg-ink hover:text-ivory hover:border-ink transition-colors"
            data-close="menu-dialog"
            aria-label="Close navigation"
            onClick={closeMenu}
          >
            ✕
          </button>
        </div>
        <nav aria-label="Mobile navigation" className="grid gap-0">
          <Link href="/" className="font-serif font-medium text-[30px] leading-[1.3] py-5 border-b border-border text-ink">Home</Link>
          <Link href="/collections" className="font-serif font-medium text-[30px] leading-[1.3] py-5 border-b border-border text-ink">Collections</Link>
          <Link href="/about" className="font-serif font-medium text-[30px] leading-[1.3] py-5 border-b border-border text-ink">About</Link>
          <Link href="/brands-partners" className="font-serif font-medium text-[30px] leading-[1.3] py-5 border-b border-border text-ink">Brand &amp; Partners</Link>
          <Link href="/region" className="font-serif font-medium text-[30px] leading-[1.3] py-5 border-b border-border text-ink">Region</Link>
        </nav>
        <Button href="/contact" className="mt-8 w-full">Enquire →</Button>
      </dialog>
    </>
  );
}
