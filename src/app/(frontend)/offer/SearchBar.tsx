'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BiSearch, BiX } from 'react-icons/bi'

interface SearchBarProps {
    initialValue?: string
    category?: string
    currentPage?: number
    placeholder?: string
    throttleMs?: number
}

// Hook do throttlingu
function useThrottle<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): T {
    const [throttledCallback, setThrottledCallback] = useState<T | null>(null)

    useEffect(() => {
        let timeoutId: NodeJS.Timeout

        const throttled = ((...args: Parameters<T>) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => callback(...args), delay)
        }) as T

        setThrottledCallback(() => throttled)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [callback, delay])

    return throttledCallback || callback
}

const SearchBar = ({
    initialValue = '',
    category,
    currentPage = 1,
    placeholder = 'Szukaj produktów...',
    throttleMs = 300
}: SearchBarProps) => {
    const [searchValue, setSearchValue] = useState(initialValue)
    const router = useRouter()
    const searchParams = useSearchParams()

    // Funkcja do aktualizacji URL
    const updateSearchParams = useCallback((searchQuery: string) => {

        const params = new URLSearchParams(searchParams.toString())

        if (searchQuery.trim()) {
            params.set('search', searchQuery.trim())
        } else {
            params.delete('search')
        }

        // Resetuj stronę na 1 przy nowym wyszukiwaniu
        params.set('page', '1')

        // Zachowaj kategorię jeśli jest wybrana
        if (category && category !== 'all') {
            params.set('category', category)
        }

        const newUrl = `/offer?${params.toString()}`
        router.push(newUrl)

        // Symulacja opóźnienia dla lepszego UX
    }, [category, router, searchParams])

    // Throttlowana funkcja wyszukiwania
    const throttledSearch = useThrottle(updateSearchParams, throttleMs)

    // Obsługa zmiany wartości input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchValue(value)
        throttledSearch(value)
    }

    // Czyszczenie wyszukiwania
    const clearSearch = () => {
        setSearchValue('')
        updateSearchParams('')
    }

    // Obsługa klawisza Enter
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            updateSearchParams(searchValue)
        }
    }

    return (
        <div className="relative">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BiSearch
                        className={`h-5 w-5 transition-colors'
                            }`}
                    />
                </div>

                <input
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ease-in-out placeholder-gray-400 text-gray-900"
                // disabled={isSearching}
                />

                {searchValue && (
                    <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center
                       text-gray-400 hover:text-gray-600 transition-colors"
                        type="button"
                        aria-label="Wyczyść wyszukiwanie"
                    >
                        <BiX className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Wskaźnik ładowania */}
            {/* {isSearching && (
                <div className="absolute top-full left-0 right-0 mt-1">
                    <div className="bg-white rounded-lg shadow-lg border p-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-amber-500 border-t-transparent"></div>
                            <span>Wyszukiwanie...</span>
                        </div>
                    </div>
                </div>
            )} */}

            {/* Podpowiedzi wyszukiwania */}
            {/* {searchValue && !isSearching && (
                <div className="absolute top-full left-0 right-0 mt-1 z-10">
                    <div className="bg-white rounded-lg shadow-lg border p-3">
                        <p className="text-sm text-gray-600">
                            Wyszukiwanie: <span className="font-medium">{searchValue}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Naciśnij Enter aby szukać natychmiast
                        </p>
                    </div>
                </div>
            )} */}
        </div>
    )
}

export default SearchBar