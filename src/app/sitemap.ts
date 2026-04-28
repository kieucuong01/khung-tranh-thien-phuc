import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ketoanthienphuc.vn' // Thay bằng domain thật khi deploy

  // Fetch dynamic routes with error handling for build time
  let serviceUrls: any[] = []
  let newsUrls: any[] = []

  try {
    const services = await prisma.service.findMany({ select: { slug: true } })
    const blogs = await prisma.blog.findMany({ select: { id: true } })

    serviceUrls = services.map((s) => ({
      url: `${baseUrl}/dich-vu/${s.slug}`,
      lastModified: new Date(),
    }))

    newsUrls = blogs.map((b) => ({
      url: `${baseUrl}/tin-tuc/${b.id}`,
      lastModified: new Date(),
    }))
  } catch (error) {
    console.error('Sitemap build-time database connection skipped')
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dich-vu`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...serviceUrls,
    ...newsUrls,
  ]
}
