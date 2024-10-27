import React, { useCallback, useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import image1 from '../assest/banner/img1.jpg'
import image2 from '../assest/banner/img2.png'
import image3 from '../assest/banner/img3.png'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.jpg'
import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpeg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.jpg'

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const desktopImages = [
    image1,
    image2,
    image3,
    image4,
    image5
  ]
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile
  ]

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % desktopImages.length);
  }, [desktopImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + desktopImages.length) % desktopImages.length);
  }, [desktopImages.length]);

  // Slide cho banner
  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);
  
  return (
    <div className='container mx-auto px-4 rounded '>
      <div className='h-56 md:h-72 w-full bg-slate-200 relative'>

        <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
              <div className='flex justify-between w-full text-2xl'>
                  <button onClick={prevImage} className='text-green-400 hover:scale-125 transition-all shadow-md rounded-full p-1 bg-opacity-7 hover:bg-red-400 hover:text-white'><FaAngleLeft /></button>
                  <button onClick={nextImage} className='text-green-400 hover:scale-125 transition-all shadow-md rounded-full p-1 bg-opacity-7 hover:bg-red-400 hover:text-white'><FaAngleRight /></button>
              </div>
        </div>

        {/* desktop and tablet version */}
        <div className='hidden md:flex w-full h-full overflow-hidden'>
          {
            desktopImages.map((imageUrl, index) => {
              return (
                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                  <img src={imageUrl} alt="" className='w-full h-full' />
                </div>
              )
            })
          }
        </div>

        {/* mobile version */}
        <div className='flex w-full h-full overflow-hidden md:hidden'>
          {
            mobileImages.map((imageUrl, index) => {
              return (
                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                  <img src={imageUrl} alt="" className='w-full h-full object-cover' />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default BannerProduct
