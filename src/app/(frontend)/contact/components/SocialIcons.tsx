import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { MdOutlineWeb } from 'react-icons/md'

const SocialIcons = () => {
  const icons = [
    {
      icon: <FaFacebook className="text-2xl" />,
      href: 'https://www.facebook.com/profile.php?id=61568993582578&locale=pl_PL',
    },
    {
      icon: <FaInstagram className="text-2xl" />,
      href: 'https://www.instagram.com/slodka_petelka/',
    },
    {
      icon: <MdOutlineWeb className="text-2xl" />,
      href: 'https://www.slodkapetelka.pl/',
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
            target="_blank"
            className="p-x-2 bg-gray-100 rounded-full hover:bg-blue-100
            transition-colors text-gray-600 hover:text-blue-600"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  )
}

export default SocialIcons
