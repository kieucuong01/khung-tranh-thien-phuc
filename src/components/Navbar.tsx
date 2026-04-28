'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Phone, Mail, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top bar (Dark) */}
      <div className="bg-[#2c241b] text-gray-300 text-[13px] py-2 hidden md:block">
        <div className="container mx-auto px-4 flex items-center gap-6">
          <a href="mailto:thienphuc@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={14} /> thienphuc@gmail.com
          </a>
          <span className="text-gray-600">|</span>
          <a href="tel:0123456789" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={14} /> Hotline: 0123 456 789
          </a>
        </div>
      </div>

      {/* Main Navigation (White) */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md py-3' : 'bg-white py-5'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <span className="text-3xl font-bold tracking-tight text-primary font-serif group-hover:opacity-80 transition-opacity">
              Thiên Phúc
            </span>
            <span className="text-[11px] text-muted-foreground font-medium italic">
              Kế toán & Kiểm toán Chuyên nghiệp
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[15px] font-semibold text-foreground hover:text-primary transition-colors">Trang Chủ</Link>
            <Link href="/gioi-thieu" className="text-[15px] font-semibold text-foreground hover:text-primary transition-colors">Giới Thiệu</Link>
            <Link href="/dich-vu" className="text-[15px] font-semibold text-foreground hover:text-primary transition-colors">Dịch Vụ</Link>
            <Link href="/tin-tuc" className="text-[15px] font-semibold text-foreground hover:text-primary transition-colors">Tin Tức</Link>
            <Link href="/#contact" className="text-[15px] font-semibold text-foreground hover:text-primary transition-colors">Liên Hệ</Link>
          </nav>

          {/* Right side - Hotline CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Hotline Đặt Hàng</p>
              <p className="text-primary font-bold text-lg leading-tight">0123 456 789</p>
            </div>
            <a href="tel:0123456789" className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors shadow-md transform hover:scale-105">
              <Phone size={18} fill="currentColor" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-border shadow-lg">
            <nav className="flex flex-col p-4 space-y-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-semibold border-b pb-2">Trang Chủ</Link>
              <Link href="/gioi-thieu" onClick={() => setMobileMenuOpen(false)} className="font-semibold border-b pb-2">Giới Thiệu</Link>
              <Link href="/dich-vu" onClick={() => setMobileMenuOpen(false)} className="font-semibold border-b pb-2">Dịch Vụ</Link>
              <Link href="/tin-tuc" onClick={() => setMobileMenuOpen(false)} className="font-semibold border-b pb-2">Tin Tức</Link>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center">
                  <Phone size={18} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Hotline</p>
                  <p className="text-primary font-bold text-lg leading-tight">0123 456 789</p>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Marquee Banner */}
      <div className="bg-accent/20 border-b border-accent/30 py-2 overflow-hidden relative flex items-center">
        <div className="w-full text-center">
           <span className="text-sm font-semibold text-primary uppercase tracking-widest inline-block animate-[marquee_20s_linear_infinite] whitespace-nowrap px-4">
            ✨ TƯ VẤN MIỄN PHÍ - GIA CÔNG NHANH 24H - GIAO HÀNG TOÀN QUỐC - BẢO HÀNH TRỌN ĐỜI ✨ TƯ VẤN MIỄN PHÍ - GIA CÔNG NHANH 24H - GIAO HÀNG TOÀN QUỐC - BẢO HÀNH TRỌN ĐỜI ✨
          </span>
        </div>
      </div>
    </>
  )
}
