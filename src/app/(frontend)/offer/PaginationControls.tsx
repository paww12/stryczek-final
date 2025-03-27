import Link from 'next/link'
import { FC } from 'react'

interface Props {
  currentPage: number
  totalPages: number
  category?: string
}

const PaginationControls: FC<Props> = ({ currentPage, totalPages, category }) => {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={{
            pathname: '/offer',
            query: {
              page,
              ...(category ? { category } : {}),
            },
          }}
          className={`px-4 py-2 rounded ${
            currentPage === page ? 'bg-amber-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {page}
        </Link>
      ))}
    </div>
  )
}

export default PaginationControls
