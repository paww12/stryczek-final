'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BiSearch, BiX } from 'react-icons/bi'

interface SearchBarProps {
    initialValue?: string
    category?: string
    currentPage?: number
    placeholder?: string
}

const SearchBar = ({
    initialValue = '',
    category,
    placeholder = 'Szukaj produktów...'
}: SearchBarProps) => {
    const [searchValue, setSearchValue] = useState(initialValue)
    const router = useRouter()
    const searchParams = useSearchParams()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateUrl = (searchQuery: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (searchQuery.trim()) {
            params.set('search', searchQuery.trim())
        } else {
            params.delete('search')
        }

        if (category && category !== 'all') {
            params.set('category', category)
        }

        params.delete('page')

        const newUrl = `/offer?${params.toString()}`
        router.push(newUrl)
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchValue !== initialValue) {
                updateUrl(searchValue)
            }
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [searchValue, initialValue, updateUrl])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateUrl(searchValue)
    }

    const clearSearch = () => {
        setSearchValue('')
        updateUrl('')
    }

    useEffect(() => {
        setSearchValue(initialValue)
    }, [initialValue])

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
                <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-gray-400 text-gray-900"
                    aria-label="Pole wyszukiwania produktów"
                />

                {searchValue && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 
                       text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Wyczyść wyszukiwanie"
                    >
                        <BiX className="h-5 w-5" />
                    </button>
                )}
            </div>
        </form>
    )
}

export default SearchBar