import React from 'react'
import GalleryClient from './GalleryClient'
import GalleryMainPage from './GalleryMainPage'
import PopupSection from '../Sections/popupSection/PopupSection'

export const metadata = {
  title: "Galeria naszych wypieków",
  description: "Zobacz nasze pyszne ciasta, torty i desery w galerii. Inspiruj się naszymi słodkimi dziełami sztuki cukierniczej.",
};

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
