import React from 'react'
import GalleryClient from './GalleryClient'
import GalleryMainPage from './GalleryMainPage'
import PopupSection from '../Sections/popupSection/PopupSection'

const page = () => {
  return (
    <>
      <GalleryClient />
      <GalleryMainPage />
      <PopupSection />
    </>
  )
}

export default page
