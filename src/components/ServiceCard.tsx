import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import { Service } from '@prisma/client'
import Image from 'next/image'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // @ts-ignore
  const Icon = LucideIcons[service.iconName] || LucideIcons.Briefcase

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={service.image_url} 
          alt={service.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xs font-bold uppercase tracking-wider">{service.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 relative">
        {/* Icon floating */}
        <div className="absolute -top-8 left-6 w-16 h-16 bg-white rounded-2xl shadow-lg border border-border flex items-center justify-center text-primary transform group-hover:-rotate-6 transition-transform duration-300 z-10">
          <Icon size={32} />
        </div>

        <div className="mt-8 mb-4">
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-2">{service.category}</span>
          <h3 className="text-xl font-bold font-serif text-foreground group-hover:text-primary transition-colors leading-tight">
            {service.title}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
          {service.description}
        </p>

        <Link 
          href={`/dich-vu/${service.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-primary group/link"
        >
          Xem chi tiết 
          <span className="group-hover/link:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  )
}
