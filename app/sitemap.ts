import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://…/','lastModified': new Date() },
    { url: 'https://…/projects','lastModified': new Date() },
    { url: 'https://…/contact','lastModified': new Date() },
  ]
}