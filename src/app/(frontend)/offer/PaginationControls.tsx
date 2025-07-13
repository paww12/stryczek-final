'use client'

import Link from 'next/link'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  category?: string
  search?: string
}

const PaginationControls = ({
  currentPage,
  totalPages,
  category,
  search
}: PaginationControlsProps) => {
  if (totalPages <= 1) return null

  const buildUrl = (page: number) => {
    const params = new URLSearchParams()

    if (category && category !== 'all') {
      params.set('category', category)
    }

    if (search?.trim()) {
      params.set('search', search.trim())
    }

    if (page > 1) {
      params.set('page', page.toString())
    }

    const queryString = params.toString()
    return `/offer${queryString ? `?${queryString}` : ''}`
  }

  const getVisiblePages = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, currentPage + 2)

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push('...')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Previous button */}
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          <FaLongArrowAltLeft className="h-4 w-4 mr-1" />
          Poprzednia
        </Link>
      )}

      {/* Page numbers */}
      <div className="flex space-x-1">
        {visiblePages.map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-sm font-medium text-gray-500"
              >
                ...
              </span>
            )
          }

          const page = pageNumber as number
          const isActive = page === currentPage

          return (
            <Link
              key={page}
              href={buildUrl(page)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-amber-500 text-white' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'}`}
            >
              {page}
            </Link>
          )
        })}
      </div>

      {currentPage < totalPages && (
        <Link
          href={buildUrl(currentPage + 1)}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500  bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          Następna
          <FaLongArrowAltRight className="h-4 w-4 ml-1" />
        </Link>
      )}

      <div className="hidden sm:flex items-center space-x-2 ml-4">
        <span className="text-sm text-gray-700">
          Strona {currentPage} z {totalPages}
        </span>
      </div>
    </div>
  )
}

export default PaginationControls