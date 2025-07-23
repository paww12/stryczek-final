import Link from 'next/link'

export default function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  if (totalPages <= 1) return null

  const getPageRange = () => {
    const range = []
    const start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, currentPage + 2)

    for (let i = start; i <= end; i++) {
      range.push(i)
    }
    return range
  }

  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {currentPage > 1 && (
        <Link
          href={`/news?page=${currentPage - 1}`}
          className="px-2 md:px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          ←
        </Link>
      )}

      {getPageRange().map((page) => (
        <Link
          key={page}
          href={`/news?page=${page}`}
          className={`px-2 md:px-4 py-2 rounded-lg transition-colors ${
            currentPage === page
              ? 'bg-blue-600 text-white pointer-events-none'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`/news?page=${currentPage + 1}`}
          className="px-2 md:px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          →
        </Link>
      )}
    </div>
  )
}
