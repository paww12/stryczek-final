import './styles.css'
import Hero from './Sections/HeroSection/Hero'
import React from 'react'
import News from './Sections/NewsSection/News'
import PopupSection from './Sections/popupSection/PopupSection'
import HomeGallerySection from './Sections/GallerySection/HomeGallerySection'
import AboutSection from './Sections/AboutSection/AboutSection'
import OpinionsSection from './Sections/OpinionsSection/OpinionsSection'

export default async function HomePage() {
  return (
    <>
      <Hero />
      <News />
      <HomeGallerySection />

      <div className="h-24"></div>
      <PopupSection />
      <AboutSection />
      <OpinionsSection />
    </>
  )
}
