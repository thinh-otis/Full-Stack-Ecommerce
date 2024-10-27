import React, { useCallback, useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'
import { useSelector } from 'react-redux'

const CategoryWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)
    const user = useSelector(state => state?.user?.user)

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

    return (
        <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-center md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
                
                {/* Loaad ảo */}
                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                        {/* <img src={product.productImage[0]} alt="" className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' /> */}
                                    </div>
                                    <div translate='no' className='p-4 grid gap-3'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'>.</h2>
                                        <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                        <div className='flex'>
                                            <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                            <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                        </div>
                                        <button className='text-sm text-white px-2 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })
                    ):(
                        data.map((product, index) => {
                            return (
                                <Link to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md hover:shadow-custom transition-shadow duration-200 mt-4' onClick={scrollTop}>
                                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                        <img src={product.productImage[0]} alt="" className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                    </div>
                                    <div translate='no' className='p-2 gap-3'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        
                                        <div className='flex justify-between items-center'>
                                            <p className='capitalize text-slate-500'>{product?.category}</p>
                                            <button className='text-sm border-2 border-red-600 text-green-400 hover:bg-red-600 hover:text-white hover:scale-110 transition-all mx-18 py-0.5 px-2 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Thêm vào Giỏ</button>
                                        </div>
                                        <div>
                                            <p className='text-slate-500 line-through'><strong className='text-slate-900'>Giá:</strong> {displayINRCurrency(product?.price)}</p>
                                            <p className='text-red-600 font-medium'><strong className='text-blue-600'>Giá Bán:</strong> {displayINRCurrency(product?.sellingPrice)}</p>
                                        </div>
                                        
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

export default CategoryWiseProductDisplay
