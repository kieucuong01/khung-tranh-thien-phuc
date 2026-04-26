'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

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

// --- BLOGS ---
export async function addBlog(formData: FormData) {
  const title = formData.get('title') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const image_url = formData.get('image_url') as string

  if (!title || !content || !image_url) return

  await prisma.blog.create({
    data: { title, excerpt, content, image_url }
  })

  revalidatePath('/admin')
  revalidatePath('/blog')
  revalidatePath('/')
}

export async function updateBlog(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const image_url = formData.get('image_url') as string

  if (!id || !title || !content || !image_url) return

  await prisma.blog.update({
    where: { id },
    data: { title, excerpt, content, image_url }
  })

  revalidatePath('/admin')
  revalidatePath(`/blog/${id}`)
  revalidatePath('/blog')
  revalidatePath('/')
}

export async function deleteBlog(id: string) {
  await prisma.blog.delete({ where: { id } })
  revalidatePath('/admin')
  revalidatePath('/blog')
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
}

export async function deletePriceItem(id: string) {
  await prisma.priceItem.delete({ where: { id } })
  revalidatePath('/admin')
  revalidatePath('/bang-gia')
}
