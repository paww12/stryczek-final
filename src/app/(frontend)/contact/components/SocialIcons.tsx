import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { MdOutlineWeb } from 'react-icons/md'

const SocialIcons = () => {
  const icons = [
    {
      icon: <FaFacebook className="text-2xl" />,
      href: 'https://www.facebook.com/profile.php?id=61568993582578&locale=pl_PL',
      name: 'Facebook',
    },
    {
      icon: <FaInstagram className="text-2xl" />,
      href: 'https://www.instagram.com/slodka_petelka/',
      name: 'Instagram',
    },
    {
      icon: <MdOutlineWeb className="text-2xl" />,
      href: 'https://www.slodkapetelka.pl/',
      name: 'Strona internetowa',
    },
  ]

  return (
    <div className="pt-6 border-t border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Obserwuj nas</h3>
      <div className="flex gap-x-4">
        {icons.map((item, index) => (
          <a
            key={index}
            href={item.href}
            data-name={item.name}
            aria-label={item.name}
            // rel="noopener noreferrer"
            rel="external noopener noreferrer" 
            target="_blank"
            className="p-x-2 bg-gray-100 rounded-full hover:bg-blue-100
            transition-colors text-gray-600 hover:text-blue-600
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {item.icon}
            <span className="sr-only">{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default SocialIcons
