import { FiBriefcase, FiExternalLink, FiGithub } from "react-icons/fi";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "This very portfolio – built with Next.js App Router, TailwindCSS, React Icons, and Zod for contact-form validation.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Zod"],
    github: "https://github.com/Antoxius/Portfoli",
    live: "/",
  },
  {
    title: "Task Manager API",
    description:
      "A RESTful API for managing tasks and projects with user authentication, built with Node.js, Express, and PostgreSQL.",
    tags: ["Node.js", "Express", "PostgreSQL", "JWT"],
    github: "https://github.com/Antoxius",
    live: null,
  },
  {
    title: "E-Commerce Store",
    description:
      "A full-stack e-commerce application with product listings, shopping cart, and Stripe payment integration.",
    tags: ["React", "Next.js", "Stripe", "Prisma"],
    github: "https://github.com/Antoxius",
    live: null,
  },
  {
    title: "Real-Time Chat App",
    description:
      "A real-time chat application with rooms, private messages, and emoji support using Socket.io.",
    tags: ["React", "Socket.io", "Node.js", "MongoDB"],
    github: "https://github.com/Antoxius",
    live: null,
  },
  {
    title: "Weather Dashboard",
    description:
      "A weather dashboard fetching real-time data from OpenWeatherMap API with a clean, responsive UI.",
    tags: ["React", "TypeScript", "API Integration"],
    github: "https://github.com/Antoxius",
    live: null,
  },
  {
    title: "CLI Dev Tools",
    description:
      "A collection of developer productivity command-line tools written in TypeScript for automating common tasks.",
    tags: ["TypeScript", "Node.js", "CLI"],
    github: "https://github.com/Antoxius",
    live: null,
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-4">
        <FiBriefcase className="text-[var(--accent)]" size={24} />
        <h1 className="text-3xl font-bold">Projects</h1>
      </div>
      <p className="text-slate-400 mb-12 max-w-2xl">
        A selection of projects that demonstrate my skills. Each one is built
        with a focus on clean architecture and reliable code.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm text-slate-400 flex-1 leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-[var(--background)] border border-[var(--border)] text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 mt-auto">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-[var(--accent)] transition-colors"
              >
                <FiGithub size={16} /> Code
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-[var(--accent)] transition-colors"
                >
                  <FiExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
