import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Phone, CheckCircle2, Truck, Clock, ShieldCheck, Quote, ChevronDown, MapPin, Mail, Instagram, Facebook } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import ProductCard from '@/components/ProductCard'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic' // Cập nhật lại mỗi giờ, tự động purge khi có thay đổi dữ liệu

export const metadata: Metadata = {
  title: 'Khung Tranh Thiên Phúc | Nghệ Thuật Khung Tranh Cao Cấp',
  description: 'Chuyên gia công khung tranh, khung ảnh nghệ thuật từ gỗ tự nhiên và composite cao cấp tại TP.HCM. Thiết kế miễn phí, gia công nhanh 24h, bảo hành trọn đời.',
  keywords: 'khung tranh, khung ảnh, đóng khung tranh, khung gỗ tự nhiên, khung composite, tranh thêu chữ thập',
  openGraph: {
    title: 'Khung Tranh Thiên Phúc | Nghệ Thuật Khung Tranh Cao Cấp',
    description: 'Chuyên gia công khung tranh, khung ảnh nghệ thuật từ gỗ tự nhiên và composite cao cấp.',
    type: 'website',
  }
}

export default async function Home() {
  const [products, gallery, testimonials] = await Promise.all([
    prisma.product.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.galleryImage.findMany({
      take: 9,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.testimonial.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' }
    })
  ])

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Khung Tranh Thiên Phúc',
    image: 'https://khungtranhthienphuc.vn/og-image.jpg',
    '@id': 'https://khungtranhthienphuc.vn',
    url: 'https://khungtranhthienphuc.vn',
    telephone: '0123456789',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Số 123 Đường ABC, Quận XYZ',
      addressLocality: 'Hồ Chí Minh',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.762622,
      longitude: 106.660172,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '08:00',
      closes: '20:00',
    },
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-secondary to-accent/20 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Hero Content (Left) */}
            <div className="lg:w-1/2 z-10">
              <div className="inline-block bg-white px-4 py-1.5 rounded-full border border-border shadow-sm mb-6">
                <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span> Khung Tranh Thiên Phúc
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-serif leading-[1.1]">
                Nghệ Thuật Khung Tranh <br/>
                <span className="text-primary italic font-light">Cho Không Gian Hoàn Mỹ</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
                Chuyên gia công khung tranh, khung ảnh nghệ thuật từ gỗ tự nhiên và composite cao cấp. Tôn vinh vẻ đẹp tác phẩm, điểm tô không gian sống của bạn.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#products" className="px-8 py-3.5 bg-accent text-white rounded-md font-bold hover:bg-primary transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Xem Bộ Sưu Tập
                </Link>
                <a href="tel:0123456789" className="px-8 py-3.5 bg-white border border-border text-foreground rounded-md font-bold hover:border-primary hover:text-primary transition-all flex items-center gap-2">
                  <Phone size={18} /> Hotline Tư Vấn
                </a>
              </div>
            </div>

            {/* Hero Image (Right) */}
            <div className="lg:w-1/2 relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=1200&auto=format&fit=crop" 
                alt="Khung tranh nghệ thuật trưng bày trong phòng khách sang trọng" 
                fill
                priority
                className="object-cover"
              />
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">Chất lượng</p>
                    <p className="text-sm font-bold text-foreground font-serif">Đỉnh Cao</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Bộ Sưu Tập (Product Grid) */}
      <section id="products" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-3 block">— BỘ SƯU TẬP NỔI BẬT —</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground">Sản phẩm <span className="text-primary italic font-light">Khung Tranh</span></h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Từ khung gỗ tự nhiên sang trọng đến khung composite hiện đại, đáp ứng mọi nhu cầu trang trí của bạn.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.length === 0 ? (
              <p className="col-span-full text-center text-muted-foreground">Hiện chưa có sản phẩm mới.</p>
            ) : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Tính năng (Hơn cả đóng khung, là nghệ thuật) */}
      <section className="py-20 bg-secondary/50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— TẠI SAO CHỌN THIÊN PHÚC —</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Hơn cả đóng khung,<br/><span className="text-primary italic font-light">là nghệ thuật</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              Chúng tôi hiểu rằng mỗi bức tranh là một kỷ niệm vô giá. Thiên Phúc cam kết mang lại chất lượng và dịch vụ tốt nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: CheckCircle2, title: "Tư vấn miễn phí", desc: "Đội ngũ chuyên gia sẵn sàng hỗ trợ chọn mẫu phù hợp 24/7." },
              { icon: ShieldCheck, title: "Chất lượng cao cấp", desc: "Vật liệu gỗ, composite nhập khẩu chống mối mọt, cong vênh." },
              { icon: Clock, title: "Gia công nhanh 24h", desc: "Đáp ứng nhanh chóng các đơn hàng cần gấp trong ngày." },
              { icon: Truck, title: "Giao hàng tận nơi", desc: "Đóng gói cẩn thận, an toàn, giao hàng hỏa tốc nội thành." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary rotate-3">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-lg font-bold font-serif mb-3 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Testimonials (Nói gì về Thiên Phúc) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— KHÁCH HÀNG ĐÁNH GIÁ —</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">Nói gì về <span className="text-primary italic font-light">Thiên Phúc</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.length === 0 ? (
              <p className="col-span-full text-center text-muted-foreground">Chưa có đánh giá nào.</p>
            ) : testimonials.map((test) => (
              <div key={test.id} className="bg-secondary/30 p-8 rounded-2xl border border-border/50 relative">
                <Quote className="absolute top-6 right-6 text-primary/10 w-12 h-12" />
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 relative z-10 italic">
                  &quot;{test.text}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold font-serif uppercase">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{test.name}</h4>
                    <p className="text-xs text-muted-foreground">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Tác phẩm đã thực hiện (Gallery) */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 text-left">
            <div>
              <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— DỰ ÁN THỰC TẾ —</span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">Tác phẩm <span className="text-primary italic font-light">đã thực hiện</span></h2>
            </div>
            <Link href="/thu-vien" className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
              Xem tất cả tác phẩm &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {gallery.length === 0 ? (
              <p className="col-span-full text-center text-muted-foreground">Chưa có hình ảnh dự án.</p>
            ) : gallery.map((img) => (
              <div key={img.id} className="aspect-square rounded-xl overflow-hidden group border border-border/50 relative">
                <Image 
                  src={img.image_url} 
                  alt={img.title || "Tác phẩm đóng khung thực tế"} 
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Giải đáp thắc mắc (FAQ) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— HỖ TRỢ KHÁCH HÀNG —</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">Giải đáp <span className="text-primary italic font-light">thắc mắc</span></h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Thời gian hoàn thành một khung tranh là bao lâu?", a: "Với đơn hàng lẻ, chúng tôi thường gia công xong trong vòng 24h. Những mẫu gỗ tự nhiên cầu kỳ có thể mất 2-3 ngày." },
              { q: "Thiên Phúc có nhận giao hàng tận nơi không?", a: "Có, chúng tôi giao hàng hỏa tốc trong nội thành và ship COD an toàn (đóng gói mút xốp chống sốc) đi toàn quốc." },
              { q: "Chất liệu khung composite và gỗ thật khác nhau thế nào?", a: "Composite nhẹ, chống nước, chống mối mọt và nhiều màu sắc hiện đại. Gỗ tự nhiên (Sồi, Thông...) nặng hơn, vân gỗ đẹp, mang lại cảm giác sang trọng, cổ điển và độ bền rất cao." },
              { q: "Có bảo hành khung không?", a: "Chúng tôi bảo hành 12 tháng cho các lỗi nứt, cong vênh do nhà sản xuất đối với tất cả các dòng khung." }
            ].map((faq, i) => (
              <details key={i} className="group border border-border/80 rounded-xl bg-white overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between p-5 font-bold cursor-pointer list-none hover:text-primary transition-colors text-sm">
                  {faq.q}
                  <span className="transition group-open:rotate-180 text-primary">
                    <ChevronDown size={20} />
                  </span>
                </summary>
                <div className="p-5 pt-0 text-muted-foreground text-sm border-t border-border/50 bg-secondary/10 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Tư vấn miễn phí 24/7 (Form) */}
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
