import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const slugify = (s) =>
  s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim().replace(/\s+/g, "-").replace(/-+/g, "-");

async function main() {
  console.log('Updating slugs for existing blogs...')
  const blogs = await prisma.blog.findMany()

  for (const blog of blogs) {
    if (!blog.slug) {
      const slug = slugify(blog.title)
      await prisma.blog.update({
        where: { id: blog.id },
        data: { 
          slug,
          meta_title: blog.title,
          meta_description: blog.excerpt,
          image_alt: blog.title,
          is_published: true,
          published_at: blog.createdAt
        }
      })
      console.log(`Updated slug for: ${blog.title} -> ${slug}`)
    }
  }
  console.log('Update completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
