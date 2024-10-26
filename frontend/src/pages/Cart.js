import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async()=>{
        
        const response = await fetch(SummaryApi.addToCartProductView.url,{
            method : SummaryApi.addToCartProductView.method,
            credentials : 'include',
            headers :{
                "content-type" : "application/json"
            },
        })
        

        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }
    }

    // const handleLoading = async()=>{
    //     await fetchData()
    // }

    useEffect(()=>{
        const loadData = async()=>{
            setLoading(true)
            await fetchData()
            setLoading(false)
        }
        loadData()
    },[])
    
    const increaseQty = async(id, qty)=>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers :{
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                _id : id,
                quantity : qty + 1
            })
        })
        const responseData = await response.json()

        if(responseData.success){
            fetchData()
        }
    }
    const decreaseQty = async(id, qty)=>{
        if(qty >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method : SummaryApi.updateCartProduct.method,
                credentials : 'include',
                headers :{
                    "content-type" : "application/json"
                },
                body : JSON.stringify({
                    _id : id,
                    quantity : qty - 1
                })
            })
            const responseData = await response.json()
    
            if(responseData.success){
                fetchData()
            }
        }
    }
    const deleteCartProduct = async(id)=>{
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method : SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers :{
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                _id : id,
            })
        })
        const responseData = await response.json()
 
        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((previousValue, currentValue)=> previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)

  return (
    <div className='container mx-auto'>
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>Không có sản phẩm nào...</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
            {/* view product */}
            <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart.map((el, index) =>{
                                return(
                                    <div key={el + "Add to Cart loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })
                            
                        ):(
                            data.map((product, index)=>{
                                return(
                                    <div key={product?._id + "Add to Cart loading"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-32 bg-slate-200'>
                                                <img src={product?.productId?.productImage[1]} alt="" className='w-full h-full object-scale-down mix-blend-multiply'/>
                                        </div>
                                        <div className='px-4 py-2 relative' translate='no'>
                                            {/* delete product */}
                                            <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-green-400 cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                                <MdDelete />
                                            </div>
                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                            <div className='flex justify-between items-center'>
                                                <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                                <p className='text-slate-600 font-semibold text-xl'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-2'>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
            </div>

            {/* Total product */}
            <div className='flex flex-col min-h-screen mt-5 lg:mt-0 w-full max-w-sm'>
                {
                    loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>

                        </div>
                    ):(
                        <div className='h-36 bg-white'>
                            <h2 className='text-white bg-red-600 px-4 py-1'>Thống kê :</h2>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Số lượng</p>
                                <p>{totalQty}</p>
                            </div>

                            <div className='flex items-center justify-between px-4 py-2 gap-2 font-medium text-lg text-slate-600'>
                                <p>Tổng số Tiền</p>
                                <p className='text-red-600'>{displayINRCurrency(totalPrice)}</p>
                            </div>

                            <div translate='no' className='flex flex-col items-center bg-blue-300 p-2'>
                                <p className='t-0 w-full mt-2 text-lg font-medium underline'>Liên hệ mua hàng : </p>
                                <p className='text-lg pt-2'>Hotline :    <strong className='text-blue-800'>1900-900-900</strong> Hoặc <strong className='text-red-600'>090X.XXX.XXX</strong></p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Cart
