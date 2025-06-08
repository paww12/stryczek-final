import { Shantell_Sans } from 'next/font/google'

const shantellSans = Shantell_Sans({
  variable: '--font-shantell-sans',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Słodka Pętelka',
  description: 'Słodka Pętelka - domowe ciasta i słodycze',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={`${shantellSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}