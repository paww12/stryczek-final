import { getPayload } from 'payload'
// import config from '@/payload.config'
import PaginationControls from './PaginationControls'
import NewsCard, { NewsData } from './NewsCard'
import configPromise from '@payload-config'


export default async function NewsList({ currentPage }: { currentPage: number }) {
  // const payloadConfig = await config
  // const payload = await getPayload({ config: payloadConfig })
  const payload = await getPayload({ config: configPromise })

  const news = await payload.find({
    collection: 'news',
    limit: 3,
    page: currentPage,
  })

  const newsItems = news.docs as NewsData[]

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
