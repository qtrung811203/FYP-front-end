import { useEffect } from "react"

import TopSwiper from "../ui/Swiper/TopSwiper/TopSwiper"
import FeatureSwiper from "../ui/Swiper/FeatureSwiper/FeatureSwiper"
import EndSwiper from "../ui/Swiper/EndSwiper/EndSwiper"

import axiosInstance from "../services/axiosConfig"

//icon
import { BsBoxFill } from "react-icons/bs"

function HomePage() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/products/home")
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {/* TOP SWIPER */}
      <TopSwiper />
      {/* NEW MERCH */}
      <FeatureSwiper mainColor={"var(--primary-color)"} isNew={true}>
        <BsBoxFill />
        <p>new merch</p>
      </FeatureSwiper>
      {/* NEW OTHER */}
      {/* <FeatureSwiper mainColor={""}>
        <BsBoxFill />
        <p>new merch</p>
      </FeatureSwiper> */}
      {/* END SWIPER */}
      <EndSwiper />
    </>
  )
}
export default HomePage
