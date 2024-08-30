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

  
       <HorizontalCardProduct category={"khoppha"} heading={"ຂອບພະຍອດນິຍົມ"}/>
       <HorizontalCardProduct category={"saiykhor"} heading={"ສາຍຄໍຍອດນິຍົມ"}/>

       <VerticalCardProduct category={"khoppha"} heading={"ຂອບພະ"}/>
       <VerticalCardProduct category={"camera"} heading={"ກ້ອງສ່ອງພະ"}/>
   
    </div>
  )
}

export default Home