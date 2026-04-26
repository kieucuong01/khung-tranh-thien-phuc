import { Metadata } from 'next'
import { Phone, CheckCircle2 } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import prisma from '@/lib/prisma'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Bảng Giá Đóng Khung Tranh Chi Tiết',
  description: 'Tham khảo bảng báo giá đóng khung tranh gỗ tự nhiên, khung nhựa composite, đóng bo viền các kích thước chuẩn. Giá tốt nhất thị trường.',
}

export default async function PricingPage() {
  const priceItems = await prisma.priceItem.findMany({
    orderBy: { createdAt: 'asc' }
  })

  // Group items by category
  const categories = Array.from(new Set(priceItems.map(item => item.category)))
  
  const groupedPricing = categories.map(cat => ({
    name: cat,
    description: priceItems.find(i => i.category === cat)?.description || '',
    items: priceItems.filter(i => i.category === cat)
  }))

  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* 1. Header Section */}
      <section className="bg-gradient-to-br from-white via-secondary to-accent/10 py-16 text-center border-b border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— CẬP NHẬT 2026 —</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-6">
            Bảng Giá <span className="text-primary italic font-light">Chi Tiết</span>
          </h1>
          <p className="text-muted-foreground mb-8 text-sm md:text-base">
            Giá cả minh bạch - Chất lượng xứng tầm. Phục vụ 24/7 toàn quốc. Liên hệ để có giá sỉ!
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-sm">
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-border/50 text-foreground font-medium"><CheckCircle2 size={16} className="text-primary"/> Hỗ trợ thiết kế</span>
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-border/50 text-foreground font-medium"><CheckCircle2 size={16} className="text-primary"/> Mẫu mã đa dạng</span>
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-border/50 text-foreground font-medium"><CheckCircle2 size={16} className="text-primary"/> Gia công nhanh 24h</span>
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-border/50 text-foreground font-medium"><CheckCircle2 size={16} className="text-primary"/> Bảo hành trọn đời</span>
          </div>
        </div>
      </section>

      {/* 2. Pricing Tables */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl space-y-16">

          {priceItems.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Hiện đang cập nhật bảng giá mới. Vui lòng quay lại sau hoặc liên hệ Hotline để được báo giá trực tiếp!
            </div>
          ) : (
            groupedPricing.map((group, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-6 border-b border-border pb-2">
                  <div>
                    <span className="text-accent font-bold tracking-widest uppercase text-[10px] block mb-1">DÒNG SẢN PHẨM</span>
                    <h2 className="text-2xl font-bold font-serif text-foreground">{group.name}</h2>
                  </div>
                </div>
                
                <div className="bg-secondary/20 rounded-xl p-6 md:p-8 border border-border">
                  <p className="text-sm text-muted-foreground mb-6 italic">{group.description}</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-accent/10 text-primary font-semibold border-b border-accent/20">
                        <tr><th className="py-3 px-4">Kích thước (cm)</th><th className="py-3 px-4">Đơn giá (VNĐ)</th></tr>
                      </thead>
                      <tbody className="divide-y divide-border text-foreground">
                        {group.items.map((item) => (
                          <tr key={item.id}>
                            <td className="py-3 px-4 font-medium">{item.size}</td>
                            <td className="py-3 px-4 font-bold text-primary">
                              {new Intl.NumberFormat('vi-VN').format(item.price)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <a href="tel:0123456789" className="mt-8 w-full flex items-center justify-center gap-2 bg-[#2c241b] text-white py-3 rounded-lg text-sm font-bold hover:bg-primary transition-colors shadow-md">
                    <Phone size={16} /> Nhận báo giá kích thước khác
                  </a>
                </div>
              </div>
            ))
          )}
          
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
