import prisma from '@/lib/prisma'
import { Calendar, ArrowRight, Tag } from 'lucide-react'
import Image from 'next/image'
import CustomLink from 'next/link'

export const revalidate = 3600 // Tối ưu tốc độ: Cache trang trong 1 giờ, tự động cập nhật ngầm (ISR)

export default async function NewsPage({ 
  searchParams 
}: { 
  searchParams: { category?: string } 
}) {
  const currentCategory = searchParams.category
  
  const blogs = await prisma.blog.findMany({
    where: {
      is_published: true,
      ...(currentCategory ? { category: currentCategory } : {})
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      image_url: true,
      category: true,
      published_at: true,
      read_time: true
    },
    orderBy: { published_at: 'desc' }
  })

  const categories = [
    'Đăng ký kinh doanh',
    'Kế Toán',
    'Kiểm Toán',
    'Thuế',
    'BHXH',
    'Tài chính BDS',
    'Tuyển Dụng'
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <section className="bg-[#2c241b] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6 leading-tight">
              Tin Tức & <span className="text-accent italic">Kiến Thức</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed font-medium">
              Cập nhật những thông tin mới nhất về chính sách thuế, kế toán và kinh nghiệm quản trị doanh nghiệp từ các chuyên gia của Thiên Phúc.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & List */}
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-4">
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-16 justify-center">
            <CustomLink 
              href="/tin-tuc"
              className={`px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all shadow-md ${
                !currentCategory 
                ? 'bg-primary text-white shadow-primary/30 scale-105' 
                : 'bg-white text-muted-foreground hover:bg-secondary border border-border'
              }`}
            >
              Tất cả
            </CustomLink>
            {categories.map(cat => (
              <CustomLink 
                key={cat}
                href={`/tin-tuc?category=${encodeURIComponent(cat)}`}
                className={`px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all shadow-md ${
                  currentCategory === cat 
                  ? 'bg-primary text-white shadow-primary/30 scale-105' 
                  : 'bg-white text-muted-foreground hover:bg-secondary border border-border'
                }`}
              >
                {cat}
              </CustomLink>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-border">
                 <p className="text-muted-foreground text-lg">Chưa có bài viết nào trong chuyên mục này.</p>
              </div>
            ) : blogs.map(blog => (
              <article key={blog.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/50">
                <CustomLink href={`/tin-tuc/${blog.slug || blog.id}`} className="relative aspect-[16/10] overflow-hidden">
                  <Image 
                    src={blog.image_url} 
                    alt={blog.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={blogs.indexOf(blog) < 3}
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                     <span className="bg-primary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                       {blog.category}
                     </span>
                  </div>
                </CustomLink>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[10px] font-black text-accent uppercase tracking-widest mb-4">
                    <Calendar size={14} /> {new Date(blog.published_at).toLocaleDateString('vi-VN')}
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-foreground mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    <CustomLink href={`/tin-tuc/${blog.slug || blog.id}`}>
                      {blog.title}
                    </CustomLink>
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 text-sm mb-8 leading-relaxed font-medium">
                    {blog.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-border flex justify-between items-center">
                    <CustomLink href={`/tin-tuc/${blog.slug || blog.id}`} className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                      Xem chi tiết <ArrowRight size={16} />
                    </CustomLink>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter italic">✨ {blog.read_time || '5 phút đọc'}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
