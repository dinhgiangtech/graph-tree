import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cinzel, Merriweather } from "next/font/google";
import "./globals.css";
import HeaderNav from "@/components/HeaderNav";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Gia Phả Số | Nền Tảng Phả Hệ Dòng Tộc Thông Minh",
  description: "Ứng dụng quản lý, lưu trữ và trực quan hóa sơ đồ phả hệ gia đình, dòng tộc truyền thống Việt Nam.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${beVietnamPro.variable} ${cinzel.variable} ${merriweather.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('gia_pha_theme');
                if (saved === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FAF7F0] dark:bg-[#1C1917] text-[#292524] dark:text-[#F5EFEB] selection:bg-[#8B1E1E]/20 selection:text-[#8B1E1E]">
        <HeaderNav />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}

