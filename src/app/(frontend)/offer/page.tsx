import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Overlay from '../Components/Overlay'
import PaginationControls from './PaginationControls'
import SearchBar from './SearchBar'
import { Category, Product } from '@/payload-types'
import type { Where } from 'payload'


interface CategoryOption {
  label: string
  value: string
}

interface SearchParams {
  page?: string
  category?: string
  search?: string
}

interface OfferProps {
  searchParams: Promise<SearchParams>
}

interface PayloadResponse {
  docs: Product[]
  totalPages: number
}

export const metadata = {
  title: "Nasze Wypieki | Oferta Ciast i Deserów - Słodka Pętelka",
  description: "Świeże ciasta, pyszne desery i słodkie przekąski. Sprawdź naszą pełną ofertę, ceny i skontaktuj się z nami!",
}

export const ProductPlaceholder = ({ title }: { title: string }) => (
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
      {title}
      <br />
      <span className="text-sm text-amber-500">(brak zdjęcia)</span>
    </p>
  </div>
)

const ProductPricing = ({ prices }: { prices?: Product['prices'] }) => {
  if (!prices) return null

  return (
    <div className="flex justify-between items-start flex-col">
      {prices.full && (
        <span className="text-lg font-bold text-amber-500">
          Porcja {prices.full} zł
        </span>
      )}
      {prices.half && (
        <span className="text-lg font-bold text-amber-600">
          Pół porcji {prices.half} zł
        </span>
      )}
    </div>
  )
}

const ProductCard = ({ product }: { product: Product }) => {
  const imageUrl = typeof product.image === 'object' && product.image?.url
    ? product.image.url
    : null

  const getCategoryName = (category: number | Category): string => {
    if (typeof category === 'number') {
      return `Category ${category}`
    }
    return category.title
  }

  const firstCategory = product.category?.[0]
  const categoryName = firstCategory ? getCategoryName(firstCategory) : null

  return (
    <Link
      href={`/product/${product.title}`}
      className="hover:scale-[.98] transition-all shadow-md hover:shadow-xl"
    >
      <div className="bg-white rounded-xl overflow-hidden h-full transition-shadow">
        <div className="relative h-64">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.alt || product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <ProductPlaceholder title={product.title} />
          )}

          {categoryName && (
            <div className="absolute top-2 left-2">
              <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {categoryName}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          <ProductPricing prices={product.prices} />
        </div>
      </div>
    </Link>
  )
}

const CategoryFilters = ({
  categories,
  selectedCategory
}: {
  categories: CategoryOption[]
  selectedCategory?: string
}) => (
  <div className="flex flex-wrap gap-4 mb-8 justify-center">
    {categories.map((category) => {
      const isSelected = selectedCategory === category.value ||
        (category.label === 'Wszystkie' && !selectedCategory)

      return (
        <Link
          key={category.value}
          href={{
            pathname: '/offer',
            query: {
              ...(category.value !== 'all' ? { category: category.value } : {}),
              page: 1,
            },
          }}
          className={`px-4 py-2 rounded-lg transition-colors ${isSelected
            ? 'bg-amber-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
            }`}
        >
          {category.label}
        </Link>
      )
    })}
  </div>
)

export default async function Offer({ searchParams }: OfferProps) {
  const { page = '1', category, search } = await searchParams
  const currentPage = Number(page) || 1
  const selectedCategory = category
  const searchQuery = search

  const payload = await getPayload({ config: configPromise })

  const categoriesData = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  const categoryOptions: CategoryOption[] = [
    { label: 'Wszystkie', value: 'all' },
    ...categoriesData.docs.map((category: Category) => ({
      label: category.title,
      value: category.slug,
    })),
  ]

  const categoryData = selectedCategory && selectedCategory !== 'all'
    ? categoriesData.docs.find((cat: Category) => cat.slug === selectedCategory)
    : null


  const whereClause: Where = {}

  if (categoryData) {
    whereClause.category = {
      equals: categoryData.id
    }
  }

  if (searchQuery) {
    whereClause.or = [
      { title: { contains: searchQuery } },
      { description: { contains: searchQuery } },
    ]
  }

  const { docs: products, totalPages }: PayloadResponse = await payload.find({
    collection: 'product',
    limit: 6,
    page: currentPage,
    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    depth: 1,
  })

  return (
    <div className="bg-gray-50 py-12 mb-12 rounded-lg mt-32">
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
          <div className="mb-8 max-w-md mx-auto">
            <Suspense fallback={<div>Ładowanie wyszukiwarki...</div>}>
              <SearchBar
                initialValue={searchQuery}
                category={selectedCategory}
                currentPage={currentPage}
              />
            </Suspense>
          </div>
        </Overlay>

        <Overlay delay={1.25}>
          <CategoryFilters
            categories={categoryOptions}
            selectedCategory={selectedCategory}
          />
        </Overlay>

        <Overlay delay={1.5}>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Brak produktów
              </h2>
              <p className="text-gray-600">
                {searchQuery
                  ? `Nie znaleziono produktów dla zapytania "${searchQuery}"`
                  : 'Nie znaleziono produktów w tej kategorii'
                }
              </p>
            </div>
          )}
        </Overlay>

        {products.length > 0 && totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            category={selectedCategory}
            search={searchQuery}
          />
        )}
      </div>
    </div>
  )
}