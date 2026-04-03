"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
        >
          XT.dev
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors hover:text-[var(--accent)] ${
                  pathname === href
                    ? "text-[var(--accent)] border-b-2 border-[var(--accent)] pb-0.5"
                    : "text-[var(--foreground)]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[var(--foreground)] focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[var(--card-bg)] border-t border-[var(--border)] px-4 pb-4">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm font-medium transition-colors hover:text-[var(--accent)] ${
                    pathname === href
                      ? "text-[var(--accent)]"
                      : "text-[var(--foreground)]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
