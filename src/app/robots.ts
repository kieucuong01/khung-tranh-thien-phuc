import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Không cho phép Google index trang quản trị
    },
    sitemap: 'https://khungtranhthienphuc.vn/sitemap.xml',
  }
}
