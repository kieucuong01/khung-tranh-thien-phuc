'use client'

import { useState, useEffect, useTransition } from 'react'
import { Plus, X, Tag, Info, Search, Layout, Database, TrendingUp, Eye, Loader2 } from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'
import Image from 'next/image'

type FaqItem = { q: string; a: string }
type HowToStep = { name: string; text: string; image?: string }

interface BlogEditorProps {
  blog: any
  services: any[]
  categories: string[]
  action: (formData: FormData) => Promise<void>
}

const slugify = (s: string) =>
  s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim().replace(/\s+/g, "-").replace(/-+/g, "-");

export default function BlogEditor({ blog, services, categories, action }: BlogEditorProps) {
  const [activeTab, setActiveTab] = useState('content')
  const [isPending, startTransition] = useTransition()
  
  const [title, setTitle] = useState(blog?.title || '')
  const [slug, setSlug] = useState(blog?.slug || '')
  const [metaTitle, setMetaTitle] = useState(blog?.meta_title || '')
  const [metaDesc, setMetaDesc] = useState(blog?.meta_description || '')
  const [imageAlt, setImageAlt] = useState(blog?.image_alt || '')
  const [tags, setTags] = useState(Array.isArray(blog?.tags) ? blog.tags.join(', ') : '')
  
  // JSON states
  const [faqItems, setFaqItems] = useState<FaqItem[]>(Array.isArray(blog?.faq_items) ? blog.faq_items : [])
  const [howtoSteps, setHowtoSteps] = useState<HowToStep[]>(Array.isArray(blog?.howto_steps) ? blog.howto_steps : [])
  const [selectedServices, setSelectedServices] = useState<string[]>(Array.isArray(blog?.featured_product_ids) ? blog.featured_product_ids : [])

  useEffect(() => {
    if (!blog && title && !slug) {
      setSlug(slugify(title))
    }
  }, [title, blog, slug])

  const addFaq = () => setFaqItems([...faqItems, { q: '', a: '' }])
  const removeFaq = (i: number) => setFaqItems(faqItems.filter((_, idx) => idx !== i))
  const updateFaq = (i: number, field: keyof FaqItem, value: string) => {
    const newItems = [...faqItems]
    newItems[i][field] = value
    setFaqItems(newItems)
  }

  const addStep = () => setHowtoSteps([...howtoSteps, { name: '', text: '' }])
  const removeStep = (i: number) => setHowtoSteps(howtoSteps.filter((_, idx) => idx !== i))
  const updateStep = (i: number, field: keyof HowToStep, value: string) => {
    const newSteps = [...howtoSteps]
    newSteps[i][field as 'name' | 'text'] = value
    setHowtoSteps(newSteps)
  }

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const clientAction = async (formData: FormData) => {
    startTransition(async () => {
      // Forcefully set values from state to ensure they are always present even if hidden by tabs
      formData.set('slug', slug)
      formData.set('meta_title', metaTitle)
      formData.set('meta_description', metaDesc)
      formData.set('image_alt', imageAlt)
      formData.set('tags', tags)
      formData.set('faq_items', JSON.stringify(faqItems))
      formData.set('howto_steps', JSON.stringify(howtoSteps))
      formData.set('featured_product_ids', JSON.stringify(selectedServices))
      
      try {
        await action(formData)
      } catch (e) {
        if (e && typeof e === 'object' && 'digest' in e && (e.digest as string).includes('NEXT_REDIRECT')) {
          return
        }
        alert('Có lỗi xảy ra khi lưu.')
      }
    })
  }

  return (
    <form action={clientAction} className="space-y-6">
      {blog && <input type="hidden" name="id" value={blog.id} />}
      
      {/* Hidden inputs as secondary fallback */}
      <input type="hidden" name="slug" value={slug} />

      {/* Tabs */}
      <div className="flex border-b border-border mb-6 overflow-x-auto no-scrollbar">
        {[
          { id: 'content', name: 'Nội dung', icon: Layout },
          { id: 'seo', name: 'SEO Toolkit', icon: Search },
          { id: 'schema', name: 'Schema & FAQ', icon: Database },
          { id: 'conversion', name: 'Sản phẩm & CTA', icon: TrendingUp },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold transition-all whitespace-nowrap ${
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
          <div>
            <label className="block text-sm font-bold mb-1">Tiêu đề bài viết *</label>
            <input 
              name="title" 
              type="text" 
              required 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Cách hạch toán thuế TNCN mới nhất..." 
              className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Danh mục</label>
              <select name="category" defaultValue={blog?.category || 'Tin tức'} className="w-full px-4 py-2.5 border rounded-xl bg-white">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Tác giả</label>
              <input name="author" type="text" defaultValue={blog?.author || 'Thiên Phúc'} className="w-full px-4 py-2.5 border rounded-xl" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Tóm tắt ngắn</label>
            <textarea 
              name="excerpt" 
              required 
              rows={2} 
              defaultValue={blog?.excerpt || ''} 
              className="w-full px-4 py-2.5 border rounded-xl" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Link ảnh nền (URL) *</label>
            <input name="image_url" type="url" required defaultValue={blog?.image_url || ''} className="w-full px-4 py-2.5 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Nội dung chi tiết</label>
            <RichTextEditor name="content" defaultValue={blog?.content || ''} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div>
              <label className="block text-sm font-bold mb-1">Thời gian đọc</label>
              <input name="read_time" type="text" defaultValue={blog?.read_time || '5 phút đọc'} className="w-full px-4 py-2.5 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Ngày xuất bản</label>
              <input 
                name="published_at" 
                type="date" 
                defaultValue={
                  blog?.published_at 
                    ? (typeof blog.published_at === 'string' ? blog.published_at.split('T')[0] : blog.published_at.split('T')[0])
                    : new Date().toISOString().split('T')[0]
                } 
                className="w-full px-4 py-2.5 border rounded-xl" 
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input type="checkbox" name="is_published" id="is_published" value="true" defaultChecked={blog ? blog.is_published : true} className="w-5 h-5 text-primary" />
              <label htmlFor="is_published" className="text-sm font-bold cursor-pointer">Xuất bản ngay</label>
            </div>
          </div>
      </div>

      {/* Tab: SEO */}
      <div className={activeTab === 'seo' ? 'block space-y-6' : 'hidden'}>
          <div className="bg-white p-8 rounded-3xl border border-border space-y-6">
            <div>
              <label className="block text-sm font-bold mb-1">URL Slug *</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">/tin-tuc/</span>
                <input 
                  type="text" 
                  value={slug} 
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  className="flex-1 px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Meta Title</label>
              <input 
                type="text" 
                value={metaTitle} 
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-xl" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Meta Description</label>
              <textarea 
                rows={3} 
                value={metaDesc} 
                onChange={(e) => setMetaDesc(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-xl" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-1">Alt text cho ảnh</label>
                <input 
                  type="text" 
                  value={imageAlt} 
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-xl" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Tags</label>
                <input 
                  type="text" 
                  value={tags} 
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-xl" 
                />
              </div>
            </div>
          </div>
      </div>

      {/* Tab: Schema */}
      <div className={activeTab === 'schema' ? 'block space-y-6' : 'hidden'}>
          <div className="bg-white p-8 rounded-3xl border border-border space-y-8">
            <div>
              <label className="block text-sm font-bold mb-2">Loại bài viết</label>
              <select name="schema_type" defaultValue={blog?.schema_type || 'Article'} className="w-full px-4 py-2.5 border rounded-xl bg-white">
                <option value="Article">Article</option>
                <option value="FAQ">FAQ</option>
                <option value="HowTo">HowTo</option>
              </select>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm">FAQ</h4>
                <button type="button" onClick={addFaq} className="text-xs bg-secondary px-4 py-2 rounded-xl">Thêm</button>
              </div>
              {faqItems.map((item, i) => (
                <div key={i} className="bg-secondary/20 p-4 rounded-2xl relative">
                  <button type="button" onClick={() => removeFaq(i)} className="absolute top-2 right-2 text-red-500"><X size={16} /></button>
                  <input placeholder="Hỏi" value={item.q} onChange={(e) => updateFaq(i, 'q', e.target.value)} className="w-full text-sm font-bold bg-transparent outline-none mb-2" />
                  <textarea placeholder="Đáp" rows={2} value={item.a} onChange={(e) => updateFaq(i, 'a', e.target.value)} className="w-full text-sm bg-transparent outline-none" />
                </div>
              ))}
            </div>
          </div>
      </div>

      {/* Tab: Conversion */}
      <div className={activeTab === 'conversion' ? 'block space-y-6' : 'hidden'}>
          <div className="bg-white p-8 rounded-3xl border border-border space-y-8">
            <div>
              <label className="block text-sm font-bold mb-4">Dịch vụ liên quan</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[300px] overflow-y-auto p-2 border rounded-2xl bg-secondary/10">
                {services.map(service => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`flex flex-col rounded-2xl overflow-hidden border-2 ${
                      selectedServices.includes(service.id) ? 'border-primary' : 'border-white'
                    }`}
                  >
                    <div className="relative aspect-video w-full">
                      <Image src={service.image_url} alt="" fill className="object-cover" />
                    </div>
                    <div className="p-2 text-[10px] font-bold line-clamp-1">{service.title}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-1">Text CTA</label>
                <input name="cta_text" type="text" defaultValue={blog?.cta_text || 'Nhận tư vấn'} className="w-full px-4 py-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Link CTA</label>
                <input name="cta_link" type="text" defaultValue={blog?.cta_link || '/#contact'} className="w-full px-4 py-2.5 border rounded-xl" />
              </div>
            </div>
          </div>
      </div>

      <div className="flex justify-end gap-3 pt-10 border-t border-border mt-10">
        <button 
          type="submit" 
          disabled={isPending}
          className={`px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg flex items-center gap-2 ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isPending ? <Loader2 className="animate-spin" size={18} /> : null}
          {isPending ? 'Đang xử lý...' : (blog ? 'Cập Nhật Bài Viết' : 'Lưu & Đăng Bài')}
        </button>
      </div>
    </form>
  )
}
