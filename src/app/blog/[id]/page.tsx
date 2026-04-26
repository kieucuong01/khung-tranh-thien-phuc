import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { Calendar, User, ArrowLeft } from 'lucide-react'

export const revalidate = 3600

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({ where: { id: params.id } })
  if (!blog) return { title: 'Không tìm thấy bài viết' }
  
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: `${blog.title} | Blog Thiên Phúc`,
      description: blog.excerpt,
      images: [blog.image_url],
      type: 'article',
    }
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const blog = await prisma.blog.findUnique({ where: { id: params.id } })
  
  if (!blog) {
    notFound()
  }

  // JSON-LD Blog Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    image: blog.image_url,
    description: blog.excerpt,
    datePublished: blog.createdAt.toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Thiên Phúc',
    },
  }


  // Fetch recent posts to show in sidebar
  const recentPosts = await prisma.blog.findMany({
    where: { id: { not: blog.id } },
    take: 5,
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. Article Header */}
      <section className="bg-secondary/30 py-12 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-primary font-bold mb-6 hover:-translate-x-1 transition-transform">
            <ArrowLeft size={16} /> Quay lại Blog
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-foreground mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-accent" /> {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
            </span>
            <span className="flex items-center gap-2">
              <User size={16} className="text-accent" /> Bởi Thiên Phúc
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col lg:flex-row gap-12">
          
          {/* Article Body */}
          <article className="lg:w-2/3">
            <div className="rounded-2xl overflow-hidden mb-10 shadow-lg border border-border">
              <img src={blog.image_url} alt={blog.title} className="w-full h-auto" />
            </div>
            
            <div 
              className="prose prose-lg max-w-none prose-serif text-muted-foreground leading-relaxed ql-editor"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-sm font-medium">
                Bạn thấy bài viết này hữu ích? Hãy chia sẻ cho mọi người nhé!
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-[#1877f2] text-white rounded-full text-sm font-bold shadow-md hover:opacity-90">Facebook</button>
                <button className="px-6 py-2 bg-[#0068ff] text-white rounded-full text-sm font-bold shadow-md hover:opacity-90">Zalo</button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-10">
            <div className="bg-secondary/20 rounded-2xl p-8 border border-border sticky top-24">
              <h3 className="text-xl font-bold font-serif mb-6 text-foreground pb-2 border-b border-primary/30">Bài viết mới nhất</h3>
              <div className="space-y-6">
                {recentPosts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Đang cập nhật...</p>
                ) : recentPosts.map((post) => (
                  <Link href={`/blog/${post.id}`} key={post.id} className="group flex gap-4 items-start">
                    <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 border border-border">
                      <img src={post.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </section>
    </div>
  )
}
