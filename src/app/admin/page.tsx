import prisma from '@/lib/prisma'
import Link from 'next/link'
import { 
  addTestimonial, deleteTestimonial, 
  markContacted, deleteContactRequest,
  addBlog, updateBlog, deleteBlog,
  addService, updateService, deleteService
} from './actions'
import { Trash2, CheckCircle, MessageSquare, Users, FileText, Edit, X, Briefcase, Plus, ExternalLink, ShieldCheck } from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'
import BlogEditor from '@/components/admin/BlogEditor'
import ServiceEditor from '@/components/admin/ServiceEditor'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function AdminPage({ 
  searchParams 
}: { 
  searchParams: { 
    tab?: string, 
    editBlog?: string,
    editService?: string,
    addNewBlog?: string,
    addNewService?: string
  } 
}) {
  const currentTab = searchParams.tab || 'contacts'
  const editBlogId = searchParams.editBlog
  const editServiceId = searchParams.editService
  const isAddingNewBlog = searchParams.addNewBlog === 'true'
  const isAddingNewService = searchParams.addNewService === 'true'

  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
  const contacts = await prisma.contactRequest.findMany({ orderBy: { createdAt: 'desc' } })
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } })
  const services = await prisma.service.findMany({ orderBy: { createdAt: 'desc' } })

  const blogToEdit = editBlogId ? blogs.find(b => b.id === editBlogId) : null
  const serviceToEdit = editServiceId ? services.find(s => s.id === editServiceId) : null

  const tabs = [
    { id: 'contacts', name: 'Yêu Cầu', icon: MessageSquare, count: contacts.filter(c => c.status === 'pending').length },
    { id: 'services', name: 'Dịch Vụ', icon: Briefcase, count: services.length },
    { id: 'blog', name: 'Tin Tức & SEO', icon: FileText, count: blogs.length },
    { id: 'testimonials', name: 'Đánh Giá', icon: Users, count: testimonials.length },
  ]

  const blogCategories = [
    'Đăng ký kinh doanh',
    'Kế Toán',
    'Kiểm Toán',
    'Thuế',
    'BHXH',
    'Tài chính BDS',
    'Tuyển Dụng'
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Top Header */}
      <header className="bg-[#2c241b] text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-accent p-2 rounded-lg">
                <ShieldCheck size={20} />
             </div>
             <h1 className="text-xl font-bold font-serif tracking-wide">Admin Thiên Phúc</h1>
          </div>
          <Link href="/" className="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all flex items-center gap-2">
            Xem Website <ExternalLink size={12} />
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Tabs Nav */}
        <div className="flex flex-wrap gap-2 mb-10 bg-white p-2 rounded-2xl shadow-sm border border-border inline-flex">
          {tabs.map(tab => {
            const isActive = currentTab === tab.id
            return (
              <Link 
                key={tab.id} 
                href={`/admin?tab=${tab.id}`}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <tab.icon size={16} />
                {tab.name}
                {tab.id === 'contacts' && tab.count > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-bounce">
                    {tab.count}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* --- TAB: CONTACTS --- */}
        {currentTab === 'contacts' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold font-serif text-foreground">Yêu cầu tư vấn mới</h2>
            <div className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-[10px] uppercase bg-secondary/50 text-muted-foreground tracking-widest border-b border-border">
                    <tr>
                      <th className="px-8 py-5 font-bold">Ngày</th>
                      <th className="px-8 py-5 font-bold">Khách Hàng</th>
                      <th className="px-8 py-5 font-bold">Dịch vụ</th>
                      <th className="px-8 py-5 font-bold">Ghi chú</th>
                      <th className="px-8 py-5 font-bold text-center">Trạng thái</th>
                      <th className="px-8 py-5 font-bold text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {contacts.length === 0 ? (
                      <tr><td colSpan={6} className="px-8 py-16 text-center text-muted-foreground">Chưa có yêu cầu nào mới.</td></tr>
                    ) : contacts.map(c => (
                      <tr key={c.id} className={`hover:bg-secondary/20 transition-colors ${c.status === 'pending' ? 'bg-primary/5' : ''}`}>
                        <td className="px-8 py-5 whitespace-nowrap text-muted-foreground text-xs font-medium">{c.createdAt.toLocaleDateString('vi-VN')}</td>
                        <td className="px-8 py-5"><p className="font-bold text-foreground">{c.name}</p><a href={`tel:${c.phone}`} className="text-primary hover:underline text-xs font-medium">{c.phone}</a></td>
                        <td className="px-8 py-5"><span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold text-foreground uppercase">{c.serviceType}</span></td>
                        <td className="px-8 py-5 max-w-xs truncate text-xs text-muted-foreground italic" title={c.notes || ''}>{c.notes || '-'}</td>
                        <td className="px-8 py-5 text-center">
                          {c.status === 'pending' ? (
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase shadow-sm">Mới</span>
                          ) : (
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase shadow-sm">Đã xong</span>
                          )}
                        </td>
                        <td className="px-8 py-5 text-center">
                          <div className="flex justify-center gap-2">
                            {c.status === 'pending' && (
                              <form action={async () => { 'use server'; await markContacted(c.id) }}>
                                <button type="submit" className="text-green-600 hover:bg-green-50 p-2.5 rounded-xl border border-green-100 shadow-sm" title="Hoàn tất"><CheckCircle size={18} /></button>
                              </form>
                            )}
                            <form action={async () => { 'use server'; await deleteContactRequest(c.id) }}>
                              <button type="submit" className="text-red-500 hover:bg-red-50 p-2.5 rounded-xl border border-red-100 shadow-sm" title="Xóa"><Trash2 size={18} /></button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: SERVICES --- */}
        {currentTab === 'services' && (
          (serviceToEdit || isAddingNewService) ? (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-3xl shadow-xl border border-border p-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold font-serif text-foreground">{serviceToEdit ? 'Chỉnh Sửa Dịch Vụ & SEO' : 'Thêm Dịch Vụ Mới'}</h2>
                  <Link href="/admin?tab=services" className="text-sm font-bold text-red-500 hover:bg-red-50 px-5 py-2.5 rounded-xl border border-red-100 transition-all flex items-center gap-2"><X size={16} /> Thoát Chế Độ Sửa</Link>
                </div>
                <ServiceEditor 
                  service={serviceToEdit ? JSON.parse(JSON.stringify(serviceToEdit)) : null} 
                  allServices={JSON.parse(JSON.stringify(services))}
                  action={serviceToEdit ? updateService : addService} 
                />
              </div>
            </div>
          ) : (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold font-serif text-foreground">Quản lý Dịch Vụ</h2>
                <Link href="/admin?tab=services&addNewService=true" className="bg-primary text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
                  <Plus size={20} /> Thêm Dịch Vụ
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(s => (
                  <div key={s.id} className={`bg-white rounded-3xl shadow-lg border border-border overflow-hidden group hover:-translate-y-1 transition-all ${editServiceId === s.id ? 'ring-4 ring-primary/20' : ''}`}>
                    <div className="relative aspect-video">
                      <Image src={s.image_url} alt="" fill className="object-cover" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase">{s.category}</div>
                      {s.featured && <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-[9px] font-black uppercase">Nổi bật</div>}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{s.description}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-border">
                         <Link href={`/admin?tab=services&editService=${s.id}`} className="text-sm font-bold text-primary hover:underline flex items-center gap-1"><Edit size={14}/> Sửa</Link>
                         <form action={async () => { 'use server'; await deleteService(s.id) }}>
                           <button type="submit" className="text-xs font-bold text-red-400 hover:text-red-600">Xóa</button>
                         </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {/* --- TAB: BLOG & SEO --- */}
        {currentTab === 'blog' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* List or Editor */}
            {(blogToEdit || isAddingNewBlog) ? (
              <div className="bg-white rounded-3xl shadow-xl border border-border p-8">
                <div className="flex justify-between items-center mb-10">
                   <h2 className="text-2xl font-bold font-serif text-foreground">{blogToEdit ? 'Chỉnh Sửa Bài Viết & SEO' : 'Soạn Thảo Tin Tức Chuẩn SEO'}</h2>
                   <Link href="/admin?tab=blog" className="text-sm font-bold text-red-500 hover:bg-red-50 px-5 py-2.5 rounded-xl border border-red-100 transition-all flex items-center gap-2"><X size={16} /> Thoát Chế Độ Sửa</Link>
                </div>
                <BlogEditor 
                  key={blogToEdit?.id || 'new'}
                  blog={blogToEdit ? JSON.parse(JSON.stringify(blogToEdit)) : null} 
                  services={JSON.parse(JSON.stringify(services))} 
                  categories={blogCategories} 
                  action={blogToEdit ? updateBlog : addBlog} 
                />
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                   <h2 className="text-2xl font-bold font-serif text-foreground">Danh sách Tin Tức & SEO</h2>
                   <Link href="/admin?tab=blog&addNewBlog=true" className="bg-accent text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-accent/20 hover:scale-105 transition-all flex items-center gap-2">
                     <Plus size={20} /> Viết Bài Mới
                   </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="text-[10px] uppercase bg-secondary/50 text-muted-foreground tracking-widest border-b border-border">
                      <tr>
                        <th className="px-8 py-5 font-bold">Ảnh</th>
                        <th className="px-8 py-5 font-bold">Tiêu đề & Phân loại</th>
                        <th className="px-8 py-5 font-bold">Lượt xem / SEO</th>
                        <th className="px-8 py-5 font-bold text-center">Trạng thái</th>
                        <th className="px-8 py-5 font-bold text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {blogs.length === 0 ? (
                        <tr><td colSpan={5} className="px-8 py-16 text-center text-muted-foreground">Chưa có bài viết nào. Hãy viết bài đầu tiên!</td></tr>
                      ) : blogs.map(b => (
                        <tr key={b.id} className="hover:bg-secondary/20 transition-colors">
                          <td className="px-8 py-5">
                            <div className="w-24 h-14 relative rounded-xl overflow-hidden border border-border shadow-sm">
                              <Image src={b.image_url} alt="" fill className="object-cover" />
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <p className="font-bold text-foreground line-clamp-1 mb-1">{b.title}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded font-black uppercase tracking-tighter">{b.category}</span>
                              <span className="text-[9px] text-muted-foreground font-medium">/{b.slug || 'chua-co-link'}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                             <div className="flex flex-col gap-1">
                               <div className="flex items-center gap-1.5">
                                  <div className={`w-2 h-2 rounded-full ${b.meta_title && b.meta_description ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase">SEO Score</span>
                               </div>
                               <span className="text-[10px] text-muted-foreground">{new Date(b.published_at).toLocaleDateString('vi-VN')}</span>
                             </div>
                          </td>
                          <td className="px-8 py-5 text-center">
                            {b.is_published ? (
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[9px] font-black uppercase border border-green-200">Đã đăng</span>
                            ) : (
                              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-[9px] font-black uppercase border border-yellow-200">Bản nháp</span>
                            )}
                          </td>
                          <td className="px-8 py-5 text-center">
                            <div className="flex justify-center gap-2">
                              <Link href={`/admin?tab=blog&editBlog=${b.id}`} className="text-primary hover:bg-primary/10 p-2.5 rounded-xl border border-primary/20 shadow-sm" title="Sửa SEO"><Edit size={18} /></Link>
                              <form action={async () => { 'use server'; await deleteBlog(b.id) }}>
                                <button type="submit" className="text-red-500 hover:bg-red-50 p-2.5 rounded-xl border border-red-100 shadow-sm" title="Xóa"><Trash2 size={18}/></button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- TAB: TESTIMONIALS --- */}
        {currentTab === 'testimonials' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl shadow-xl border border-border p-8">
              <h2 className="text-2xl font-bold font-serif text-foreground mb-8">Khách hàng đánh giá</h2>
              <form action={addTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <input name="name" type="text" required placeholder="Tên khách hàng..." className="w-full px-4 py-2.5 border rounded-xl" />
                  <input name="role" type="text" required placeholder="Vai trò / Công ty..." className="w-full px-4 py-2.5 border rounded-xl" />
                </div>
                <textarea name="text" required rows={3} placeholder="Nội dung lời chứng thực của khách hàng..." className="px-4 py-2.5 border rounded-xl" />
                <button type="submit" className="md:col-span-2 bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20">Thêm Đánh Giá</button>
              </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map(t => (
                <div key={t.id} className="bg-white p-6 rounded-3xl border border-border shadow-md flex justify-between gap-6 hover:shadow-xl transition-all">
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-primary">{t.name.charAt(0)}</div>
                        <div>
                           <p className="font-bold text-foreground leading-none">{t.name}</p>
                           <p className="text-[10px] text-muted-foreground mt-1 font-bold uppercase tracking-wider">{t.role}</p>
                        </div>
                     </div>
                     <p className="text-sm italic text-gray-600 leading-relaxed">&quot;{t.text}&quot;</p>
                  </div>
                  <form action={async () => { 'use server'; await deleteTestimonial(t.id) }}>
                    <button type="submit" className="text-red-400 hover:bg-red-50 p-2.5 rounded-xl border border-red-50 shadow-sm" title="Xóa"><Trash2 size={18}/></button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
