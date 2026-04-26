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
  metadataBase: new URL('https://khungtranhthienphuc.vn'),
  title: {
    template: '%s | Khung Tranh Thiên Phúc',
    default: 'Khung Tranh Thiên Phúc | Nghệ Thuật Khung Tranh Cao Cấp',
  },
  description: "Xưởng đóng khung tranh Thiên Phúc chuyên gia công khung gỗ sồi, khung composite, đóng tranh thêu, tranh đính đá giá rẻ, uy tín nhất TP.HCM. Gia công nhanh 24h.",
  authors: [{ name: 'Thiên Phúc' }],
  keywords: ['khung tranh', 'đóng khung tranh', 'khung tranh gỗ', 'khung composite', 'khung tranh hồ chí minh', 'xưởng khung tranh'],
  robots: 'index, follow',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://khungtranhthienphuc.vn',
    siteName: 'Khung Tranh Thiên Phúc',
    title: 'Khung Tranh Thiên Phúc | Nghệ Thuật Khung Tranh Cao Cấp',
    description: 'Chuyên gia công khung tranh gỗ tự nhiên và composite cao cấp tại HCM. Thiết kế miễn phí, gia công nhanh.',
    images: [
      {
        url: '/og-image.jpg', // Cần thêm file này vào folder public sau
        width: 1200,
        height: 630,
        alt: 'Khung Tranh Thiên Phúc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khung Tranh Thiên Phúc',
    description: 'Xưởng đóng khung tranh uy tín nhất TP.HCM',
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
