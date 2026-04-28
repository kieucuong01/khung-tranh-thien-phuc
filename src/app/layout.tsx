import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin", "vietnamese"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL('https://ketoanthienphuc.vn'),
  title: {
    template: '%s | Kế Toán & Kiểm Toán Thiên Phúc',
    default: 'Kế Toán Thiên Phúc | Dịch Vụ Kế Toán, Kiểm Toán & Thuế Chuyên Nghiệp',
  },
  description: "Dịch vụ kế toán, kiểm toán và tư vấn thuế uy tín tại TP.HCM. Chuyên nghiệp, bảo mật và tận tâm. Hỗ trợ doanh nghiệp tối ưu chi phí và minh bạch tài chính.",
  authors: [{ name: 'Thiên Phúc' }],
  keywords: ['kế toán', 'kiểm toán', 'dịch vụ kế toán', 'tư vấn thuế', 'thành lập doanh nghiệp', 'báo cáo tài chính'],
  robots: 'index, follow',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://ketoanthienphuc.vn',
    siteName: 'Kế Toán Thiên Phúc',
    title: 'Kế Toán Thiên Phúc | Dịch Vụ Kế Toán & Thuế Chuyên Nghiệp',
    description: 'Chuyên cung cấp dịch vụ kế toán, kiểm toán cao cấp tại HCM. Giải pháp tài chính toàn diện cho doanh nghiệp.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kế Toán Thiên Phúc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kế Toán Thiên Phúc',
    description: 'Dịch vụ kế toán & kiểm toán uy tín nhất TP.HCM',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col font-sans`}>
        <NextTopLoader 
          color="#d4a373"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #d4a373,0 0 5px #d4a373"
        />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <FloatingContact />
        <Footer />
      </body>
    </html>
  );
}
