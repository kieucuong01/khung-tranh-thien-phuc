import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@prisma/client'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/san-pham/${product.id}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50">
      <div className="aspect-[3/4] relative overflow-hidden bg-muted">
        <Image 
          src={product.image_url} 
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <span className="text-white text-xs font-bold uppercase tracking-wider">Xem chi tiết &rarr;</span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-1">{product.category}</span>
        <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-2">{product.title}</h3>
        <p className="text-primary font-bold mt-auto">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
        </p>
      </div>
    </Link>
  )
}
