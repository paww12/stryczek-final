import React from 'react'
import './styles.css'
import ReactLenis from './lib/ReactLenis'
import { Shantell_Sans } from 'next/font/google'
import Footer from './footer/Footer'
import Navbar from './navbar/Navbar'

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

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pl">
      <body className={`${shantellSans.variable} antialiased`}>
        <Navbar />
        <main>
          <div className="container mx-auto min-h-screen">{children}</div>
          <Footer />
        </main>
        <ReactLenis />
      </body>
    </html>
  )
}
