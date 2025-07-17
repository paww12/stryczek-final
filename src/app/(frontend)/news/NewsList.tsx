import { getPayload } from 'payload'
import PaginationControls from './PaginationControls'
import NewsCard from './NewsCard'
import configPromise from '@payload-config'
import { News } from '@/payload-types'


export default async function NewsList({ currentPage }: { currentPage: number }) {
  const payload = await getPayload({ config: configPromise })

  const news = await payload.find({
    collection: 'news',
    limit: 3,
    page: currentPage,
  })

  const newsItems = news.docs as News[]

  return (
    <>
      {newsItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-xl">Brak aktualności do wyświetlenia</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 mb-12">
            {newsItems.map((newsItem) => (
              <NewsCard key={newsItem.id} data={newsItem} />
            ))}
          </div>

          <PaginationControls currentPage={currentPage} totalPages={news.totalPages} />
        </>
      )}
    </>
  )
}
