import { BsBoxFill } from "react-icons/bs"
import { useHomeProducts } from "../hooks/useHomeProducts"

import TopSwiper from "../components/Swiper/TopSwiper/TopSwiper"
import FeatureSwiper from "../components/Swiper/FeatureSwiper/FeatureSwiper"
import EndSwiper from "../components/Swiper/EndSwiper/EndSwiper"

function HomePage() {
  const { newMerch } = useHomeProducts()

  return (
    <>
      {/* TOP SWIPER */}
      <TopSwiper />
      {/* NEW MERCH */}
      <FeatureSwiper mainColor={"var(--primary-color)"} isNew={true} data={newMerch}>
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
