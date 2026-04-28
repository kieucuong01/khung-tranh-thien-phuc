'use client'

import { useState, useTransition } from 'react'
import { X, Search, Layout, Database, TrendingUp, Loader2, Info } from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'
import Image from 'next/image'

interface ServiceEditorProps {
  service: any
  allServices: any[]
  action: (formData: FormData) => Promise<void>
}

const slugify = (s: string) =>
  s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim().replace(/\s+/g, "-").replace(/-+/g, "-");

export default function ServiceEditor({ service, allServices, action }: ServiceEditorProps) {
  const [activeTab, setActiveTab] = useState('content')
  const [isPending, startTransition] = useTransition()
  
  const [title, setTitle] = useState(service?.title || '')
  const [slug, setSlug] = useState(service?.slug || '')
  const [relatedIds, setRelatedIds] = useState<string[]>(Array.isArray(service?.related_service_ids) ? service.related_service_ids : [])

  const toggleRelated = (id: string) => {
    if (service && id === service.id) return // Don't link to self
    setRelatedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const clientAction = async (formData: FormData) => {
    startTransition(async () => {
      formData.set('slug', slug)
      formData.set('related_service_ids', JSON.stringify(relatedIds))
      
      try {
        await action(formData)
      } catch (e) {
        if (e && typeof e === 'object' && 'digest' in e && (e.digest as string).includes('NEXT_REDIRECT')) {
          return
        }
        alert('Có lỗi xảy ra khi lưu dịch vụ.')
      }
    })
  }

  return (
    <form action={clientAction} className="space-y-6">
      {service && <input type="hidden" name="id" value={service.id} />}
      
      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        {[
          { id: 'content', name: 'Thông Tin Chính', icon: Layout },
          { id: 'seo', name: 'SEO & Meta', icon: Search },
          { id: 'related', name: 'Dịch Vụ Liên Quan', icon: TrendingUp },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold transition-all ${
              activeTab === tab.id 
                ? 'border-primary text-primary bg-primary/5' 
                : 'border-transparent text-muted-foreground hover:bg-secondary'
            }`}
          >
            <tab.icon size={16} />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab: Content */}
      <div className={activeTab === 'content' ? 'block space-y-4' : 'hidden'}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Tên dịch vụ *</label>
            <input 
              name="title" 
              type="text" 
              required 
              value={title} 
              onChange={(e) => {
                setTitle(e.target.value)
                if (!service) setSlug(slugify(e.target.value))
              }}
              placeholder="VD: Dịch vụ Kế toán Trọn gói..." 
              className="w-full px-4 py-2.5 border rounded-xl" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">URL Slug *</label>
            <input 
              name="slug" 
              type="text" 
              required 
              value={slug} 
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="dich-vu-ke-toan-tron-goi" 
              className="w-full px-4 py-2.5 border rounded-xl" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Danh mục *</label>
            <input name="category" type="text" required defaultValue={service?.category || ''} placeholder="VD: Kế toán, Thuế..." className="w-full px-4 py-2.5 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Icon Lucide *</label>
            <input name="iconName" type="text" required defaultValue={service?.iconName || 'Briefcase'} placeholder="VD: Briefcase, Zap, Shield..." className="w-full px-4 py-2.5 border rounded-xl" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Mô tả ngắn (Description) *</label>
          <textarea name="description" required rows={2} defaultValue={service?.description || ''} className="w-full px-4 py-2.5 border rounded-xl" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Link ảnh nền *</label>
          <input name="image_url" type="url" required defaultValue={service?.image_url || ''} className="w-full px-4 py-2.5 border rounded-xl" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Nội dung chi tiết</label>
          <RichTextEditor name="content" defaultValue={service?.content || ''} />
        </div>
        <div className="flex items-center gap-3 bg-secondary/30 p-4 rounded-xl">
          <input type="checkbox" name="featured" id="featured" value="true" defaultChecked={service?.featured} className="w-5 h-5 text-primary" />
          <label htmlFor="featured" className="text-sm font-bold cursor-pointer">Hiển thị nổi bật ở trang chủ</label>
        </div>
      </div>

      {/* Tab: SEO */}
      <div className={activeTab === 'seo' ? 'block space-y-4' : 'hidden'}>
        <div>
          <label className="block text-sm font-bold mb-1">Meta Title</label>
          <input name="meta_title" type="text" defaultValue={service?.meta_title || ''} className="w-full px-4 py-2.5 border rounded-xl" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Meta Description</label>
          <textarea name="meta_description" rows={3} defaultValue={service?.meta_description || ''} className="w-full px-4 py-2.5 border rounded-xl" />
        </div>
        <div className="flex items-center gap-3 bg-green-50 p-4 rounded-xl border border-green-100">
          <input type="checkbox" name="is_published" id="is_published_s" value="true" defaultChecked={service ? service.is_published : true} className="w-5 h-5 text-primary" />
          <label htmlFor="is_published_s" className="text-sm font-bold cursor-pointer text-green-800">Công khai dịch vụ này</label>
        </div>
      </div>

      {/* Tab: Related Services */}
      <div className={activeTab === 'related' ? 'block space-y-6' : 'hidden'}>
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
          <div className="bg-primary text-white p-2 rounded-xl"><TrendingUp size={18} /></div>
          <p className="text-sm text-foreground/80 leading-relaxed">Chọn các dịch vụ liên quan để hiển thị ở thanh bên (sidebar) trang chi tiết. Điều này giúp tăng tỷ lệ chuyển đổi.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2 border rounded-2xl bg-secondary/10">
          {allServices.map(s => (
            <button
              key={s.id}
              type="button"
              disabled={service && s.id === service.id}
              onClick={() => toggleRelated(s.id)}
              className={`flex flex-col text-left rounded-2xl overflow-hidden border-2 transition-all ${
                relatedIds.includes(s.id) ? 'border-primary ring-4 ring-primary/20 shadow-lg' : 'border-white hover:border-primary/40'
              } ${service && s.id === service.id ? 'opacity-30 grayscale cursor-not-allowed' : ''}`}
            >
              <div className="relative aspect-video w-full">
                <Image src={s.image_url} alt="" fill className="object-cover" />
              </div>
              <div className="p-3 bg-white flex-1 text-xs font-bold line-clamp-2">{s.title}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-10 border-t border-border mt-10">
        <button 
          type="submit" 
          disabled={isPending}
          className={`px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 shadow-lg flex items-center gap-2 ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isPending ? <Loader2 className="animate-spin" size={18} /> : null}
          {isPending ? 'Đang xử lý...' : (service ? 'Cập Nhật Dịch Vụ' : 'Đăng Dịch Vụ Mới')}
        </button>
      </div>
    </form>
  )
}
