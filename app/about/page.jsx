import { FiUser, FiDownload } from "react-icons/fi";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiGit,
  SiDocker,
} from "react-icons/si";

const techStack = [
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiReact, label: "React" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: SiNodedotjs, label: "Node.js" },
  { icon: SiPostgresql, label: "PostgreSQL" },
  { icon: SiGit, label: "Git" },
  { icon: SiDocker, label: "Docker" },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <FiUser className="text-[var(--accent)]" size={24} />
        <h1 className="text-3xl font-bold">About Me</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Bio */}
        <div className="space-y-5 text-slate-300 leading-relaxed">
          <p>
            Hi! I&apos;m <span className="text-white font-semibold">Xenius Tolderlund</span>,
            a newly graduated front-end developer with a passion for crafting
            clean, accessible, and visually engaging web experiences.
          </p>
          <p>
            I focus on building modern user interfaces using React and Next.js,
            with a strong eye for design and a commitment to writing
            maintainable, well-structured code.
          </p>
          <p>
            When I&apos;m not coding, you can find me exploring new front-end
            tools and frameworks, working on personal projects, or enjoying a
            good cup of coffee.
          </p>
          <a
            href="/cv.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold transition-colors text-sm"
          >
            <FiDownload size={16} />
            Download CV
          </a>
        </div>

        {/* Skills grid */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-white">
            Technologies I Work With
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {techStack.map(({ icon: Icon, label }) => (
              <div
                key={label}
                title={label}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
              >
                <Icon size={28} className="text-slate-200" />
                <span className="text-xs text-slate-400 text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-8 text-white">Experience</h2>
        <ol className="relative border-l border-[var(--border)] space-y-8 ml-4">
          {[
            {
              year: "2024 – Present",
              title: "Front-End Developer",
              org: "Freelance",
              desc: "Building responsive websites and UI components for clients using React, Next.js, and Tailwind CSS.",
            },
            {
              year: "2023 – 2024",
              title: "Front-End Internship",
              org: "Web Agency",
              desc: "Assisted in developing and maintaining client websites, focusing on HTML, CSS, JavaScript, and React.",
            },
            {
              year: "2021 – 2024",
              title: "Front-End Development Studies",
              org: "University",
              desc: "Graduated with a degree focused on web development, UI/UX principles, and modern JavaScript frameworks.",
            },
          ].map(({ year, title, org, desc }) => (
            <li key={year} className="ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)]">
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
              </span>
              <time className="text-xs font-semibold text-[var(--accent)]">
                {year}
              </time>
              <h3 className="text-base font-semibold text-white mt-0.5">
                {title} —{" "}
                <span className="text-slate-400 font-normal">{org}</span>
              </h3>
              <p className="mt-1 text-sm text-slate-400">{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
