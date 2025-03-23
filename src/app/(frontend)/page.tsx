import './styles.css'
import Hero from './Sections/HeroSection/Hero'
import React from 'react'
import News from './Sections/NewsSection/News'
import PopupSection from './popupSection/PopupSection'

export default async function HomePage() {
  return (
    <>
      <Hero />
      <News />
      <div className="h-screen"></div>
      <PopupSection />
    </>
  )
}
