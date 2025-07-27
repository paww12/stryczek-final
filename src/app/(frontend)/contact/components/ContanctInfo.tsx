import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'
import SocialIcons from './SocialIcons'

const ContactInfo = () => {
  const items = [
    {
      icon: <FiMapPin className="text-2xl" />,
      title: 'Słodka Pętelka',
      content: 'ul. Mąkołowska 150, 43-100 Tychy',
      href: `https://www.google.com/maps/search/Słodka+Pętelka`,
      target: '_blank', 
    },
    {
      icon: <FiPhone className="text-2xl" />,
      title: 'Telefon',
      content: '+48 789 741 964',
      href: 'tel:+48789741964', 
    },
    {
      icon: <FiMail className="text-2xl" />,
      title: 'Email',
      content: 'zamowienia@slodkapetelka.pl',
      href: 'mailto:zamowienia@slodkapetelka.pl',
    },
  ]

  return (
    <div className="space-y-8 bg-white p-8 rounded-2xl shadow-lg w-full h-fit">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-4 flex-col sm:flex-row">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600">{item.icon}</div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

            {item.href ? (
              <a
                href={item.href}
                target={item.target || '_self'} 
                rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="text-gray-600 break-all transition-colors duration-300 hover:text-blue-600"
              >
                {item.content}
              </a>
            ) : (
              <p className="text-gray-600 break-all">{item.content}</p>
            )}
          </div>
        </div>
      ))}
      <SocialIcons />
    </div>
  )
}

export default ContactInfo