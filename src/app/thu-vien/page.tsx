import prisma from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Thư Viện Tác Phẩm | Các Dự Án Đã Thực Hiện',
  description: 'Khám phá các tác phẩm khung tranh, khung ảnh nghệ thuật thực tế đã được gia công bởi Thiên Phúc.',
}

export default async function GalleryPage({ searchParams }: { searchParams: { category?: string } }) {
  const selectedCategory = searchParams.category

  const gallery = await prisma.galleryImage.findMany({
    where: selectedCategory ? { category: selectedCategory } : {},
    orderBy: { createdAt: 'desc' }
  })

  // Get all unique categories for the filter
  const allImages = await prisma.galleryImage.findMany({ select: { category: true } })
  const categories = Array.from(new Set(allImages.map(g => g.category)))

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      {/* 1. Header Section */}
      <section className="bg-[#2c241b] text-white py-16 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— GALLERY —</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            Thư Viện <span className="text-accent italic font-light">Tác Phẩm</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            Tổng hợp những hình ảnh thực tế các dự án chúng tôi đã hoàn thiện cho khách hàng và các studio nghệ thuật.
          </p>
        </div>
      </section>

      {/* 2. Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link 
              href="/thu-vien" 
              className={`px-6 py-2 rounded-full border text-sm font-bold transition-all ${
                !selectedCategory ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-muted-foreground border-border hover:border-primary hover:text-primary'
              }`}
            >
              Tất Cả
            </Link>
            {categories.map(cat => (
              <Link 
                key={cat}
                href={`/thu-vien?category=${encodeURIComponent(cat)}`} 
                className={`px-6 py-2 rounded-full border text-sm font-bold transition-all ${
                  selectedCategory === cat ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-muted-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {gallery.length === 0 ? (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                Chưa có hình ảnh nào trong danh mục này.
              </div>
            ) : (
              gallery.map((img) => (
                <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-muted shadow-sm">
                  <Image 
                    src={img.image_url} 
                    alt={img.title || "Tác phẩm đóng khung Thiên Phúc"}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay for title */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="text-white">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1">{img.category}</p>
                      <p className="text-sm font-bold font-serif line-clamp-2">{img.title || 'Dự án thực tế'}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center bg-secondary/20 p-10 rounded-3xl border border-border">
            <h3 className="text-2xl font-bold font-serif mb-4">Bạn thích mẫu khung nào?</h3>
            <p className="text-muted-foreground mb-8">Hãy gửi ảnh mẫu để chúng tôi tư vấn loại khung và báo giá tốt nhất cho bạn.</p>
            <Link href="/#contact" className="px-10 py-4 bg-primary text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all">
              Nhận Tư Vấn Ngay
            </Link>
          </div>

        </div>
      </section>

    </div>
  )
}
