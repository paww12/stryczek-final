import { Shantell_Sans } from 'next/font/google'

const shantellSans = Shantell_Sans({
  variable: '--font-shantell-sans',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Słodka Pętelka',
  description: 'Słodka Pętelka - domowe ciasta i słodycze',
  url: 'https://slodkapetelka.pl',
  type: 'website',
  siteName: 'Słodka Pętelka',
  locale: 'pl_PL',
  keywords: ['ciasta', 'słodycze', 'domowe ciasta', 'domowe słodycze'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${shantellSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
