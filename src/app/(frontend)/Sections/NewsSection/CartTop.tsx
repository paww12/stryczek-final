import React from 'react'
import Logo from '../../navbar/Logo'

const CartTop = ({ data }: { data: string }) => {
  function getMonth(month: string) {
    switch (month) {
      case '01':
        return 'Styczeń'
      case '02':
        return 'Luty'
      case '03':
        return 'Marzec'
      case '04':
        return 'Kwiecień'
      case '05':
        return 'Maj'
      case '06':
        return 'Czerwiec'
      case '07':
        return 'Lipiec'
      case '08':
        return 'Sierpień'
      case '09':
        return 'Wrzesień'
      case '10':
        return 'Październik'
      case '11':
        return 'Listopad'
      case '12':
        return 'Grudzień'
      default:
        return 'Błąd'
    }
  }
  function readableDate(date: string) {
    const day = date.slice(8, 10)
    const month = date.slice(5, 7)
    const year = date.slice(0, 4)
    return `${day} ${getMonth(month)} ${year}`
  }
  return (
    <header className=" items-center justify-between m-2 hidden md:flex">
      <div className="w-16 h-16 relative">
        <Logo />
      </div>
      <div className=" text-gray-500 flex flex-row text-lg items-center justify-start">
        <span className="text-end">{readableDate(data)}</span>
      </div>
    </header>
  )
}

export default CartTop
