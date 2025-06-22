import Image from 'next/image'
import Link from 'next/link'
import OverlayX from '../../Components/OverlayX'
import BubbleText from '../../contact/components/BubbleText'
import BakingSVG from '../../Components/BakingSVG'


const AboutSection = async () => {


  return (
    <section className="pt-16 mb-24 pb-4  md:pb-12 rounded-lg shadow-lg bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
            <div className="max-w-lg mx-auto lg:mx-0">
              <OverlayX delay={0.2}>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {/* Lorem ipsum dolor sit amet. */}
                  <BubbleText text="Lorem ipsum dolor sit amet consectetur adipisicing." />
                </h2>
              </OverlayX>
              <OverlayX delay={0.3}>
                <p className="text-lg text-gray-600 mb-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, neque dolores cum
                  error illum inventore, unde deserunt nisi doloribus, quos suscipit quibusdam
                  temporibus ea ducimus minima architecto dicta quia atque?
                </p>
              </OverlayX>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <OverlayX delay={0.4} left={true}>
                    <div className="mr-4 text-amber-600 text-5xl"><BakingSVG className='w-32 aspect-auto' /></div>
                  </OverlayX>
                  <div>
                    <OverlayX delay={0.4}>
                      <h3 className="text-xl font-semibold text-gray-900">Filozofia Słodkości</h3>
                      <p className="text-gray-600 flex flex-col">
                        <span>· Tylko naturalne składniki</span>
                        <span>· Zero kompromisów</span>
                        <span>· Precyzja w każdym detalu</span>
                      </p>
                    </OverlayX>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-8">
                <OverlayX delay={0.5} left={true}>
                  <Link
                    href="/galery"
                    className="px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
                  >
                    Sprawdź nasze wypieki
                  </Link>
                </OverlayX>
                <OverlayX delay={0.5} left={false}>
                  <Link
                    href="/contact"
                    className="px-6 py-3 border-2  border-amber-600 text-amber-600 rounded-full hover:bg-amber-50 transition-colors"
                  >
                    Zadaj mi pytanie
                  </Link>
                </OverlayX>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-4">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src='/AboutMePhoto.jpg'
                alt='Image of the author'
                fill
                className="object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-300 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-amber-200 rounded-full blur-3xl opacity-30 " />
    </section>
  )
}

export default AboutSection