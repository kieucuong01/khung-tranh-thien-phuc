import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Phone, CheckCircle2, Calculator, ShieldCheck, Clock, Quote, ChevronDown, Award, Users, TrendingUp } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import ServiceCard from '@/components/ServiceCard'
import { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Kế Toán Thiên Phúc | Giải Pháp Kế Toán & Thuế Chuyên Nghiệp',
  description: 'Chuyên cung cấp dịch vụ kế toán trọn gói, quyết toán thuế, thành lập doanh nghiệp và tư vấn đầu tư tại TP.HCM. Giải pháp tài chính tối ưu cho doanh nghiệp của bạn.',
  keywords: 'kế toán, thuế, thành lập doanh nghiệp, quyết toán thuế, báo cáo tài chính, tư vấn đầu tư',
}

export default async function Home() {
  const [services, testimonials] = await Promise.all([
    prisma.service.findMany({
      where: { featured: true },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        description: true,
        image_url: true,
        iconName: true
      },
      take: 3
    }),
    prisma.testimonial.findMany({
      take: 6,
      select: {
        id: true,
        name: true,
        role: true,
        text: true
      },
      orderBy: { createdAt: 'desc' }
    })
  ])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-secondary to-accent/20 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Hero Content (Left) */}
            <div className="lg:w-1/2 z-10">
              <div className="inline-block bg-white px-4 py-1.5 rounded-full border border-border shadow-sm mb-6">
                <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span> Kế Toán & Kiểm Toán Thiên Phúc
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-serif leading-[1.1]">
                Giải Pháp Kế Toán <br/>
                <span className="text-primary italic font-light">Vững Bước Tương Lai</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
                Đồng hành cùng doanh nghiệp trong mọi vấn đề về Kế toán, Thuế và Pháp lý. Chúng tôi mang đến sự an tâm tuyệt đối để bạn tập trung phát triển kinh doanh.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/dich-vu" className="px-8 py-3.5 bg-accent text-white rounded-md font-bold hover:bg-primary transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Khám Phá Dịch Vụ
                </Link>
                <a href="tel:0123456789" className="px-8 py-3.5 bg-white border border-border text-foreground rounded-md font-bold hover:border-primary hover:text-primary transition-all flex items-center gap-2">
                  <Phone size={18} /> Tư Vấn Ngay
                </a>
              </div>
            </div>

            {/* Hero Image (Right) */}
            <div className="lg:w-1/2 relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop" 
                alt="Chuyên gia tư vấn kế toán và tài chính cho doanh nghiệp" 
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">Cam kết</p>
                    <p className="text-sm font-bold text-foreground font-serif">Chính Xác 100%</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Dịch vụ tiêu biểu */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="text-left">
              <span className="text-accent font-bold tracking-widest uppercase text-sm mb-3 block">— DỊCH VỤ TIÊU BIỂU —</span>
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground">Giải pháp <span className="text-primary italic font-light">Chuyên nghiệp</span></h2>
            </div>
            <Link href="/dich-vu" className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
              Xem tất cả dịch vụ &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Tại sao chọn chúng tôi */}
      <section className="py-20 bg-secondary/50 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— GIÁ TRỊ CỐT LÕI —</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Tại sao doanh nghiệp<br/><span className="text-primary italic font-light">tin tưởng Thiên Phúc?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: ShieldCheck, title: "Bảo mật & Uy tín", desc: "Cam kết bảo mật tuyệt đối thông tin dữ liệu của khách hàng." },
              { icon: Award, title: "Chuyên môn cao", desc: "Đội ngũ kế toán trưởng, chuyên viên thuế trên 10 năm kinh nghiệm." },
              { icon: Clock, title: "Đúng hạn & Kịp thời", desc: "Đảm bảo mọi báo cáo, quyết toán luôn hoàn thành đúng thời hạn quy định." },
              { icon: TrendingUp, title: "Tối ưu chi phí", desc: "Tư vấn các giải pháp giúp doanh nghiệp tiết kiệm tối đa chi phí thuế." }
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

      {/* 4. Con số ấn tượng */}
      <section className="py-24 bg-[#2c241b] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: "Khách hàng", value: "500+" },
              { label: "Năm kinh nghiệm", value: "10+" },
              { label: "Chuyên viên", value: "25+" },
              { label: "Dự án hoàn thành", value: "1200+" }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-bold font-serif text-accent mb-2">{stat.value}</p>
                <p className="text-gray-400 text-sm uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Đánh giá khách hàng */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— KHÁCH HÀNG ĐÁNH GIÁ —</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">Niềm tin từ <span className="text-primary italic font-light">Đối tác</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.length === 0 ? (
              <p className="col-span-full text-center text-muted-foreground">Chưa có đánh giá nào.</p>
            ) : testimonials.map((test) => (
              <div key={test.id} className="bg-secondary/30 p-8 rounded-2xl border border-border/50 relative text-left">
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

      {/* 6. Liên hệ tư vấn */}
      <section id="contact" className="py-24 bg-gradient-to-b from-white to-secondary/40 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— LIÊN HỆ TƯ VẤN —</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
            Khởi đầu sự <span className="text-accent italic font-light">thành công</span>
          </h2>
          <p className="text-muted-foreground mb-10">Để lại thông tin, đội ngũ chuyên gia của Thiên Phúc sẽ liên hệ hỗ trợ bạn trong vòng <strong>15 phút!</strong></p>

          <ContactForm />
        </div>
      </section>

    </div>
  )
}
