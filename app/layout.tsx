import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Alyaz",
  description: "Alyaz uygulamasının ana sayfası.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
