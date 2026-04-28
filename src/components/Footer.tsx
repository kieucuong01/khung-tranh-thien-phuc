import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1a1511] text-gray-400 pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1: About */}
          <div>
            <Link href="/" className="flex flex-col items-start mb-6 group">
              <span className="text-3xl font-bold tracking-tight text-white font-serif group-hover:text-accent transition-colors">
                Thiên Phúc
              </span>
              <span className="text-[11px] text-accent font-medium italic">
                Kế toán & Kiểm toán Chuyên nghiệp
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Đồng hành cùng sự phát triển bền vững của doanh nghiệp thông qua các giải pháp kế toán, thuế và tài chính tối ưu. ✨
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-6">
              Liên Hệ
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="text-accent shrink-0" size={16} />
                <a href="tel:0123456789" className="hover:text-white transition-colors">0123 456 789</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-accent shrink-0" size={16} />
                <a href="mailto:thienphuc@gmail.com" className="hover:text-white transition-colors">thienphuc@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0 mt-1" size={16} />
                <span>TP. Hồ Chí Minh, Việt Nam</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-6">
              Liên Kết
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/gioi-thieu" className="hover:text-white transition-colors">Giới Thiệu</Link></li>
              <li><Link href="/dich-vu" className="hover:text-white transition-colors">Dịch Vụ</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-white transition-colors">Tin Tức & Sự Kiện</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Liên Hệ Tư Vấn</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500">
          <p>&copy; 2026 Kế toán Thiên Phúc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
