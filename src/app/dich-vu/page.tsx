import prisma from '@/lib/prisma'
import ServiceCard from '@/components/ServiceCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dịch Vụ Kế Toán & Thuế',
  description: 'Cung cấp các dịch vụ kế toán trọn gói, quyết toán thuế, thành lập doanh nghiệp và tư vấn đầu tư chuyên nghiệp tại TP.HCM.',
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' }
  })

  // Group services by category
  const categories = [...new Set(services.map(s => s.category))]

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Header */}
      <section className="bg-[#2c241b] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Dịch Vụ Của Chúng Tôi</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Giải pháp toàn diện và chuyên nghiệp cho mọi nhu cầu về kế toán, thuế và pháp lý doanh nghiệp.
          </p>
        </div>
      </section>

      {/* Services List */}
      <div className="container mx-auto px-4 mt-16">
        {categories.map((category) => (
          <div key={category} className="mb-20 last:mb-0">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-bold font-serif text-foreground shrink-0">{category}</h2>
              <div className="h-px bg-border w-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services
                .filter(s => s.category === category)
                .map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Hiện chưa có dịch vụ nào được cập nhật.</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="mt-20 py-20 bg-accent/10 rounded-3xl container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-serif text-foreground mb-6">Bạn Cần Tư Vấn Riêng Cho Doanh Nghiệp?</h2>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
          Đừng ngần ngại liên hệ với chúng tôi để nhận được giải pháp tối ưu nhất cho bài toán tài chính và thuế của bạn.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:0123456789" className="px-8 py-4 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-accent transition-all">
            Gọi Ngay: 0123 456 789
          </a>
          <a href="/#contact" className="px-8 py-4 bg-white border border-border text-foreground rounded-lg font-bold hover:border-primary transition-all">
            Để Lại Thông Tin
          </a>
        </div>
      </section>
    </div>
  )
}
