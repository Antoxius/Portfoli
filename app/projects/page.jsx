import { FiBriefcase, FiExternalLink, FiGithub } from "react-icons/fi";
import { projects } from "@/lib/projects-data";

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-4">
        <FiBriefcase className="text-[var(--accent)]" size={24} />
        <h1 className="text-3xl font-bold">Projekter</h1>
      </div>
      <p className="text-slate-400 mb-12 max-w-2xl">
        Et udvalg af projekter, der viser mine færdigheder. Hvert projekt er
        bygget med fokus på ren arkitektur og pålidelig kode.
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
                <FiGithub size={16} /> Kode
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
