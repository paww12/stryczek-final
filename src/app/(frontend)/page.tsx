import './styles.css'
import Hero from './Sections/HeroSection/Hero'
import React from 'react'
import News from './Sections/NewsSection/News'
import PopupSection from './Sections/popupSection/PopupSection'
// import HomeGallerySection from './Sections/GallerySection/HomeGallerySection'
import AboutSection from './Sections/AboutSection/AboutSection'
import OpinionsSection from './Sections/OpinionsSection/OpinionsSection'
import CombinedSection from './Sections/combinedSection/CombinedSection'

export default async function HomePage() {
  return (
    <>
      <Hero />
      <News />
      <AboutSection />
      <CombinedSection />
      <OpinionsSection />
      <PopupSection />
    </>
  )
}
