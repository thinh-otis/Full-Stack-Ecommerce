import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { useSelector } from 'react-redux'

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)
    const user = useSelector(state => state?.user?.user)

    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e, id)=>{
        await addToCart(e, id, user)
        fetchUserAddToCart()
    }

    const fetchData = useCallback(async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        // console.log("horizontal data", categoryProduct.data)
        setData(categoryProduct?.data)

    },[category])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const scrollRight =()=>{
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft =()=>{
        scrollElement.current.scrollLeft -= 300
    }
    return (
        <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
                <button className='text-green-400 hover:scale-125 transition-all shadow-md rounded-full p-1 bg-opacity-10 hover:bg-red-400 hover:text-red-200 absolute left-0 hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
                <button className='text-green-400 hover:scale-125 transition-all shadow-md rounded-full p-1 bg-opacity-10 hover:bg-red-400 hover:text-red-200 absolute right-0 hidden md:block' onClick={scrollRight}><FaAngleRight /></button>

                {/* Load ảo */}
                {   loading ? (
                     loadingList.map((product, index) => {
                        return (
                            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                    {/* <img src={product.productImage[0]} alt="" className='object-scale-down h-full hover:scale-110 transition-all' /> */}
                                </div>
                                <div translate='no' className='p-4 grid w-full gap-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'>.</h2>
                                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'>.</p>
                                    <div className='flex gap-3 w-full'>
                                        <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                        <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    </div>
                                    <button className='text-sm text-white py-0.5 px-2 rounded-full w-full bg-slate-200 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product, index) => {
                        return (
                            <Link to={"product/"+product?._id} key={product._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm flex shadow-md hover:shadow-custom transition-shadow duration-200'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                    <img src={product.productImage[0]} alt="" className='object-scale-down h-full hover:scale-110 transition-all' />
                                </div>
                                <div translate='no' className='p-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex flex-col'>
                                        <p className='text-slate-500 line-through'><strong className='text-slate-900'>Giá:</strong> {displayINRCurrency(product?.price)}</p>
                                        <p className='text-red-600 font-medium pb-1'><strong className='text-blue-600'>Giá Bán:</strong> {displayINRCurrency(product?.sellingPrice)}</p>
                                    </div>
                                    <button className='text-sm border-2 border-red-600 text-green-600 hover:bg-red-600 hover:text-white hover:scale-110 transition-all md:mx-2 :mx-4 py-0.5 px-2 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Thêm vào Giỏ</button>
                                </div>
                            </Link>
                        )
                    })
                )
                    
                }
            </div>

        </div>
    )
}

export default HorizontalCardProduct
