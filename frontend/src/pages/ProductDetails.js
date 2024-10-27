import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop'
import { useSelector } from 'react-redux';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })

  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")
  const user = useSelector(state => state?.user?.user)

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })
  const [zoomImage, setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)

  const navigate = useNavigate()

  // console.log("product id", params)

  const fetchProductDetails = useCallback(async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    setLoading(false)
    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  },[params])

  // console.log("data", data)

  useEffect(() => {
    fetchProductDetails()
    scrollTop()
  }, [fetchProductDetails])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    // console.log("coordinate", left, top, width, height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
    
  }, [])

  const handleLeaveImageZoom =()=>{
    setZoomImage(false)
  }

  const handleAddToCart = async(e, id)=>{
      await addToCart(e, id, user)
      fetchUserAddToCart()
  }

  const handleBuyProduct = async(e, id)=>{
    await addToCart(e, id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:w-96 lg:h-96 bg-slate-200 relative p-2'>
            <img src={activeImage} alt="" className='w-full h-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

            {/* phóng to ảnh */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                  <div
                    className='w-full h-full min-w-[500px] min-h-[400px] mix-blend-multiply scale-150'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                    }}
                  >

                  </div>
                </div>
              )
            }

          </div>

          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((el, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>

                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imgURL, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded p-1 shadow-md hover:shadow-custom transition-shadow duration-200' key={imgURL}>
                          <img src={imgURL} alt="" className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/* product details */}

        {/* phần load ảo */}
        {
          loading ? (
            <div translate='no' className='grid gap-1 w-full'>
              <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
              <h2 className='text-2xl lg:text-4xl font-medium h6 lg:h-8 bg-slate-200 animate-pulse w-full'>.</h2>
              <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full'></p>

              <div className='text-amber-500 bg-slate-200 animate-pulse h-6 lg:h-8 flex items-center gap-1 w-full'>

              </div>

              <div className='flex flex-col lg:text-3xl font-medium text-left my-1 h-6 lg:h-8 animate-pulse w-full'>
                <p className='text-slate-400 text-xl line-through bg-slate-200 w-full'></p>
                <p className='text-gray-950 text-2xl bg-slate-200 w-full'><p className='-mt-8 ml-28 text-red-600 bg-slate-200 w-full'></p></p>
              </div>

              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='bg-slate-200 h-6 lg:h-8 rounded animate-pulse w-full'></button>
                <button className='bg-slate-200 h-6 lg:h-8 rounded animate-pulse w-full'></button>
              </div>

              <div className=' w-full'>
                <p className='text-slate-600 font-medium my-1 bg-slate-200 h-6 lg:h-8 rounded animate-pulse w-full'></p>
                <p className='bg-slate-200 h-10 lg:h-12 rounded animate-pulse w-full'></p>
              </div>
            </div>

          ) : (

            <div translate='no' className='flex flex-col gap-1 '>
              <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>

              <div className='text-amber-500 flex items-center gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className='flex flex-col lg:text-3xl font-medium text-left my-1'>
                <p className='text-slate-400 text-xl line-through'><strong className='text-slate-900'>Giá:</strong> {displayINRCurrency(data.price)} </p>
                <p className='text-gray-950 text-2xl'> <strong className='text-blue-600'>Giá Bán:</strong> <p className='-mt-8 ml-28 text-red-600'>{displayINRCurrency(data.sellingPrice)}</p></p>
              </div>

              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-green-400 hover:bg-red-600 hover:text-white hover:scale-110 transition-all' onClick={(e)=>handleBuyProduct(e,data?._id)}>Mua ngay</button>
                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium bg-red-600 text-green-400 hover:bg-white hover:text-red-500 hover:scale-110 transition-all' onClick={(e)=>handleAddToCart(e,data?._id)}>Giỏ hàng</button>
              </div>

              <div>
                <p className='text-slate-600 font-medium my-1'>Mô tả :</p>
                <p className=''>{data?.description}</p>
              </div>
            </div>
          )
        }
      </div>

        {
          data.category &&(
              <CategoryWiseProductDisplay category={data?.category} heading={"Sản phẩm cùng loại"}/>
          )
        }
      
    </div>
  )
}

export default ProductDetails
