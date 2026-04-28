import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const blog = await prisma.blog.findFirst({ select: { slug: true, id: true } })
  console.log(JSON.stringify(blog))
}
main().finally(() => prisma.$disconnect())
