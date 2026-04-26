import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  async function handleLogin(formData: FormData) {
    'use server'
    const password = formData.get('password')
    
    // Mật khẩu mặc định: thienphuc2026
    if (password === 'thienphuc2026') {
      cookies().set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 tuần
        path: '/',
      })
      redirect('/admin')
    } else {
      redirect('/login?error=1')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-border w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-serif">TP</div>
          <h1 className="text-2xl font-bold font-serif text-foreground">Đăng Nhập Quản Trị</h1>
          <p className="text-muted-foreground text-sm">Vui lòng nhập mật khẩu để tiếp tục</p>
        </div>

        <form action={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Mật khẩu</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="Nhập mật khẩu..."
              autoFocus
            />
          </div>
          
          {searchParams.error && (
            <p className="text-red-500 text-xs font-bold text-center">Mật khẩu không chính xác!</p>
          )}

          <button 
            type="submit" 
            className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
          >
            Đăng Nhập
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">Mật khẩu mặc định: <code className="bg-muted px-1 rounded">thienphuc2026</code></p>
        </div>
      </div>
    </div>
  )
}
