'use client'

import { useState } from 'react'

export default function FrameCalculator() {
  const [width, setWidth] = useState<number>(40)
  const [height, setHeight] = useState<number>(60)
  const [material, setMaterial] = useState<'wood' | 'composite'>('composite')

  // Đơn giá tính theo cm dài
  const PRICE_PER_CM = {
    wood: 500, // 500đ/cm
    composite: 300 // 300đ/cm
  }

  // (Dài + Rộng) * 2 * Đơn giá
  const calculatePrice = () => {
    return (width + height) * 2 * PRICE_PER_CM[material]
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
  }

  return (
    <div className="bg-white dark:bg-secondary p-6 rounded-xl shadow-sm border border-border max-w-md w-full">
      <h3 className="text-xl font-bold mb-4 text-primary">Tính Giá Đóng Khung</h3>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Chiều rộng (cm)</label>
            <input 
              type="number" 
              value={width} 
              onChange={(e) => setWidth(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent"
              min="1"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Chiều dài (cm)</label>
            <input 
              type="number" 
              value={height} 
              onChange={(e) => setHeight(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent"
              min="1"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Chất liệu khung</label>
          <select 
            value={material} 
            onChange={(e) => setMaterial(e.target.value as 'wood' | 'composite')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent"
          >
            <option value="composite">Nhựa Composite (Hiện đại, Nhẹ)</option>
            <option value="wood">Gỗ Tự Nhiên (Sang trọng, Cổ điển)</option>
          </select>
        </div>

        <div className="pt-4 border-t mt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Ước tính:</span>
            <span className="text-primary text-2xl">{formatCurrency(calculatePrice())}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            * Giá trên chỉ mang tính chất tham khảo. Vui lòng liên hệ trực tiếp để có báo giá chính xác nhất.
          </p>
        </div>
      </div>
    </div>
  )
}
