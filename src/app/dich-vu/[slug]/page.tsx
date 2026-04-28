import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import * as LucideIcons from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import { Metadata } from 'next'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug }
  })

  if (!service) return { title: 'Dịch vụ không tồn tại' }

  return {
    title: `${service.title} | Thiên Phúc`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug }
  })

  if (!service) notFound()
  
  let relatedServices = []
  if (service.related_service_ids && service.related_service_ids.length > 0) {
    relatedServices = await prisma.service.findMany({
      where: {
        id: { in: service.related_service_ids }
      },
      take: 4
    })
  } else {
    relatedServices = await prisma.service.findMany({
      where: {
        category: service.category,
        NOT: { id: service.id }
      },
      take: 4
    })
  }

  // @ts-ignore
  const Icon = LucideIcons[service.iconName] || LucideIcons.Briefcase

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Image 
          src={service.image_url} 
          alt={service.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold uppercase tracking-widest mb-6">
            <Icon size={14} /> {service.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6 leading-tight">
            {service.title}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg italic">
            &quot;{service.description}&quot;
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-border/50">
            <div 
              className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
            
            <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary">
                  <LucideIcons.Share2 size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-muted-foreground">Chia sẻ dịch vụ</p>
                  <p className="text-sm font-bold text-foreground">Lan tỏa giá trị</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors text-foreground">
                  <LucideIcons.Facebook size={18} />
                </button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors text-foreground">
                  <LucideIcons.Linkedin size={18} />
                </button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors text-foreground">
                  <LucideIcons.Link2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Quick Contact Card */}
            <div className="bg-[#2c241b] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               <h3 className="text-2xl font-bold font-serif mb-6 relative z-10">Liên Hệ Ngay</h3>
               <div className="space-y-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shrink-0">
                      <LucideIcons.Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Hotline tư vấn</p>
                      <p className="text-lg font-bold">0123 456 789</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shrink-0">
                      <LucideIcons.Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Email hỗ trợ</p>
                      <p className="text-sm font-bold">thienphuc@gmail.com</p>
                    </div>
                  </div>
               </div>
               <div className="mt-8 flex flex-col gap-3">
                 <a href="tel:0123456789" className="block w-full py-3.5 bg-white text-[#2c241b] rounded-xl text-center font-bold hover:bg-accent hover:text-white transition-all shadow-md">
                    Yêu Cầu Gọi Lại
                 </a>
                 <a 
                   href="https://zalo.me/0123456789" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="block w-full py-3.5 bg-[#0068ff] text-white rounded-xl text-center font-bold hover:bg-[#0056d2] transition-all shadow-md flex items-center justify-center gap-2"
                 >
                    <LucideIcons.MessageCircle size={18} /> Nhắn Zalo Tư Vấn
                 </a>
               </div>
            </div>

            {/* Sticky Form */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
                <h3 className="text-xl font-bold font-serif mb-6 text-foreground pb-4 border-b-2 border-primary/20">Dịch vụ liên quan</h3>
                <div className="space-y-6">
                  {relatedServices.length > 0 ? relatedServices.map((rs) => (
                    <a href={`/dich-vu/${rs.slug}`} key={rs.id} className="group flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-border relative">
                        <Image src={rs.image_url} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {rs.title}
                        </h4>
                        <p className="text-[10px] text-muted-foreground uppercase font-black mt-1">{rs.category}</p>
                      </div>
                    </a>
                  )) : (
                    <p className="text-sm text-muted-foreground italic">Đang cập nhật thêm...</p>
                  )}
                </div>
              </div>

              <div className="sticky top-28">
                <h3 className="text-xl font-bold font-serif mb-4 text-foreground">Nhận báo giá chi tiết</h3>
                <ContactForm />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
