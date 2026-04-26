'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 text-3xl">!</div>
      <h2 className="text-3xl font-bold font-serif mb-4">Đã có lỗi xảy ra!</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Rất tiếc, hệ thống gặp một sự cố nhỏ khi tải trang. Vui lòng thử lại hoặc liên hệ với chúng tôi nếu lỗi vẫn tiếp diễn.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:shadow-lg transition-all"
        >
          Thử lại
        </button>
        <Link 
          href="/"
          className="px-8 py-3 bg-white border border-border rounded-full font-bold hover:bg-secondary transition-all"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  )
}
