//ui
import TopSwiper from "../ui/Swiper/TopSwiper/TopSwiper"
import FeatureSwiper from "../ui/Swiper/FeatureSwiper/FeatureSwiper"
import EndSwiper from "../ui/Swiper/EndSwiper/EndSwiper"

//icon
import { BsBoxFill } from "react-icons/bs"
import { useHomeProducts } from "../features/useHomeProducts"

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
