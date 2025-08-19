// app/page.tsx
import { BlogPosts } from 'app/components/posts'
import TypingText from 'app/components/typingtext'
import FadeCarousel from './components/fade'
import ProjectCard from './components/projectcard'

const projects = [
  {
    title: 'My Portfolio',
    desc: 'Next.js / TypeScript / Tailwindで作成したポートフォリオサイトです。',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    live: 'https://my-portfolio-k1el5agwf-m-lakelabs-projects.vercel.app',
    code: 'https://github.com/m-lakelabs/my-portfolio',
  },  
]

function ProjectList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  )
}

export default function Page() {
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

        <div className="my-8">
          <BlogPosts />
        </div>
      </section>
    </div>
  )
}