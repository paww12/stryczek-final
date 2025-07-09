'use client'

import Link from 'next/link'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";


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

  // Funkcja do budowania URL z parametrami
  const buildUrl = (page: number) => {
    const params = new URLSearchParams()

    if (category && category !== 'all') {
      params.set('category', category)
    }

    if (search && search.trim()) {
      params.set('search', search.trim())
    }

    if (page > 1) {
      params.set('page', page.toString())
    }

    const queryString = params.toString()
    return `/offer${queryString ? `?${queryString}` : ''}`
  }

  // Generowanie numerów stron do wyświetlenia
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Jeśli mało stron, pokaż wszystkie
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Logika dla większej liczby stron
      const startPage = Math.max(1, currentPage - 2)
      const endPage = Math.min(totalPages, currentPage + 2)

      if (startPage > 1) {
        pages.push(1)
        if (startPage > 2) {
          pages.push('...')
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...')
        }
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Przycisk poprzednia strona */}
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 
                     bg-white border border-gray-300 rounded-lg hover:bg-gray-50 
                     hover:text-gray-700 transition-colors"
        >
          <FaLongArrowAltLeft className="h-4 w-4 mr-1" />
          Poprzednia
        </Link>
      )}

      {/* Numery stron */}
      <div className="flex space-x-1">
        {pageNumbers.map((pageNumber, index) => {
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
          const isCurrentPage = page === currentPage

          return (
            <Link
              key={page}
              href={buildUrl(page)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isCurrentPage
                ? 'bg-amber-500 text-white'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
            >
              {page}
            </Link>
          )
        })}
      </div>

      {/* Przycisk następna strona */}
      {currentPage < totalPages && (
        <Link
          href={buildUrl(currentPage + 1)}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 
                     bg-white border border-gray-300 rounded-lg hover:bg-gray-50 
                     hover:text-gray-700 transition-colors"
        >
          Następna
          <FaLongArrowAltRight className="h-4 w-4 ml-1" />
        </Link>
      )}

      {/* Informacja o stronach */}
      <div className="hidden sm:flex items-center space-x-2 ml-4">
        <span className="text-sm text-gray-700">
          Strona {currentPage} z {totalPages}
        </span>
      </div>
    </div>
  )
}

export default PaginationControls