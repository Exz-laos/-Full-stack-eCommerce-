import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div >
       <CategoryList/>
       <BannerProduct/>

  
       <HorizontalCardProduct category={"ຂອບພະ"} heading={"ຂອບພະຍອດນິຍົມ"}/>
       <HorizontalCardProduct category={"ຂອບພະຄຳອິຕາລີ"} heading={"ສາຍຄໍຍອດນິຍົມ"}/>

       <VerticalCardProduct category={"ຂອບພະ"} heading={"ຂອບພະ"}/>
       <VerticalCardProduct category={"ກ້ອງສ່ອງພະ"} heading={"ກ້ອງສ່ອງພະ"}/>
   
    </div>
  )
}

export default Home