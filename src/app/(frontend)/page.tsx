// import { headers as getHeaders } from 'next/headers.js'
// import { getPayload } from 'payload'
// import config from '@/payload.config'

import './styles.css'
import Hero from './Sections/HeroSection/Hero'
import React from 'react'

export default async function HomePage() {
  // const headers = await getHeaders()
  // const payloadConfig = await config
  // const payload = await getPayload({ config: payloadConfig })
  // const { user } = await payload.auth({ headers })

  return (
    <>
      <Hero />
      <div className="h-screen"></div>
    </>
  )
}
