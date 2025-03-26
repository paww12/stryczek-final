import ContactForm from './components/ContactForm'
import ContactInfo from './components/ContanctInfo'
import ContactMap from './components/ContastMap'
import PageHeader from './components/PageHeader'

const ContactPage = () => {
  return (
    <div className="min-h-screen  mt-32 mb-16 rounded-lg shadow-xl bg-gray-50 w-full">
      <div className="container mx-auto px-4 py-16 w-full">
        <PageHeader
          title="Skontaktuj się z nami"
          description="Masz pytania lub chcesz złożyć zamówienie? Jesteśmy do Twojej dyspozycji!"
        />

        <div className="grid lg:grid-cols-2 gap-12 mb-16 w-full">
          <ContactInfo />
          <ContactForm />
        </div>

        <ContactMap />
      </div>
    </div>
  )
}

export default ContactPage
