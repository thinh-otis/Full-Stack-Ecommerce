import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
// import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    // console.log("query", query.search)

    const fetchProduct = useCallback(async()=>{
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/search${query.search}`)
        const dataResponse = await response.json()
        setLoading(false)

        setData(dataResponse.data || [])

        // console.log("dataResponse", dataResponse)
    },[query.search])
    useEffect(()=>{
        fetchProduct()
    }, [fetchProduct])
  return (
    <div translate='no'  className='container mx-auto p-4'>
        {
            loading && (
                <p className='text-lg text-center'>Đang tải......</p>
            )
        }
        <p className='text-lg font-semibold my-3'>Kết quả tìm kiếm : {data.length}</p>
        {
            data.length === 0 && !loading && (
                    <p className='bg-white text-lg text-center p-4'>Không tìm thấy....</p>
            )
        }
        {
            data.length !== 0 && !loading && (
                <VerticalCard loading={loading} data={data}/>
            )
        }
    </div>
  )
}

export default SearchProduct
