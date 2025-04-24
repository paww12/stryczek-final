import Link from 'next/link'
import { Suspense } from 'react'
import NewsList from './NewsList'
import PopupSection from '../Sections/popupSection/PopupSection'
export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page = '1' } = await searchParams
  const currentPage = Number(page)

  return (
    <>
      <main className="container mx-auto px-4 py-12 min-h-screen mt-32">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Aktualności</h1>
          <p className="text-gray-500">
            Tutaj znajdziesz nasze najnowsze kulinarne nowości, wydarzenia i wiele więcej.
          </p>
          <Link
            href="/"
            className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Powrót do strony głównej
          </Link>
        </div>

        <Suspense fallback={<div>Ładowanie aktualności...</div>}>
          <NewsList currentPage={currentPage} />
        </Suspense>
      </main>
      <PopupSection />
    </>
  )
}

// export default NewsPage
