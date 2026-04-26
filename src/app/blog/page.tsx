import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Metadata } from 'next'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog Nghệ Thuật Khung Tranh | Thiên Phúc',
  description: 'Chia sẻ kiến thức, kinh nghiệm chọn khung tranh, bảo quản tranh và các xu hướng trang trí nội thất mới nhất.',
}

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="bg-[#2c241b] text-white py-20 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— CHIA SẺ KIẾN THỨC —</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            Blog <span className="text-accent italic font-light">Thiên Phúc</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Nơi chia sẻ những bí quyết chọn khung, cách bảo quản tác phẩm và những xu hướng nghệ thuật trang trí không gian sống.
          </p>
        </div>
      </section>

      {/* 2. Blog List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {blogs.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Hiện chưa có bài viết nào. Vui lòng quay lại sau!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link 
                  href={`/blog/${blog.id}`} 
                  key={blog.id} 
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border flex flex-col"
                >
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <Image 
                      src={blog.image_url} 
                      alt={blog.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs text-accent font-bold uppercase tracking-wider mb-2">
                      {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                    <h2 className="text-xl font-bold font-serif text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {blog.title}
                    </h2>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                      {blog.excerpt}
                    </p>
                    <span className="text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                      Đọc tiếp <span>&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
