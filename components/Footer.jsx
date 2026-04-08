import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--card-bg)] border-t border-[var(--border)] py-6 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          © {year} Xenius Tolderlund. Alle rettigheder forbeholdes.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/Antoxius"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-slate-400 hover:text-[var(--accent)] transition-colors"
          >
            <FiGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/xenius-tolderlund-6a88b639a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-slate-400 hover:text-[var(--accent)] transition-colors"
          >
            <FiLinkedin size={20} />
          </a>
          <a
            href="mailto:xenius@example.com"
            aria-label="E-mail"
            className="text-slate-400 hover:text-[var(--accent)] transition-colors"
          >
            <FiMail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
