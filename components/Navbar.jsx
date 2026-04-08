"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/about", label: "Om mig" },
  { href: "/projects", label: "Projekter" },
  { href: "/contact", label: "Kontakt" },
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
        <div className="hidden md:flex items-center gap-6">
          <a
            href="/Xenius_Tolderlund_CV.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <FiDownload size={16} />
            Hent cv
          </a>
          <ul className="flex gap-6">
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
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[var(--foreground)] focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Skift menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[var(--card-bg)] border-t border-[var(--border)] px-4 pb-4">
          <ul className="flex flex-col gap-4 pt-4">
            <li>
              <a
                href="/Xenius_Tolderlund_CV.pdf"
                download
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
              >
                <FiDownload size={16} />
                Hent cv
              </a>
            </li>
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
