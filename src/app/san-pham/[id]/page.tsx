import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { Phone, CheckCircle2, MessageSquare } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const revalidate = 3600

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product) return { title: 'Không tìm thấy sản phẩm' }
  
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | Khung Tranh Thiên Phúc`,
      description: product.description,
      images: [product.image_url],
    }
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await prisma.product.findUnique({ where: { id: params.id } })
  
  if (!product) {
    notFound()
  }

  // JSON-LD Product Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image_url,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Thiên Phúc',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
    },
  }


  // Fetch related products (same category, exclude current)
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id }
    },
    take: 4
  })

  // Dynamic list of details based on description lines
  const detailsList = product.description.split('\n').filter(line => line.trim().length > 0)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. Breadcrumbs & Hero */}
      <section className="bg-[#2c241b] text-white py-16 relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image src={product.image_url} alt="" fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c241b] to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="text-sm text-gray-400 mb-6 flex justify-center gap-2">
            <Link href="/" className="hover:text-accent transition-colors">Trang Chủ</Link>
            <span>/</span>
            <Link href="/#products" className="hover:text-accent transition-colors">Sản Phẩm</Link>
            <span>/</span>
            <span className="text-white">{product.title}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            {product.title}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Bộ sưu tập {product.category} cao cấp từ Thiên Phúc. Sự lựa chọn hoàn hảo để tôn vinh nghệ thuật.
          </p>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col lg:flex-row gap-12">
          
          {/* Left Column (Details & Images) */}
          <div className="lg:w-2/3 space-y-10">
            <div>
              <h2 className="text-2xl font-bold font-serif text-foreground mb-6 pb-2 border-b border-border inline-block">Chi Tiết Sản Phẩm</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
              
              <ul className="space-y-3">
                {detailsList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground text-sm">
                    <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-serif text-foreground mb-6 pb-2 border-b border-border inline-block">Hình Ảnh Sản Phẩm</h2>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border relative aspect-video">
                <Image src={product.image_url} alt={product.title} fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:w-1/3 space-y-8">
            
            {/* Price Card */}
            <div className="bg-secondary/20 rounded-2xl p-6 border border-border shadow-sm sticky top-24">
              <h3 className="text-lg font-bold font-serif mb-2">Báo Giá Tham Khảo</h3>
              <p className="text-3xl font-bold text-primary mb-4">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
              </p>
              <p className="text-xs text-muted-foreground italic mb-6">
                * Giá có thể thay đổi tùy theo kích thước và yêu cầu cụ thể (bo viền, thay kính...). Liên hệ để có báo giá chuẩn xác nhất.
              </p>
              
              <div className="space-y-3">
                <a href="tel:0123456789" className="w-full bg-accent hover:bg-primary text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Phone size={18} /> Gọi Ngay: 0123.456.789
                </a>
                <a href="#contact" className="w-full bg-white hover:bg-secondary text-foreground font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 border border-border">
                  <MessageSquare size={18} /> Đăng Ký Tư Vấn
                </a>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="text-lg font-bold font-serif mb-4">Sản Phẩm Cùng Loại</h3>
                <div className="space-y-4">
                  {relatedProducts.map(rp => (
                    <Link href={`/san-pham/${rp.id}`} key={rp.id} className="flex gap-4 group items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-border relative">
                        <Image src={rp.image_url} alt={rp.title} fill className="object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">{rp.title}</h4>
                        <p className="text-xs text-primary font-medium mt-1">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(rp.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 3. Tư vấn miễn phí 24/7 (Form) */}
      <section id="contact" className="py-24 bg-gradient-to-b from-white to-secondary/40 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— LIÊN HỆ ĐẶT HÀNG —</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
            Tư vấn <span className="text-accent italic font-light">miễn phí</span> 24/7
          </h2>
          <p className="text-muted-foreground mb-10">Để lại thông tin, Thiên Phúc sẽ liên hệ tư vấn và báo giá trong vòng <strong>15 phút!</strong></p>

          <ContactForm />
        </div>
      </section>

    </div>
  )
}
