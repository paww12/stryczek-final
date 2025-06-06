import Image from 'next/image'
import Link from 'next/link'
import Overlay from '../Components/Overlay'
import { getPayload } from 'payload'
import PaginationControls from './PaginationControls'
import configPromise from '@payload-config'

export const metadata = {
title: "Nasze Wypieki | Oferta Ciast i Deserów - Słodka Pętelka",
  description: "Świeże ciasta, pyszne desery i słodkie przekąski. Sprawdź naszą pełną ofertę, ceny i skontaktuj się z nami!",
}

export default async function Offer({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>
}) {
  const { page = '1', category } = await searchParams
  const currentPage = Number(page)
  const selectedCategory = category

  const payload = await getPayload({ config: configPromise })

  const categoriesData = await payload.find({
    collection: 'product',
    limit: 100,
    select: {
      category: true,
    },
  })

  const allCategories = Array.from(
    new Set(categoriesData.docs.map((product) => product.category).filter(Boolean)),
  ) as string[]

  const categoriesWithAll = [
    ...allCategories.map((category) => ({ label: category })),
    { label: 'Wszystkie' },
  ]

  const whereClause: { category?: { equals: string } } =
    selectedCategory && selectedCategory !== 'Wszystkie'
      ? { category: { equals: selectedCategory } }
      : {}

  const { docs: products, totalPages } = await payload.find({
    collection: 'product',
    limit: 6,
    page: currentPage,
    where: whereClause,
  })
  return (
    <div className=" bg-gray-50 py-12 mb-12 rounded-lg mt-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Overlay delay={0.3}>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Nasze Wypieki</h1>
          </Overlay>
          <Overlay delay={0.5}>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Poznaj nasze słodkie specjały - każdy wykonany z pasją i najlepszych składników
            </p>
          </Overlay>
          <Overlay delay={0.75}>
            <Link
              href="/"
              className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Powrót do strony głównej
            </Link>
          </Overlay>
        </div>
        <Overlay delay={1}>
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {categoriesWithAll.map((category) => (
              <Link
                key={category.label}
                href={{
                  pathname: '/offer',
                  query: {
                    ...(category.label !== 'Wszystkie' ? { category: category.label } : {}),
                    page: 1,
                  },
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.label ||
                  (category.label === 'Wszystkie' && !selectedCategory)
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {category.label}
              </Link>
            ))}
          </div>
        </Overlay>
        <Overlay delay={1.25}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {products.map((product) => (
              <Link
                href={`/product/${encodeURIComponent(product.title)}`}
                key={product.id}
                className="hover:scale-[.98] transition-all shadow-md hover:shadow-xl"
              >
                <div className="bg-white rounded-xl overflow-hidden h-full transition-shadow">
                  <div className="relative h-64">
                    {typeof product.image === 'object' && product.image?.url ? (
                      <Image
                        src={product.image.url}
                        alt={product.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-amber-50 flex flex-col items-center justify-center p-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 text-amber-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 4l16 16"
                            className="text-amber-300"
                          />
                        </svg>
                        <p className="text-amber-600 text-center mt-2 font-medium">
                          {product.title}
                          <br />
                          <span className="text-sm text-amber-500">(brak zdjęcia)</span>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-start flex-col">
                      <span className="text-lg font-bold text-amber-600">
                        {product.prices?.half && `pół porcji ${product.prices?.half} zł`}
                      </span>
                      <span className="text-lg font-bold text-amber-500">
                        {product.prices?.full && `cała porcja ${product.prices?.full} zł`}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Overlay>
        {products.length === 0 && (
          <>
            <h1 className="text-center">Coś poszło nie tak...</h1>
          </>
        )}

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          category={selectedCategory}
        />
      </div>
    </div>
  )
}

// export default Offer
