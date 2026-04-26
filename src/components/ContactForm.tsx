'use client'

import { useState } from 'react'
import { submitContactRequest } from '@/app/admin/actions'

export default function ContactForm() {
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({
    type: 'idle',
    message: ''
  })

  async function handleAction(formData: FormData) {
    setStatus({ type: 'loading', message: 'Đang gửi...' })
    const res = await submitContactRequest(formData)
    
    if (res?.success) {
      setStatus({ type: 'success', message: res.message })
      // Reset form would ideally happen here, but simplest is letting user see success message
    } else {
      setStatus({ type: 'error', message: res?.message || 'Có lỗi xảy ra.' })
    }
  }

  return (
    <form action={handleAction} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-border text-left relative overflow-hidden">
      
      {status.type === 'success' ? (
        <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 className="text-2xl font-bold font-serif text-foreground mb-2">Cảm ơn bạn!</h3>
          <p className="text-muted-foreground">{status.message}</p>
          <button 
            type="button" 
            onClick={() => setStatus({ type: 'idle', message: '' })}
            className="mt-6 text-primary hover:underline text-sm font-bold"
          >
            Gửi yêu cầu khác
          </button>
        </div>
      ) : null}

      <div className="space-y-5">
        <div>
          <input name="name" type="text" placeholder="Họ và tên *" className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-secondary/20 text-sm" required />
        </div>
        <div>
          <input name="phone" type="tel" placeholder="Số điện thoại *" className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-secondary/20 text-sm" required />
        </div>
        <div>
          <select name="serviceType" className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-secondary/20 text-sm text-foreground">
            <option value="Tư vấn chung">Vui lòng chọn loại khung...</option>
            <option value="Khung gỗ tự nhiên">Khung gỗ tự nhiên</option>
            <option value="Khung nhựa composite">Khung nhựa composite</option>
            <option value="Đóng khung tranh thêu">Đóng khung tranh thêu</option>
            <option value="Dịch vụ khác">Dịch vụ khác</option>
          </select>
        </div>
        <div>
          <textarea name="notes" rows={4} placeholder="Mô tả yêu cầu (kích thước, số lượng, mẫu mã...)" className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-secondary/20 text-sm resize-none"></textarea>
        </div>
        
        {status.type === 'error' && (
          <p className="text-red-500 text-sm">{status.message}</p>
        )}

        <button 
          type="submit" 
          disabled={status.type === 'loading'}
          className="w-full bg-accent hover:bg-primary text-white font-bold py-4 rounded-lg transition-colors shadow-md text-sm uppercase tracking-wider mt-2 disabled:opacity-50"
        >
          {status.type === 'loading' ? 'Đang gửi...' : 'Gửi Yêu Cầu Báo Giá'}
        </button>
      </div>
    </form>
  )
}
