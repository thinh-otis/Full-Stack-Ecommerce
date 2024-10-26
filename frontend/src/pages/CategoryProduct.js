import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading] = useState(false)
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListinArray = urlSearch.getAll("category")

  const urlCategoryListObject = {}
  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true
  })

  // console.log("urlCategoryListObject", urlCategoryListObject)
  // console.log("urlCategoryListinArray", urlCategoryListinArray)


  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])

  const [sortBy, setSortBy] = useState("")

  const fetchData = useCallback(async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      // credentials : 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    })

    const dataResponse = await response.json()

    setData(dataResponse?.data)
    // console.log(dataResponse)
  },[filterCategoryList])

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target
    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })
    // console.log("selected category", name, value, checked)
  }

  // console.log("selectCategory", selectCategory)
  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }
      return null
    }).filter(el => el)

    setFilterCategoryList(arrayOfCategory)

    //format for url change when change on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })
    // console.log("urlFormat", urlFormat.join(""))
    navigate("/product-category?" + urlFormat.join(""))
    // console.log("selected", arrayOfCategory)
  }, [selectCategory, navigate])

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target
    setSortBy(value)

    if (value === 'asc') {
      setData(preve => preve.sort((a, b) => a.sellingPrice - b.sellingPrice))
    }

    if (value === 'dsc') {
      setData(preve => preve.sort((a, b) => b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(() => {

  }, [sortBy])
  return (
    // <div className='container mx-auto p-4'>

    //       {/* phiên bản máy tính để bàn */}
    //       <div className='grid lg:hidden grid-cols-[200px,1fr]'>
    //           {/* trượt bên trái */}
    //           <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
    //             {/* sắp xếp theo */}
    //             <div className=''>
    //                 <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sắp xếp theo</h3>

    //                 <form className='text-sm flex flex-col gap-2 py-2'>
    //                   <div className='flex items-center gap-3'>
    //                     <input type="radio" name='sort' value={"asc"} onChange={handleOnChangeSortBy} checked={sortBy === 'asc'}/>
    //                     <label>Giá : Thấp - Cao</label>
    //                   </div>
    //                   <div className='flex items-center gap-3'>
    //                     <input type="radio" name='sort' value={"dsc"} onChange={handleOnChangeSortBy} checked={sortBy === 'dsc'}/>
    //                     <label>Giá : Cao - Thấp</label>
    //                   </div>
    //                 </form>
    //             </div>

    //             {/* lọc theo */}
    //             <div className=''>
    //                 <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Loại Sản Phẩm</h3>

    //                 <form className='text-sm flex flex-col gap-2 py-2'>
    //                     {
    //                       productCategory.map((categoryName, index)=>{
    //                         return(
    //                           <div className='flex items-center gap-3'>
    //                             <input type="checkbox" name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}/>
    //                             <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
    //                           </div>
    //                         )
    //                       })
    //                     }
    //                 </form>
    //             </div>

    //           </div>

    //           {/* trượt bên phải */}
    //           <div className='px-4'>
    //               <p className='font-medium text-slate-800 text-lg my-2'>Kết quả tìm : {data.length}</p>
    //               <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
    //                   {
    //                     data.length !== 0 && (
    //                       <VerticalCard data={data} loading={loading}/>
    //                     )                
    //                   }
    //               </div>
    //           </div>
    //       </div>
    // </div>

    <div className='container mx-auto p-5'>
      {/* Phiên bản cho cả màn hình nhỏ và lớn */}
      <div className='grid grid-cols-1 lg:grid-cols-[200px,1fr]'>
        {/* Trượt bên trái */}
        <div className='bg-white p-2 min-h-[calc(50vh-60px)] lg:p-4 lg:min-h-[calc(100vh-200px)] overflow-y-scroll'>
          {/* Sắp xếp theo */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sắp xếp theo</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type="radio" name='sort' value={"asc"} onChange={handleOnChangeSortBy} checked={sortBy === 'asc'} />
                <label>Giá : Thấp - Cao</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type="radio" name='sort' value={"dsc"} onChange={handleOnChangeSortBy} checked={sortBy === 'dsc'} />
                <label>Giá : Cao - Thấp</label>
              </div>
            </form>
          </div>

          {/* Lọc theo */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Loại Sản Phẩm</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName) => (
                  <div className='flex items-center gap-3' key={categoryName?.value}>
                    <input type="checkbox" name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                    <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                  </div>
                ))
              }
            </form>
          </div>
        </div>

        {/* Trượt bên phải */}
        <div translate='no' className='px-2'>
          <p className='font-medium text-slate-800 text-lg my-2'>Kết quả tìm : {data.length}</p>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 min-h-[calc(100vh-120px)] overflow-y-scroll'>
            {
              data.length !== 0 && (
                <VerticalCard data={data} loading={loading} />
              )
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default CategoryProduct
