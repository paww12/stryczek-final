import Link from 'next/link'
export default function NewsPage() {
  return (
    <div className=" p-2 rounded-2xl flex justify-center items-center cursor-pointer shadow-md h-fit opacity-90 mx-auto w-fit bg-gradient-to-b from-slate-200 to-gray-200">
      <Link href="/news">
        <h1 className="text-4xl p-4 font-bold">Wszystkie aktualności</h1>
      </Link>
    </div>
  )
}
