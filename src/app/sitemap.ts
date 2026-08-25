import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const SITE_URL = 'https://www.makhanaghar.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  // ── Static pages ──────────────────────────────────────────────
  const staticPages = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/about-us', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact-us', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/categories', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/gallery', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/refund-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms-and-conditions', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/faqs', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/testimonials', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/distributor', priority: 0.7, changeFrequency: 'monthly' as const },
  ]

  for (const page of staticPages) {
    entries.push({
      url: `${SITE_URL}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  }

  // ── Dynamic pages from Payload CMS ────────────────────────────
  try {
    const payload = await getPayload({ config: configPromise })

    // Products
    const products = await payload.find({
      collection: 'products',
      limit: 1000,
      select: { slug: true, updatedAt: true },
    })

    for (const product of products.docs) {
      entries.push({
        url: `${SITE_URL}/product/${(product as any).slug}`,
        lastModified: new Date((product as any).updatedAt),
        changeFrequency: 'weekly',
        priority: 0.9,
      })
    }

    // Blogs
    const blogs = await payload.find({
      collection: 'blogs',
      limit: 1000,
      select: { slug: true, updatedAt: true },
    })

    for (const blog of blogs.docs) {
      entries.push({
        url: `${SITE_URL}/blog/${(blog as any).slug}`,
        lastModified: new Date((blog as any).updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  } catch {
    // Database may not be available during build — skip dynamic entries
  }

  return entries
}
