type Project = {
  title: string; desc: string; tech: string[];
  live: string; code: string; image?: string;
}

export default function ProjectCard(p: Project) {
  return (
    <article className="rounded-2xl border p-5 shadow-sm">
      <h3 className="text-lg font-bold">{p.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{p.desc}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {p.tech.map(t => (
          <span key={t} 
            className="text-xs rounded-full px-2 py-1
                      bg-neutral-200 text-neutral-800 border border-neutral-300
                      dark:bg-neutral-700 dark:text-neutral-200 dark:border-neutral-600"
          >
                    {t}</span>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        <a href={p.live} className="btn-primary">Live</a>
        <a href={p.code} className="btn-outline">Code</a>
      </div>
    </article>
  )
}

