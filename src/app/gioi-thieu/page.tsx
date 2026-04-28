import Image from 'next/image'
import { Metadata } from 'next'
import { Award, Users, ShieldCheck, Heart, Target, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Giới Thiệu | Kế Toán Thiên Phúc',
  description: 'Tìm hiểu về sứ mệnh, tầm nhìn và đội ngũ chuyên gia tại Kế toán Thiên Phúc. Chúng tôi cam kết mang lại giải pháp tài chính tối ưu cho doanh nghiệp.',
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* 1. Hero Section */}
      <section className="bg-[#2c241b] text-white py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— VỀ CHÚNG TÔI —</span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
            Tận Tâm Phục Vụ <br/><span className="text-accent italic font-light">Nâng Tầm Doanh Nghiệp</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Thiên Phúc tự hào là đối tác tin cậy của hơn 500 doanh nghiệp, cung cấp các giải pháp kế toán và thuế chuyên sâu, giúp khách hàng an tâm phát triển kinh doanh.
          </p>
        </div>
      </section>

      {/* 2. Sứ mệnh & Tầm nhìn */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" 
              alt="Đội ngũ Thiên Phúc" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold font-serif text-foreground mb-4 flex items-center gap-3">
                <Target className="text-primary" size={32} /> Sứ mệnh
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Mang đến những giải pháp tài chính và pháp lý minh bạch, chính xác nhất, giúp doanh nghiệp Việt Nam tối ưu hóa quy trình vận hành và tuân thủ pháp luật một cách hiệu quả nhất.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold font-serif text-foreground mb-4 flex items-center gap-3">
                <TrendingUp className="text-primary" size={32} /> Tầm nhìn
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Trở thành đơn vị tư vấn kế toán và kiểm toán hàng đầu tại TP.HCM, là điểm tựa vững chắc cho cộng đồng doanh nghiệp khởi nghiệp và phát triển bền vững.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Giá trị cốt lõi */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— CHÚNG TÔI TIN VÀO —</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Giá Trị <span className="text-primary italic font-light">Cốt Lõi</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: ShieldCheck, title: "Chính Trực", desc: "Luôn đặt đạo đức nghề nghiệp và sự minh bạch lên hàng đầu trong mọi giao dịch." },
              { icon: Award, title: "Chuyên Nghiệp", desc: "Quy trình làm việc chuẩn mực, chính xác và hiệu quả cao nhất cho khách hàng." },
              { icon: Heart, title: "Tận Tâm", desc: "Luôn lắng nghe và thấu hiểu những khó khăn của doanh nghiệp để đưa ra giải pháp phù hợp." }
            ].map((val, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-border/50 text-center hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-8 text-primary rotate-3">
                  <val.icon size={32} />
                </div>
                <h3 className="text-xl font-bold font-serif mb-4 text-foreground">{val.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Đội ngũ chuyên gia */}
      <section className="py-24 container mx-auto px-4 text-center">
        <div className="mb-16">
          <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— ĐỘI NGŨ —</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
            Chuyên Gia <span className="text-primary italic font-light">Đồng Hành</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi sở hữu đội ngũ kế toán trưởng và chuyên viên tư vấn thuế giàu kinh nghiệm, luôn sẵn sàng hỗ trợ bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all">
                <Image 
                  src={`https://images.unsplash.com/photo-${i === 1 ? '1560250097-0b93528c311a' : i === 2 ? '1573496359142-b8d87734a5a2' : i === 3 ? '1519085360753-af0119f7cbe7' : '1507003211169-0a1dd7228f2d'}?q=80&w=400&auto=format&fit=crop`} 
                  alt="Team member" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <h4 className="text-lg font-bold font-serif text-foreground">Nguyễn Văn {i}</h4>
              <p className="text-sm text-primary font-bold uppercase tracking-widest">Chuyên viên Kế toán</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
