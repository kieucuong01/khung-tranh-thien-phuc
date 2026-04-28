'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// --- PRODUCTS ---
export async function addProduct(formData: FormData) {
  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const price = parseInt(formData.get('price') as string) || 0
  const image_url = formData.get('image_url') as string
  const description = formData.get('description') as string

  if (!title || !category || !image_url) return

  await prisma.product.create({
    data: { title, category, price, image_url, description }
  })

  revalidatePath('/admin')
  revalidatePath('/')
  redirect('/admin?tab=products')
}

export async function updateProduct(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const price = parseInt(formData.get('price') as string) || 0
  const image_url = formData.get('image_url') as string
  const description = formData.get('description') as string

  if (!id || !title || !category || !image_url) return

  await prisma.product.update({
    where: { id },
    data: { title, category, price, image_url, description }
  })

  revalidatePath('/admin')
  revalidatePath(`/san-pham/${id}`)
  revalidatePath('/')
  redirect('/admin?tab=products')
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } })
  revalidatePath('/admin')
  revalidatePath('/')
}

// --- TESTIMONIALS ---
export async function addTestimonial(formData: FormData) {
  const name = formData.get('name') as string
  const role = formData.get('role') as string
  const text = formData.get('text') as string

  if (!name || !text) return

  await prisma.testimonial.create({
    data: { name, role, text }
  })

  revalidatePath('/admin')
  revalidatePath('/')
  redirect('/admin?tab=testimonials')
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } })
  revalidatePath('/admin')
  revalidatePath('/')
}

// --- GALLERY ---
export async function addGalleryImage(formData: FormData) {
  const image_url = formData.get('image_url') as string
  const title = formData.get('title') as string
  const category = formData.get('category') as string || 'Dự án'

  if (!image_url) return

  await prisma.galleryImage.create({
    data: { image_url, title, category }
  })

  revalidatePath('/admin')
  revalidatePath('/')
  revalidatePath('/thu-vien')
  redirect('/admin?tab=gallery')
}

export async function deleteGalleryImage(id: string) {
  await prisma.galleryImage.delete({ where: { id } })
  revalidatePath('/admin')
  revalidatePath('/')
}

// --- CONTACT REQUESTS ---
export async function submitContactRequest(formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const serviceType = formData.get('serviceType') as string
  const notes = formData.get('notes') as string

  if (!name || !phone) return { success: false, message: 'Vui lòng điền đủ thông tin bắt buộc.' }

  try {
    await prisma.contactRequest.create({
      data: { name, phone, serviceType, notes, status: 'pending' }
    })
    revalidatePath('/admin')
    return { success: true, message: 'Đã gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm.' }
  } catch (error) {
    return { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại sau.' }
  }
}

export async function markContacted(id: string) {
  await prisma.contactRequest.update({
    where: { id },
    data: { status: 'contacted' }
  })
  revalidatePath('/admin')
}

export async function deleteContactRequest(id: string) {
  await prisma.contactRequest.delete({ where: { id } })
  revalidatePath('/admin')
}

// --- BLOGS (TIN TỨC) ---
export async function addBlog(formData: FormData) {
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const image_url = formData.get('image_url') as string
  const category = formData.get('category') as string || 'Tin tức'
  
  // SEO & Schema fields
  const image_alt = formData.get('image_alt') as string
  const author = formData.get('author') as string
  const read_time = formData.get('read_time') as string
  const meta_title = formData.get('meta_title') as string
  const meta_description = formData.get('meta_description') as string
  const schema_type = formData.get('schema_type') as string
  const faq_items = JSON.parse(formData.get('faq_items') as string || '[]')
  const howto_steps = JSON.parse(formData.get('howto_steps') as string || '[]')
  const tags = (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(Boolean)
  const is_published = formData.get('is_published') === 'true'
  const published_at = formData.get('published_at') ? new Date(formData.get('published_at') as string) : new Date()
  const featured_product_ids = JSON.parse(formData.get('featured_product_ids') as string || '[]')
  const cta_text = formData.get('cta_text') as string
  const cta_link = formData.get('cta_link') as string

  if (!title || !slug || !content || !image_url) return

  await prisma.blog.create({
    data: { 
      title, slug, excerpt, content, image_url, category,
      image_alt, author, read_time, meta_title, meta_description,
      schema_type, faq_items, howto_steps, tags, is_published,
      published_at, featured_product_ids, cta_text, cta_link
    }
  })

  revalidatePath('/admin')
  revalidatePath('/tin-tuc')
  revalidatePath('/')
  redirect('/admin?tab=blog')
}

export async function updateBlog(formData: FormData) {
  try {
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const image_url = formData.get('image_url') as string
    const category = formData.get('category') as string || 'Tin tức'
    
    // SEO & Schema fields
    const image_alt = formData.get('image_alt') as string
    const author = formData.get('author') as string
    const read_time = formData.get('read_time') as string
    const meta_title = formData.get('meta_title') as string
    const meta_description = formData.get('meta_description') as string
    const schema_type = formData.get('schema_type') as string
    const faq_items = JSON.parse(formData.get('faq_items') as string || '[]')
    const howto_steps = JSON.parse(formData.get('howto_steps') as string || '[]')
    const tags = (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(Boolean)
    const is_published = formData.get('is_published') === 'true'
    const published_at = formData.get('published_at') ? new Date(formData.get('published_at') as string) : new Date()
    const featured_product_ids = JSON.parse(formData.get('featured_product_ids') as string || '[]')
    const cta_text = formData.get('cta_text') as string
    const cta_link = formData.get('cta_link') as string

    console.log('--- Update Blog Debug ---')
    console.log('ID:', id)
    console.log('Title:', title)
    console.log('Slug:', slug)
    console.log('Content exists:', !!content)
    console.log('Image URL:', image_url)

    if (!id || !title || !slug || !content || !image_url) {
      console.error('Validation failed: Missing required fields')
      return
    }

    await prisma.blog.update({
      where: { id },
      data: { 
        title, slug, excerpt, content, image_url, category,
        image_alt, author, read_time, meta_title, meta_description,
        schema_type, faq_items, howto_steps, tags, is_published,
        published_at, featured_product_ids, cta_text, cta_link
      }
    })

    console.log('Blog updated successfully')
    revalidatePath('/admin')
    revalidatePath(`/tin-tuc/${slug}`)
    revalidatePath('/tin-tuc')
    revalidatePath('/')
  } catch (error) {
    console.error('Error in updateBlog:', error)
    throw error
  }
  
  redirect('/admin?tab=blog')
}

export async function deleteBlog(id: string) {
  await prisma.blog.delete({ where: { id } })
  revalidatePath('/admin')
  revalidatePath('/tin-tuc')
}

// --- PRICE ITEMS ---
export async function addPriceItem(formData: FormData) {
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const size = formData.get('size') as string
  const price = parseInt(formData.get('price') as string) || 0

  if (!category || !size) return

  await prisma.priceItem.create({
    data: { category, description, size, price }
  })

  revalidatePath('/admin')
  revalidatePath('/bang-gia')
  redirect('/admin?tab=pricing')
}

export async function updatePriceItem(formData: FormData) {
  const id = formData.get('id') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const size = formData.get('size') as string
  const price = parseInt(formData.get('price') as string) || 0

  if (!id || !category || !size) return

  await prisma.priceItem.update({
    where: { id },
    data: { category, description, size, price }
  })

  revalidatePath('/admin')
  revalidatePath('/bang-gia')
  redirect('/admin?tab=pricing')
}

export async function deletePriceItem(id: string) {
  await prisma.priceItem.delete({ where: { id } })
  revalidatePath('/admin')
  revalidatePath('/bang-gia')
}

// --- SERVICES ---
export async function addService(formData: FormData) {
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const content = formData.get('content') as string
  const iconName = formData.get('iconName') as string
  const image_url = formData.get('image_url') as string
  const featured = formData.get('featured') === 'true'
  
  // SEO & Optimization fields
  const meta_title = formData.get('meta_title') as string
  const meta_description = formData.get('meta_description') as string
  const is_published = formData.get('is_published') === 'true'
  const published_at = formData.get('published_at') ? new Date(formData.get('published_at') as string) : new Date()
  const related_service_ids = JSON.parse(formData.get('related_service_ids') as string || '[]')

  if (!title || !slug || !content) return

  await prisma.service.create({
    data: { 
      title, slug, category, description, content, iconName, image_url, featured,
      meta_title, meta_description, is_published, published_at, related_service_ids
    }
  })

  revalidatePath('/admin')
  revalidatePath('/dich-vu')
  revalidatePath('/')
  redirect('/admin?tab=services')
}

export async function updateService(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const content = formData.get('content') as string
  const iconName = formData.get('iconName') as string
  const image_url = formData.get('image_url') as string
  const featured = formData.get('featured') === 'true'
  
  // SEO & Optimization fields
  const meta_title = formData.get('meta_title') as string
  const meta_description = formData.get('meta_description') as string
  const is_published = formData.get('is_published') === 'true'
  const published_at = formData.get('published_at') ? new Date(formData.get('published_at') as string) : new Date()
  const related_service_ids = JSON.parse(formData.get('related_service_ids') as string || '[]')

  if (!id || !title || !slug || !content) return

  await prisma.service.update({
    where: { id },
    data: { 
      title, slug, category, description, content, iconName, image_url, featured,
      meta_title, meta_description, is_published, published_at, related_service_ids
    }
  })

  revalidatePath('/admin')
  revalidatePath(`/dich-vu/${slug}`)
  revalidatePath('/dich-vu')
  revalidatePath('/')
  redirect('/admin?tab=services')
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } })
  revalidatePath('/admin')
  revalidatePath('/dich-vu')
  revalidatePath('/')
}
