import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding data...')

  // Seed Products
  await prisma.product.deleteMany({})
  const products = [
    {
      title: 'Khung Gỗ Sồi Tân Cổ Điển',
      category: 'Gỗ Tự Nhiên',
      price: 450000,
      image_url: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=600&auto=format&fit=crop',
      description: 'Khung gỗ sồi cao cấp, phù hợp tranh sơn dầu.'
    },
    {
      title: 'Khung Composite Đen Bản Nhỏ',
      category: 'Composite',
      price: 150000,
      image_url: 'https://images.unsplash.com/photo-1578308892434-7128d56b0265?q=80&w=600&auto=format&fit=crop',
      description: 'Khung viền mỏng hiện đại, tối giản.'
    },
    {
      title: 'Khung Tranh Thêu Gỗ Hương',
      category: 'Tranh Thêu',
      price: 850000,
      image_url: 'https://images.unsplash.com/photo-1582201943021-e8e5b6151da1?q=80&w=600&auto=format&fit=crop',
      description: 'Đóng khung tranh thêu chữ thập tỉ mỉ.'
    },
    {
      title: 'Khung Bằng Khen Giao Hỏa Tốc',
      category: 'Khác',
      price: 120000,
      image_url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
      description: 'Khung chứng nhận, bằng khen sang trọng.'
    }
  ]

  for (const p of products) {
    await prisma.product.create({ data: p })
  }
  console.log('Products seeded.')

  // Seed Testimonials
  await prisma.testimonial.deleteMany({})
  const testimonials = [
    { name: "Chị Lan Anh", role: "Khách hàng cá nhân", text: "Thiên Phúc làm khung rất đẹp và tỉ mỉ. Bức tranh thêu chữ thập của mình mang đến đóng khung gỗ sồi lên nhìn sang trọng hẳn ra. Cảm ơn shop!" },
    { name: "Anh Tuấn Vũ", role: "Chủ Studio Ảnh", text: "Giá cả hợp lý, chất lượng composite rất tốt, không bị giòn như các chỗ khác. Thường xuyên đặt số lượng lớn tại đây và luôn được giao đúng hẹn." },
    { name: "Cô Hoa", role: "Nghệ sĩ vẽ tranh", text: "Nhân viên tư vấn rất có gu thẩm mỹ, chọn giúp tôi bo viền (matboard) cực kỳ hợp màu với bức tranh sơn dầu. Sẽ ủng hộ lâu dài." }
  ]
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t })
  }
  console.log('Testimonials seeded.')

  // Seed Gallery
  await prisma.galleryImage.deleteMany({})
  const gallery = [
    { image_url: "https://images.unsplash.com/photo-1578308892434-7128d56b0265?q=80&w=600&auto=format&fit=crop", title: "Khung tranh hiện đại" },
    { image_url: "https://images.unsplash.com/photo-1582201943021-e8e5b6151da1?q=80&w=600&auto=format&fit=crop", title: "Khung tranh gỗ" },
    { image_url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop", title: "Bố cục tranh treo tường" },
    { image_url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop", title: "Khung tranh triển lãm" },
    { image_url: "https://images.unsplash.com/photo-1584988267232-a5e2f9d6ab1b?q=80&w=600&auto=format&fit=crop", title: "Khung trang trí nội thất" },
    { image_url: "https://images.unsplash.com/photo-1590212151175-e58edd96185b?q=80&w=600&auto=format&fit=crop", title: "Khung tranh gia đình" }
  ]
  for (const g of gallery) {
    await prisma.galleryImage.create({ data: g })
  }
  console.log('Gallery seeded.')

  // Seed Blogs
  await prisma.blog.deleteMany({})
  const blogs = [
    {
      title: 'Cách chọn khung tranh phù hợp với không gian nội thất',
      excerpt: 'Việc lựa chọn một chiếc khung tranh không chỉ đơn thuần là bảo vệ tác phẩm, mà còn là cách để tôn vinh vẻ đẹp và tạo sự hài hòa cho căn phòng.',
      content: 'Lựa chọn khung tranh là một nghệ thuật. Bạn cần chú ý đến màu sắc của bức tường, phong cách thiết kế của căn phòng (hiện đại, cổ điển hay tối giản) và đặc biệt là nội dung của bức tranh. Một bức tranh sơn dầu khổ lớn thường hợp với khung gỗ sồi bản to, hoa văn cầu kỳ. Trong khi đó, những tấm ảnh gia đình hiện đại lại cực kỳ nổi bật trong những chiếc khung composite đen trắng tối giản.',
      image_url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800&auto=format&fit=crop'
    }
  ]
  for (const b of blogs) {
    await prisma.blog.create({ data: b })
  }
  console.log('Blogs seeded.')

  // Seed PriceItems
  await prisma.priceItem.deleteMany({})
  const priceItems = [
    { category: 'Khung Gỗ Sồi', description: 'Màu gỗ sáng, vân đẹp tự nhiên, sơn PU chống ẩm.', size: '30x40', price: 180000 },
    { category: 'Khung Gỗ Sồi', description: 'Màu gỗ sáng, vân đẹp tự nhiên, sơn PU chống ẩm.', size: '40x60', price: 250000 },
    { category: 'Khung Gỗ Sồi', description: 'Màu gỗ sáng, vân đẹp tự nhiên, sơn PU chống ẩm.', size: '50x75', price: 380000 },
    { category: 'Khung Composite', description: 'Bản 3cm, đa dạng màu sắc (Đen, Trắng, Gỗ, Bạc).', size: '30x40', price: 85000 },
    { category: 'Khung Composite', description: 'Bản 3cm, đa dạng màu sắc (Đen, Trắng, Gỗ, Bạc).', size: '40x60', price: 120000 },
    { category: 'Khung Composite', description: 'Bản 3cm, đa dạng màu sắc (Đen, Trắng, Gỗ, Bạc).', size: '50x75', price: 180000 }
  ]
  for (const pi of priceItems) {
    await prisma.priceItem.create({ data: pi })
  }
  console.log('Price items seeded.')

  console.log('Seeding completed!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
