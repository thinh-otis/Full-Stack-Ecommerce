import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

function Home() {
  return (
    <div>
      <CategoryList />
      <BannerProduct/>
      
      <HorizontalCardProduct category={"airpod"} heading={"Tai Nghe Bluetooth"}/>
      <HorizontalCardProduct category={"watch"} heading={"Đồng hồ thông minh"}/>

      <VerticalCardProduct category={"mobile"} heading={"Điện Thoại"}/>
      <VerticalCardProduct category={"mouse"} heading={"Chuột máy Tính"}/>
      <VerticalCardProduct category={"television"} heading={"Smart Tivi"}/>
      <VerticalCardProduct category={"camera"} heading={"Máy ảnh số"}/>
      <VerticalCardProduct category={"earphone"} heading={"Tai nghe dây"}/>
      <VerticalCardProduct category={"speaker"} heading={"Loa Bluetooth"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Tủ lạnh"}/>
      <VerticalCardProduct category={"trimmer"} heading={"Máy cắt tóc"}/>
    </div>
  )
}

export default Home
