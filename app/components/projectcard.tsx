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
          <span key={t} className="text-xs rounded-full border px-2 py-1">{t}</span>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        <a href={p.live} className="btn-primary">Live</a>
        <a href={p.code} className="btn-outline">Code</a>
      </div>
    </article>
  )
}