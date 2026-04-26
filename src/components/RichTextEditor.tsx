'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div className="h-40 bg-muted animate-pulse rounded-md">Đang tải trình soạn thảo...</div>
})

interface EditorProps {
  name: string
  defaultValue?: string
}

export default function RichTextEditor({ name, defaultValue = '' }: EditorProps) {
  const [value, setValue] = useState(defaultValue)

  // Sync value to a hidden input so the form can submit it
  return (
    <div className="bg-white">
      <input type="hidden" name={name} value={value} />
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={setValue}
        className="h-64 mb-12"
        modules={{
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'clean']
          ],
        }}
      />
    </div>
  )
}
