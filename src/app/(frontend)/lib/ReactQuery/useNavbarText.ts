import { useQuery } from '@tanstack/react-query'
import type { NavbarText } from '@/payload-types' 

export const useNavbarTexts = () => 
  useQuery<NavbarText[], Error>({
    queryKey: ['navbar-texts'],
    queryFn: async () => {
      const res = await fetch('/api/navbar-text')
      const json = await res.json()
      return json.docs as NavbarText[]
    },
    placeholderData: [],
  })
