export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Animated wood-themed spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-secondary rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-primary font-serif font-bold animate-pulse tracking-widest uppercase text-xs">
          Thiên Phúc đang tải...
        </p>
      </div>
    </div>
  )
}
