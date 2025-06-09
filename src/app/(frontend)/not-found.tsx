import SVG from './SVG'
import Link from 'next/link'
import './styles.css'

export const metadata = {
  title: 'Strona nie znaleziona - Słodka Pętelka',
  description: 'Szukana strona nie istnieje',
}

const NotFound = () => {
  return (
        <div className="container relative mx-auto flex flex-col h-screen items-center justify-center text-center">
          <SVG />
          <h1 className="text-2xl mx-2 animate-fade-in opacity-0">
            takiego cuda to jeszcze nie napisałem panie Ferdku
          </h1>
          <Link
            href="/"
            className="mt-8 bg-slate-200 rounded-xl shadow-md text-4xl p-5 px-8 animate-fade-in-delay opacity-0"
          >
            Strona główna
          </Link>
        </div>
  )
}

export default NotFound