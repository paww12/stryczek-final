import { getPayload } from 'payload'
import configPromise from '@payload-config'

const Description = async () => {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.find({
    collection: 'hero-description',
    limit: 1,
  })
  const text = data.docs[0]?.text

  return (
    <div className="hidden md:block mt-4 max-w-2xl opacity-0 bg-white bg-opacity-75 text-lg p-4 rounded-md animate-fade-in-delay-long">
      <span>
        {text
          ? text
          : 'Jesteśmy małą fimą Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit iste minus temporibus quasi asperiores praesentium possimus! Architecto ad vel ipsa accusamus asperiores sint sunt recusandae illo est omnis, neque praesentium!'}
      </span>
    </div>
  )
}

export default Description
export const dynamic = 'force-dynamic'

export const revalidate = 0 