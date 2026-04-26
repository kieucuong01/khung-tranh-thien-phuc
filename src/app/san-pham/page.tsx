import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Metadata } from 'next'
import ProductCard from '@/components/ProductCard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Bộ Sưu Tập Khung Tranh Thiên Phúc',
  description: 'Khám phá hàng trăm mẫu khung tranh gỗ tự nhiên, khung nhựa composite đa dạng mẫu mã và phong cách.',
}

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const selectedCategory = searchParams.category

  const products = await prisma.product.findMany({
    where: selectedCategory ? { category: selectedCategory } : {},
    orderBy: { createdAt: 'desc' }
  })

  // Get all unique categories for the filter
  const allProducts = await prisma.product.findMany({ select: { category: true } })
  const categories = Array.from(new Set(allProducts.map(p => p.category)))

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      {/* 1. Header Section */}
      <section className="bg-[#2c241b] text-white py-16 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">— BỘ SƯU TẬP 2026 —</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            Sản Phẩm <span className="text-accent italic font-light">Nổi Bật</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            Tất cả các mẫu khung tại Thiên Phúc đều được tuyển chọn kỹ lưỡng, đảm bảo tính thẩm mỹ và độ bền vượt trội theo thời gian.
          </p>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link 
              href="/san-pham" 
              className={`px-6 py-2 rounded-full border text-sm font-bold transition-all ${
                !selectedCategory ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-muted-foreground border-border hover:border-primary hover:text-primary'
              }`}
            >
              Tất Cả
            </Link>
            {categories.map(cat => (
              <Link 
                key={cat}
                href={`/san-pham?category=${encodeURIComponent(cat)}`} 
                className={`px-6 py-2 rounded-full border text-sm font-bold transition-all ${
                  selectedCategory === cat ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-muted-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                Chưa có sản phẩm nào trong danh mục này.
              </div>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

    </div>
  )
}
