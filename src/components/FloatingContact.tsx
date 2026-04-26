'use client'

import { Phone, MessageCircle, Facebook } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function FloatingContact() {
  const pathname = usePathname()
  
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Facebook Messenger Button */}
      <a 
        href="https://m.me/khungtranhthienphuc" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
      >
        <Facebook size={24} />
        {/* Tooltip */}
        <span className="absolute right-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Nhắn Facebook
        </span>
      </a>

      {/* Zalo Button */}
      <a 
        href="https://zalo.me/0123456789" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
      >
        {/* Zalo Logo Text / Icon */}
        <span className="font-bold text-sm tracking-tighter">Zalo</span>
        <span className="absolute right-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat Zalo
        </span>
      </a>

      {/* Phone Button */}
      <a 
        href="tel:0123456789" 
        className="w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group animate-bounce"
      >
        <Phone size={26} className="animate-pulse" />
        <span className="absolute right-16 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          0123.456.789
        </span>
      </a>
    </div>
  )
}
