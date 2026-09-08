import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const vazir = Vazirmatn({ subsets: ["arabic"], variable: "--font-vazirmatn" });

export const metadata: Metadata = {
  title: "KARNET — Build. Invest. Grow.",
  description: "Venture studio & investment ecosystem.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${vazir.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}