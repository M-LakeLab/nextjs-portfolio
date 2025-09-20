// app/page.tsx
import { BlogPosts } from 'app/components/posts'
import TypingText from 'app/components/typingtext'
import FadeCarousel from './components/fade'
import Link from 'next/link'
import { getBlogPosts } from 'app/blog/utils'

// ---- Projects (inline component & data) ----
type Project = {
  title: string
  description: string
  href: string
  tags?: string[]
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      className="block rounded-xl border p-4 hover:shadow-md transition"
      target="_blank"
      rel="noreferrer noopener"
    >
      <h3 className="font-semibold tracking-tight">{project.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
      {project.tags?.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-xs bg-gray-100 px-2 py-0.5 rounded border"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </a>
  )
}

const projects: Project[] = [
  {
    title: 'ファイル名リネーマー (Python/Tkinter)',
    description:
      '画像や動画のファイル名を一括で連番・規則名に変換するデスクトップツール。UIはTkinter、ドラッグ&ドロップ対応。',
    href: 'https://github.com/M-LakeLab/rename-app',
    tags: ['Python', 'Tkinter', 'Desktop'],
  },
  {
    title: 'Next.js ポートフォリオ',
    description: 'このサイト。Markdownブログ／RSS／Sitemap／カルーセルを実装。',
    href: 'https://github.com/M-LakeLab',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
  },
]
// ---- /Projects ----


// ---- Page Component ----
export default async function Page() {
  const latest = getBlogPosts().reverse().slice(0, 3)
  return (
    <div className="flex flex-col items-center">
      {/* カルーセル */}
      <FadeCarousel
        slides={[
          { src: '/images/slide1.jpg', alt: 'Slide 1' },
          { src: '/images/slide2.jpg', alt: 'Slide 2' },
          { src: '/images/slide3.jpg', alt: 'Slide 3' },
        ]}
        durationMs={5000}
        fadeMs={1000}
        className="w-full max-w-3xl mb-8"
      />

      {/* セクションは return の中に！ */}
      <section className="w-full max-w-3xl px-4">
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          My Portfolio
        </h1>

        <p className="mb-4">
          <TypingText text="ようこそ、私のポートフォリオへ！" speed={80} />
          <br />
          私が今学習していること、学んだことを書いていきます！<br />
          ぜひご覧ください！<br />
        </p>  

                {/* Latest blog posts (3 items) */}
        <div className="my-8">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">Latest Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {latest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-xl border p-4 hover:shadow-md transition"
              >
                <h3 className="font-medium leading-snug line-clamp-2">{post.metadata.title}</h3>
                <p className="mt-2 text-xs text-gray-500">
                  {new Date(post.metadata.publishedAt).toLocaleDateString('ja-JP')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
                            {/* Projects */}
      <section className="w-full max-w-3xl px-4 mt-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </section>
    </div>
  )
}