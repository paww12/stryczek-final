export default function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
    </div>
  )
}
