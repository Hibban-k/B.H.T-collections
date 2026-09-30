import React from 'react';
import Link from 'next/link';

interface SectionTitleProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  linkText?: React.ReactNode;
  linkHref?: string;
  className?: string;
  dark?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  linkText,
  linkHref,
  className = '',
  dark = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-10 ${className}`}>
      {eyebrow && (
        <span className={`block text-[11px] font-semibold leading-[1.5] tracking-[0.15em] uppercase mb-[18px] ${dark ? 'text-muted-light' : 'text-red'}`}>
          {eyebrow}
        </span>
      )}
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-[22px] md:gap-[28px]">
        <div className="max-w-[650px] w-full">
          {typeof title === 'string' ? (
            <h2 className={`font-serif font-medium tracking-[-0.035em] text-[clamp(30px,3.65vw,48px)] leading-[1.18] ${dark ? 'text-ivory' : 'text-ink'}`}>
              {title}
            </h2>
          ) : (
            title
          )}
        </div>
        
        {subtitle && (
          <p className={`hidden md:block max-w-[35ch] text-[14px] ${dark ? 'text-muted-light' : 'text-body'}`}>
            {subtitle}
          </p>
        )}
        
        {linkText && linkHref && (
          <div className="flex items-center gap-[5px] self-end md:self-auto">
            <Link 
              href={linkHref}
              className={`inline-flex items-center gap-[8px] md:gap-[18px] min-h-[44px] text-[10px] md:text-[13px] font-medium underline decoration-1 underline-offset-[6px] whitespace-nowrap transition-colors ${dark ? 'text-ivory hover:text-muted-light' : 'text-ink hover:text-red'}`}
            >
              {linkText}
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[15px] md:w-[19px] h-[15px] md:h-[19px] flex-shrink-0">
                <path d="M4 12h15m-6-6 6 6-6 6"/>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
