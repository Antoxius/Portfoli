import Link from "next/link";
import { homeContent } from "@/lib/home-content";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiCode,
  FiArrowRight,
  FiDownload,
  FiStar,
} from "react-icons/fi";
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
} from "react-icons/si";

const skills = [
  { icon: SiJavascript, label: "JavaScript", color: "text-yellow-400" },
  { icon: SiReact, label: "React", color: "text-cyan-400" },
  { icon: SiNextdotjs, label: "Next.js", color: "text-white" },
  { icon: SiTailwindcss, label: "Tailwind CSS", color: "text-teal-400" },
  { icon: SiNodedotjs, label: "Node.js", color: "text-green-400" },
  { icon: SiPostgresql, label: "PostgreSQL", color: "text-sky-400" },
];

function renderContentItem(item) {
  if (item.type === "code") {
    return (
      <pre className="mt-4 overflow-x-auto rounded-lg bg-[#111827] p-4 text-xs text-slate-200">
        <code>{item.body}</code>
      </pre>
    );
  }

  return <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.body}</p>;
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-16 flex flex-col items-start gap-6">
        <span className="text-sm font-semibold tracking-widest text-[var(--accent)] uppercase">
          Hej, jeg er
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Xenius <span className="text-[var(--accent)]">Tolderlund</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl">
          Nyuddannet frontend-udvikler med passion for at bygge{" "}
          <span className="text-[var(--foreground)] font-semibold">
            rene og engagerende
          </span>{" "}
          weboplevelser.
        </p>

        <div className="flex flex-wrap gap-4 mt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold transition-colors"
          >
            Se projekter <FiArrowRight />
          </Link>
          <a
            href="/Xenius_Tolderlund_CV.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] font-semibold transition-colors"
          >
            Download CV <FiDownload />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] font-semibold transition-colors"
          >
            Kontakt mig <FiMail />
          </Link>
        </div>

        <div className="flex gap-5 mt-2">
          <a
            href="https://github.com/Antoxius"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-[var(--accent)] transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={22} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-[var(--accent)] transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={22} />
          </a>
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-[var(--border)]">
        <div className="flex items-center gap-3 mb-10">
          <FiCode className="text-[var(--accent)]" size={24} />
          <h2 className="text-2xl font-bold">Teknologier</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {skills.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 p-5 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
            >
              <Icon size={36} className={color} />
              <span className="text-sm font-medium text-slate-300">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-[var(--border)]">
        <div className="flex items-center gap-3 mb-4">
          <FiStar className="text-[var(--accent)]" size={24} />
          <h2 className="text-2xl font-bold">Udvalgt Arbejde</h2>
        </div>
        <p className="mb-10 max-w-2xl text-slate-400">
          Et kort indblik i, hvordan jeg bygger moderne webloesninger med fokus paa enkel deployment og stabil drift.
        </p>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {homeContent.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs uppercase tracking-wide text-slate-400">
                  {item.type}
                </span>
              </div>
              {item.language && (
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                  {item.language}
                </p>
              )}
              {renderContentItem(item)}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
