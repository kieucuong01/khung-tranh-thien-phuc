import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://khungtranhthienphuc.vn' // Thay bằng domain thật khi deploy

  // Fetch dynamic routes
  const products = await prisma.product.findMany({ select: { id: true } })
  const blogs = await prisma.blog.findMany({ select: { id: true } })

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/san-pham/${p.id}`,
    lastModified: new Date(),
  }))

  const blogUrls = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.id}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/san-pham`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bang-gia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...productUrls,
    ...blogUrls,
  ]
}
