import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { Product } from '@/payload-types'
import SVG from '../../SVG'
import Image from 'next/image'

interface PageParams {
  cake: string
}

const page = async ({ params }: { params: PageParams }) => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const cakeName = decodeURIComponent(params.cake)

  const cakeResult = await payload.find({
    collection: 'product',
    where: {
      title: { equals: cakeName },
    },
  })

  if (cakeResult.docs.length === 0) {
    return (
      <div className="mt-32 h-[calc(100dvh-2rem)] rounded-lg flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative">
            <div className="absolute -inset-4">
              <div className="w-full h-full rotate-45 bg-indigo-50 blur-[30px] opacity-40"></div>
            </div>
            <div className="my-12">
              <SVG />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-gray-900">Strona nie znaleziona</h1>
            <p className="text-gray-600">Przepraszamy, nie możemy znaleźć tej strony.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Kontakt
            </Link>
            <Link
              href="/"
              className="px-6 py-3 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Strona główna
            </Link>
          </div>

          <div className="mt-8 text-gray-400">
            <p className="text-sm">Szukasz wyjątkowego ciasta? 🍰</p>
          </div>
        </div>
      </div>
    )
  }

  const cake = cakeResult.docs[0]
  console.log(cake)
  return (
    <section className="container bg-white rounded-lg mx-auto px-4 py-8 mt-32">
      <div className="max-w-6xl mx-auto">
        <nav aria-label="Nawigacja " className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-indigo-600 transition-colors">
                Strona główna
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/offer" className="hover:text-indigo-600 transition-colors">
                Oferta
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-900">{cakeName}</li>
          </ol>
        </nav>

        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
            <Image src={cake.image.url} fill className="object-cover" alt={cake.image.alt} />
          </div>

          <article className="space-y-6">
            <header>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{cake.title}</h1>
              <p className="text-lg text-gray-600">{cake.description}</p>
            </header>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {cake.prices && (
                  <div className="bg-indigo-50 px-4 py-2 rounded-lg flex flex-col gap-4">
                    <span className="text-2xl font-bold text-indigo-700">
                      {cake.prices.full && <span> Cała porcja: {cake.prices.full} zł</span>}
                    </span>
                    <span className="text-2xl font-bold text-indigo-700">
                      {cake.prices.half && <span> Pół porcji: {cake.prices.half} zł</span>}
                    </span>
                  </div>
                )}
              </div>
              {cake.allergens?.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-700 mb-2">Zawiera alergeny:</h3>
                  <ul className="flex flex-wrap gap-2">
                    {cake.allergens.map((allergen) => (
                      <li
                        key={allergen.id}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                      >
                        {allergen.allergen}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="">
              {cake.category && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Kategoria</h3>
                  <p className="text-gray-900 font-medium">{cake.category}</p>
                </div>
              )}
            </div>
          </article>
        </section>
      </div>
    </section>
  )
}

export default page
