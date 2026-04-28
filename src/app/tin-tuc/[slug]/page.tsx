import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { Calendar, User, ArrowLeft, Tag, HelpCircle, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export const revalidate = 3600 // Cache trang chi tiết, cập nhật mỗi giờ
export const dynamicParams = true // Cho phép truy cập các slug chưa được pre-render

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    where: { is_published: true },
    select: { slug: true },
    take: 10 // Pre-render 10 bài mới nhất để tối ưu tốc độ load đầu tiên
  })
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blog = await prisma.blog.findFirst({ 
    where: { 
      OR: [
        { slug: params.slug },
        { id: params.slug }
      ]
    } 
  })
  if (!blog) return { title: 'Không tìm thấy bài viết' }
  
  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description || blog.excerpt,
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt,
      images: [blog.image_url],
      type: 'article',
    }
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const blog = await prisma.blog.findFirst({ 
    where: { 
      OR: [
        { slug: params.slug },
        { id: params.slug }
      ]
    }
  })
  
  if (!blog) {
    notFound()
  }

  // Fetch featured products
  const featuredProducts = await prisma.service.findMany({
    where: {
      id: { in: blog.featured_product_ids as string[] }
    }
  })

  // JSON-LD Schema
  const schemas: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      image: blog.image_url,
      description: blog.excerpt,
      datePublished: blog.published_at.toISOString(),
      author: {
        '@type': 'Organization',
        name: blog.author || 'Thiên Phúc',
      },
    }
  ]

  if (blog.schema_type === 'FAQ' && blog.faq_items) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (blog.faq_items as any[]).map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a
        }
      }))
    })
  }

  if (blog.schema_type === 'HowTo' && blog.howto_steps) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: blog.title,
      step: (blog.howto_steps as any[]).map((step, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: step.name,
        text: step.text
      }))
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      {/* 1. Article Header */}
      <section className="bg-secondary/30 py-16 border-b border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Link href="/tin-tuc" className="flex items-center gap-2 text-sm text-primary font-bold mb-8 hover:-translate-x-1 transition-transform group">
            <ArrowLeft size={16} className="group-hover:scale-110 transition-transform" /> Quay lại Tin tức
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-primary/20">
            <Tag size={12} /> {blog.category}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-foreground mb-8 leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap gap-8 text-sm text-muted-foreground border-t border-border pt-8">
            <span className="flex items-center gap-2 font-medium">
              <Calendar size={18} className="text-accent" /> {new Date(blog.published_at).toLocaleDateString('vi-VN')}
            </span>
            <span className="flex items-center gap-2 font-medium">
              <User size={18} className="text-accent" /> Bởi {blog.author}
            </span>
            <span className="flex items-center gap-2 font-medium italic">
              ✨ {blog.read_time}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col lg:flex-row gap-16">
          
          {/* Article Body */}
          <article className="lg:w-2/3">
            <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl border border-border/50 relative aspect-video group">
              <Image 
                src={blog.image_url} 
                alt={blog.image_alt || blog.title} 
                fill 
                sizes="(max-width: 1024px) 100vw, 800px"
                priority 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            
            <div 
              className="prose prose-lg max-w-none prose-serif text-muted-foreground leading-relaxed ql-editor mb-16"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Schema Sections (FAQ/HowTo) */}
            {blog.schema_type === 'FAQ' && blog.faq_items && (
              <div className="mt-12 p-8 bg-secondary/20 rounded-3xl border border-border">
                <h3 className="text-2xl font-bold font-serif mb-8 flex items-center gap-3">
                  <HelpCircle className="text-primary" /> Câu hỏi thường gặp
                </h3>
                <div className="space-y-6">
                  {(blog.faq_items as any[]).map((faq, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-border/50">
                      <p className="font-bold text-foreground mb-2 text-lg">Q: {faq.q}</p>
                      <p className="text-muted-foreground leading-relaxed">A: {faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {blog.schema_type === 'HowTo' && blog.howto_steps && (
              <div className="mt-12 p-8 bg-primary/5 rounded-3xl border border-primary/10">
                <h3 className="text-2xl font-bold font-serif mb-8 flex items-center gap-3 text-primary">
                  <CheckCircle2 /> Hướng dẫn thực hiện
                </h3>
                <div className="space-y-10">
                  {(blog.howto_steps as any[]).map((step, i) => (
                    <div key={i} className="relative pl-12 border-l-2 border-primary/20 pb-2 last:pb-0">
                      <div className="absolute top-0 left-0 -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-black text-sm shadow-lg">
                        {i + 1}
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-3">{step.name}</h4>
                      <p className="text-muted-foreground leading-relaxed italic">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-20 p-10 bg-gradient-to-br from-[#2c241b] to-black text-white rounded-3xl shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               <div className="relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-md">
                    <h3 className="text-2xl font-bold font-serif mb-2">Cần tư vấn sâu hơn?</h3>
                    <p className="text-gray-400">Đội ngũ chuyên gia Thiên Phúc luôn sẵn sàng hỗ trợ bạn qua Zalo hoặc Hotline 24/7.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <a 
                      href="https://zalo.me/0123456789" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-[#0068ff] text-white font-black rounded-xl hover:bg-[#0056d2] transition-all shadow-xl uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={20} /> Zalo Tư Vấn
                    </a>
                    <Link href={blog.cta_link || '/#contact'} className="px-8 py-4 bg-accent text-white font-black rounded-xl hover:bg-white hover:text-primary transition-all shadow-xl uppercase tracking-widest whitespace-nowrap text-center">
                      {blog.cta_text || 'Nhận tư vấn ngay'}
                    </Link>
                  </div>
               </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-12">
            {/* Featured Services */}
            {featuredProducts.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-border shadow-xl sticky top-28">
                <h3 className="text-xl font-bold font-serif mb-8 text-foreground pb-4 border-b-2 border-primary/20 flex items-center gap-2">
                  <TrendingUp className="text-primary" size={20} /> Dịch vụ liên quan
                </h3>
                <div className="space-y-6">
                  {featuredProducts.map((p) => (
                    <Link href={`/dich-vu/${p.slug}`} key={p.id} className="group flex gap-5 items-center">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-border relative shadow-md">
                        <Image src={p.image_url} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-primary uppercase mb-1">{p.category}</p>
                        <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {p.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>

        </div>
      </section>
    </div>
  )
}

import { TrendingUp, MessageCircle } from 'lucide-react'
