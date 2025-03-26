'use client'
import { SendMail } from '@/actions/actions'
import { useActionState, useState, startTransition } from 'react'

const ContactForm = () => {
  const [state, action, isPending] = useActionState(SendMail, null)
  const [errors, setErrors] = useState<{
    email?: string
    subject?: string
    message?: string
  }>({})

  const validateForm = (formData: FormData) => {
    const newErrors: typeof errors = {}
    const email = formData.get('adresee') as string
    const subject = formData.get('subject') as string
    const message = formData.get('text') as string

    if (!email) {
      newErrors.email = 'Adres email jest wymagany'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Nieprawidłowy format adresu email'
    }

    if (!subject) {
      newErrors.subject = 'Temat jest wymagany'
    }

    if (!message) {
      newErrors.message = 'Wiadomość jest wymagana'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (validateForm(formData)) {
      startTransition(() => {
        action(formData)
      })
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6 w-full">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 my-2">Adres email</label>
          <input
            type="email"
            id="adresee"
            name="adresee"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={() => setErrors((prev) => ({ ...prev, email: undefined }))}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-gray-700 my-2">Temat</label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={() => setErrors((prev) => ({ ...prev, subject: undefined }))}
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>

        <div>
          <label className="block text-gray-700 my-2">Wiadomość</label>
          <textarea
            rows={6}
            id="text"
            name="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={() => setErrors((prev) => ({ ...prev, message: undefined }))}
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isPending ? 'Wysyłanie...' : 'Wyślij wiadomość'}
        </button>
      </form>

      {state && !isPending && (
        <p
          className={`mt-4 p-3 rounded-lg ${
            state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {(state as { message: string }).message}
        </p>
      )}
    </div>
  )
}

export default ContactForm
