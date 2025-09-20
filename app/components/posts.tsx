

import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-lg border border-neutral-200 dark:border-neutral-800 
                       p-4 shadow-sm hover:shadow-md transition-shadow
                       bg-white dark:bg-neutral-900"
          >
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.metadata.title}
            </h2>
            {post.metadata.summary && (
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 line-clamp-3">
                {post.metadata.summary}
              </p>
            )}
          </Link>
        ))}
    </div>
  )
}