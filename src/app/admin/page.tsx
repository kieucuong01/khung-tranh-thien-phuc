import prisma from '@/lib/prisma'
import Link from 'next/link'
import { 
  addProduct, updateProduct, deleteProduct, 
  addTestimonial, deleteTestimonial, 
  addGalleryImage, deleteGalleryImage,
  markContacted, deleteContactRequest,
  addBlog, updateBlog, deleteBlog,
  addPriceItem, updatePriceItem, deletePriceItem
} from './actions'
import { Trash2, CheckCircle, Image as ImageIcon, MessageSquare, Users, Package, FileText, Edit, X, DollarSign, Camera } from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function AdminPage({ 
  searchParams 
}: { 
  searchParams: { 
    tab?: string, 
    editProduct?: string,
    editBlog?: string,
    editPrice?: string
  } 
}) {
  const currentTab = searchParams.tab || 'contacts'
  const editProductId = searchParams.editProduct
  const editBlogId = searchParams.editBlog
  const editPriceId = searchParams.editPrice

  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
  const gallery = await prisma.galleryImage.findMany({ orderBy: { createdAt: 'desc' } })
  const contacts = await prisma.contactRequest.findMany({ orderBy: { createdAt: 'desc' } })
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } })
  const prices = await prisma.priceItem.findMany({ orderBy: { category: 'asc' } })

  const productToEdit = editProductId ? products.find(p => p.id === editProductId) : null
  const blogToEdit = editBlogId ? blogs.find(b => b.id === editBlogId) : null
  const priceToEdit = editPriceId ? prices.find(p => p.id === editPriceId) : null

  const tabs = [
    { id: 'contacts', name: 'Yêu Cầu', icon: MessageSquare, count: contacts.filter(c => c.status === 'pending').length },
    { id: 'products', name: 'Sản Phẩm', icon: Package, count: products.length },
    { id: 'blog', name: 'Bài Viết', icon: FileText, count: blogs.length },
    { id: 'gallery', name: 'Tác Phẩm', icon: Camera, count: gallery.length },
    { id: 'pricing', name: 'Bảng Giá', icon: DollarSign, count: prices.length },
    { id: 'gallery_old', name: 'Ảnh', icon: ImageIcon, count: 0 }, // Giữ lại để tránh lỗi nếu có link cũ, nhưng sẽ ẩn
    { id: 'testimonials', name: 'Đánh Giá', icon: Users, count: testimonials.length },
  ].filter(t => t.id !== 'gallery_old')

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-serif text-primary">Quản Trị Hệ Thống</h1>
        <Link href="/" className="text-sm font-medium underline hover:text-primary transition-colors">
          &larr; Về trang chủ
        </Link>
      </div>
      
      {/* Tabs Nav */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
        {tabs.map(tab => {
          const isActive = currentTab === tab.id || (currentTab === 'gallery_old' && tab.id === 'gallery')
          return (
            <Link 
              key={tab.id} 
              href={`/admin?tab=${tab.id}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-secondary/50 text-foreground hover:bg-secondary'
              }`}
            >
              <tab.icon size={16} />
              {tab.name}
              {tab.id === 'contacts' && tab.count > 0 && (
                <span className="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      {/* --- TAB: CONTACTS --- */}
      {currentTab === 'contacts' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4 border-l-4 border-primary pl-3">Danh sách khách hàng cần tư vấn</h2>
          <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-secondary text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Ngày</th>
                    <th className="px-6 py-4 font-semibold">Khách Hàng</th>
                    <th className="px-6 py-4 font-semibold">Dịch vụ</th>
                    <th className="px-6 py-4 font-semibold max-w-xs">Ghi chú</th>
                    <th className="px-6 py-4 font-semibold text-center">Trạng thái</th>
                    <th className="px-6 py-4 font-semibold text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {contacts.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">Chưa có yêu cầu nào.</td></tr>
                  ) : contacts.map(c => (
                    <tr key={c.id} className={`hover:bg-muted/50 transition-colors ${c.status === 'pending' ? 'bg-accent/5' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground text-xs">{c.createdAt.toLocaleDateString('vi-VN')}</td>
                      <td className="px-6 py-4"><p className="font-bold">{c.name}</p><a href={`tel:${c.phone}`} className="text-primary hover:underline text-xs">{c.phone}</a></td>
                      <td className="px-6 py-4 font-medium">{c.serviceType}</td>
                      <td className="px-6 py-4 max-w-xs truncate text-xs" title={c.notes || ''}>{c.notes || '-'}</td>
                      <td className="px-6 py-4 text-center">
                        {c.status === 'pending' ? (
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-[10px] font-bold border border-red-200 uppercase">Mới</span>
                        ) : (
                          <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-[10px] font-bold border border-green-200 uppercase">Xong</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          {c.status === 'pending' && (
                            <form action={async () => { 'use server'; await markContacted(c.id) }}>
                              <button type="submit" className="text-green-600 hover:bg-green-50 p-2 rounded-full" title="Đánh dấu đã liên hệ"><CheckCircle size={18} /></button>
                            </form>
                          )}
                          <form action={async () => { 'use server'; await deleteContactRequest(c.id) }}>
                            <button type="submit" className="text-red-500 hover:bg-red-50 p-2 rounded-full" title="Xóa"><Trash2 size={18} /></button>
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

      {/* --- TAB: PRODUCTS --- */}
      {currentTab === 'products' && (
        <div className="space-y-10">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold border-l-4 border-primary pl-3">{productToEdit ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h2>
              {productToEdit && (<Link href="/admin?tab=products" className="text-sm text-muted-foreground hover:text-red-500 flex items-center gap-1"><X size={16} /> Hủy chỉnh sửa</Link>)}
            </div>
            <form action={productToEdit ? updateProduct : addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productToEdit && <input type="hidden" name="id" value={productToEdit.id} />}
              <input name="title" type="text" required defaultValue={productToEdit?.title || ''} placeholder="Tên sản phẩm..." className="px-4 py-2 border rounded-md" />
              <select name="category" required defaultValue={productToEdit?.category || 'Gỗ Tự Nhiên'} className="px-4 py-2 border rounded-md">
                <option value="Gỗ Tự Nhiên">Gỗ Tự Nhiên</option>
                <option value="Composite">Composite</option>
                <option value="Tranh Thêu">Tranh Thêu</option>
                <option value="Khác">Khác</option>
              </select>
              <input name="price" type="number" required min="0" defaultValue={productToEdit?.price || 0} placeholder="Giá (VNĐ)..." className="px-4 py-2 border rounded-md" />
              <input name="image_url" type="url" required defaultValue={productToEdit?.image_url || ''} placeholder="Link ảnh URL..." className="px-4 py-2 border rounded-md" />
              <textarea name="description" required rows={2} defaultValue={productToEdit?.description || ''} placeholder="Mô tả..." className="px-4 py-2 border rounded-md md:col-span-2" />
              <button type="submit" className="md:col-span-2 bg-primary text-white font-bold py-2 rounded-md hover:bg-primary/90">{productToEdit ? 'Cập Nhật' : 'Thêm'}</button>
            </form>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary text-muted-foreground"><tr><th className="px-6 py-3">Ảnh</th><th className="px-6 py-3">Tên & Phân loại</th><th className="px-6 py-3">Giá</th><th className="px-6 py-3 text-center">Thao tác</th></tr></thead>
              <tbody className="divide-y divide-border">
                {products.map(p => (
                  <tr key={p.id} className={editProductId === p.id ? 'bg-primary/5' : ''}>
                    <td className="px-6 py-3"><div className="w-12 h-12 relative rounded overflow-hidden"><Image src={p.image_url} alt="" fill className="object-cover" /></div></td>
                    <td className="px-6 py-3"><p className="font-bold">{p.title}</p><p className="text-xs text-muted-foreground">{p.category}</p></td>
                    <td className="px-6 py-3 font-medium text-primary">{p.price.toLocaleString()}đ</td>
                    <td className="px-6 py-3 text-center"><div className="flex justify-center gap-2">
                      <Link href={`/admin?tab=products&editProduct=${p.id}`} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"><Edit size={18} /></Link>
                      <form action={async () => { 'use server'; await deleteProduct(p.id) }}><button type="submit" className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 size={18}/></button></form>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB: GALLERY (TÁC PHẨM) --- */}
      {(currentTab === 'gallery' || currentTab === 'gallery_old') && (
        <div className="space-y-10">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <h2 className="text-xl font-bold mb-4 border-l-4 border-primary pl-3">Thêm Tác Phẩm Đã Thực Hiện</h2>
            <form action={addGalleryImage} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="image_url" type="url" required placeholder="Link ảnh URL..." className="px-4 py-2 border rounded-md" />
              <input name="title" type="text" placeholder="Tiêu đề tác phẩm..." className="px-4 py-2 border rounded-md" />
              <select name="category" required className="px-4 py-2 border rounded-md">
                <option value="Dự án">Dự án chung</option>
                <option value="Khung Gỗ">Khung Gỗ Tự Nhiên</option>
                <option value="Khung Composite">Khung Composite</option>
                <option value="Tranh Thêu">Tranh Thêu</option>
                <option value="Bằng Khen">Bằng Khen / Chứng Chỉ</option>
              </select>
              <button type="submit" className="md:col-span-3 bg-primary text-white font-bold py-2 rounded-md hover:bg-primary/90">Thêm Vào Thư Viện</button>
            </form>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {gallery.length === 0 ? (
              <p className="col-span-full text-center py-10 text-muted-foreground">Chưa có tác phẩm nào.</p>
            ) : gallery.map(g => (
              <div key={g.id} className="relative group rounded-xl overflow-hidden border border-border bg-white shadow-sm flex flex-col">
                <div className="relative aspect-square">
                  <Image src={g.image_url} alt={g.title || ''} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <form action={async () => { 'use server'; await deleteGalleryImage(g.id) }}>
                      <button type="submit" className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 shadow-lg"><Trash2 size={20}/></button>
                    </form>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-[10px] font-bold text-primary uppercase mb-1">{g.category}</p>
                  <p className="text-sm font-bold text-foreground line-clamp-1">{g.title || 'Không tiêu đề'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB: BLOG --- */}
      {currentTab === 'blog' && (
        <div className="space-y-10">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold border-l-4 border-primary pl-3">{blogToEdit ? 'Chỉnh Sửa Bài Viết' : 'Thêm Bài Viết Mới'}</h2>
              {blogToEdit && (<Link href="/admin?tab=blog" className="text-sm text-muted-foreground hover:text-red-500 flex items-center gap-1"><X size={16} /> Hủy chỉnh sửa</Link>)}
            </div>
            <form action={blogToEdit ? updateBlog : addBlog} className="grid grid-cols-1 gap-4">
              {blogToEdit && <input type="hidden" name="id" value={blogToEdit.id} />}
              <input name="title" type="text" required defaultValue={blogToEdit?.title || ''} placeholder="Tiêu đề bài viết..." className="px-4 py-2 border rounded-md w-full" />
              <input name="image_url" type="url" required defaultValue={blogToEdit?.image_url || ''} placeholder="Link ảnh nền (URL)..." className="px-4 py-2 border rounded-md w-full" />
              <textarea name="excerpt" required rows={2} defaultValue={blogToEdit?.excerpt || ''} placeholder="Mô tả ngắn..." className="px-4 py-2 border rounded-md w-full" />
              <RichTextEditor name="content" defaultValue={blogToEdit?.content || ''} />
              <button type="submit" className="bg-primary text-white font-bold py-2 rounded-md hover:bg-primary/90 mt-12">{blogToEdit ? 'Cập Nhật' : 'Đăng Bài'}</button>
            </form>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary text-muted-foreground"><tr><th className="px-6 py-3">Ảnh</th><th className="px-6 py-3">Tiêu đề & Ngày đăng</th><th className="px-6 py-3 text-center">Thao tác</th></tr></thead>
              <tbody className="divide-y divide-border">
                {blogs.map(b => (
                  <tr key={b.id}>
                    <td className="px-6 py-3"><div className="w-20 h-12 relative rounded overflow-hidden"><Image src={b.image_url} alt="" fill className="object-cover" /></div></td>
                    <td className="px-6 py-3"><p className="font-bold line-clamp-1">{b.title}</p><p className="text-xs text-muted-foreground">{b.createdAt.toLocaleDateString('vi-VN')}</p></td>
                    <td className="px-6 py-3 text-center"><div className="flex justify-center gap-2">
                      <Link href={`/admin?tab=blog&editBlog=${b.id}`} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"><Edit size={16} /></Link>
                      <form action={async () => { 'use server'; await deleteBlog(b.id) }}><button type="submit" className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 size={16}/></button></form>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB: PRICING --- */}
      {currentTab === 'pricing' && (
        <div className="space-y-10">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold border-l-4 border-primary pl-3">{priceToEdit ? 'Chỉnh Sửa Dòng Giá' : 'Thêm Dòng Giá Mới'}</h2>
              {priceToEdit && (<Link href="/admin?tab=pricing" className="text-sm text-muted-foreground hover:text-red-500 flex items-center gap-1"><X size={16} /> Hủy chỉnh sửa</Link>)}
            </div>
            <form action={priceToEdit ? updatePriceItem : addPriceItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {priceToEdit && <input type="hidden" name="id" value={priceToEdit.id} />}
              <input name="category" type="text" required defaultValue={priceToEdit?.category || ''} placeholder="Loại khung (VD: Khung Gỗ Sồi)..." className="px-4 py-2 border rounded-md" />
              <input name="size" type="text" required defaultValue={priceToEdit?.size || ''} placeholder="Kích thước (VD: 30x40)..." className="px-4 py-2 border rounded-md" />
              <input name="price" type="number" required min="0" defaultValue={priceToEdit?.price || 0} placeholder="Giá (VNĐ)..." className="px-4 py-2 border rounded-md" />
              <input name="description" type="text" defaultValue={priceToEdit?.description || ''} placeholder="Mô tả phụ..." className="px-4 py-2 border rounded-md" />
              <button type="submit" className="md:col-span-2 bg-primary text-white font-bold py-2 rounded-md hover:bg-primary/90">{priceToEdit ? 'Cập Nhật' : 'Thêm Vào Bảng Giá'}</button>
            </form>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary text-muted-foreground"><tr><th className="px-6 py-3">Nhóm / Loại</th><th className="px-6 py-3">Kích thước</th><th className="px-6 py-3">Giá</th><th className="px-6 py-3 text-center">Thao tác</th></tr></thead>
              <tbody className="divide-y divide-border">
                {prices.map(p => (
                  <tr key={p.id}>
                    <td className="px-6 py-3 font-bold">{p.category}</td>
                    <td className="px-6 py-3">{p.size}</td>
                    <td className="px-6 py-3 font-medium text-primary">{p.price.toLocaleString()}đ</td>
                    <td className="px-6 py-3 text-center"><div className="flex justify-center gap-2">
                      <Link href={`/admin?tab=pricing&editPrice=${p.id}`} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"><Edit size={16} /></Link>
                      <form action={async () => { 'use server'; await deletePriceItem(p.id) }}><button type="submit" className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 size={16}/></button></form>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB: TESTIMONIALS --- */}
      {currentTab === 'testimonials' && (
        <div className="space-y-10">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <h2 className="text-xl font-bold mb-4 border-l-4 border-primary pl-3">Thêm Khách Hàng Đánh Giá</h2>
            <form action={addTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" type="text" required placeholder="Tên khách hàng..." className="px-4 py-2 border rounded-md" />
              <input name="role" type="text" required placeholder="Vai trò..." className="px-4 py-2 border rounded-md" />
              <textarea name="text" required rows={3} placeholder="Nội dung đánh giá..." className="md:col-span-2 px-4 py-2 border rounded-md" />
              <button type="submit" className="md:col-span-2 bg-primary text-white font-bold py-2 rounded-md hover:bg-primary/90">Thêm</button>
            </form>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map(t => (
              <div key={t.id} className="bg-white p-4 rounded-xl border border-border flex justify-between gap-4">
                <div><p className="font-bold text-lg">{t.name}</p><p className="text-xs text-muted-foreground mb-2">{t.role}</p><p className="text-sm italic text-gray-600">&quot;{t.text}&quot;</p></div>
                <form action={async () => { 'use server'; await deleteTestimonial(t.id) }}><button type="submit" className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 size={18}/></button></form>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
