import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'light' | 'outline' | 'text';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-6 min-h-[48px] px-6 py-3.5 rounded text-xs leading-[1.5] font-semibold transition-colors border";
  
  const variants = {
    primary: "bg-red text-white hover:bg-red-hover active:bg-red-active border-transparent",
    light: "bg-ivory text-forest hover:bg-linen border-transparent",
    outline: "bg-transparent text-ink border-control hover:border-ink hover:bg-linen",
    text: "min-h-[44px] px-0 gap-[18px] text-[13px] font-medium underline decoration-1 underline-offset-[6px] hover:text-red border-none bg-transparent inline-flex items-center"
  };

  const combinedClasses = `${variant === 'text' ? variants.text : `${baseClasses} ${variants[variant]}`} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
