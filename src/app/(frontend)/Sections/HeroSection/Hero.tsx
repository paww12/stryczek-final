import HeroImage from './HeroImage'
import Loop from './Loop'
import Text from './Text'

// import Text from "./Text";

const Hero = () => {
  return (
    <section className="w-full relative container mb-4 mx-auto h-screen max-h-[1000px]">
      <div className="top-[20%] left-4 text-black absolute max-w-fit h-fit z-10 p-2">
        <h1
          className="flex bg-white bg-opacity-75 backdrop-blur-[2px] flex-col sm:flex-row w-fit leading-normal py-4 px-8 rounded-md 
          tracking-wider opacity-0 text-5xl animate-fade-in md:text-6xl lg:text-7xl mb-36
          md:justify-center md:items-center md:p-12 md:leading-relaxed text-center relative"
        >
          <span>Słodka&nbsp;</span>
          <span>Pętelka</span>
          <Loop />
        </h1>
        <Text />
        <div className="hidden md:block mt-12 max-w-2xl opacity-0 bg-white bg-opacity-75 text-lg p-4 rounded-md animate-fade-in-delay-long">
          <span>
            Jesteśmy małą fimą Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit iste
            minus temporibus quasi asperiores praesentium possimus! Architecto ad vel ipsa accusamus
            asperiores sint sunt recusandae illo est omnis, neque praesentium!
          </span>
        </div>
      </div>
      <HeroImage />
    </section>
  )
}

export default Hero
