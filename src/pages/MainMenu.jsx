import TopSwiper from "../ui/Swiper/TopSwiper"
import FeatureSwiper from "../ui/FeatureSwiper/FeatureSwiper"

//icon
import { BsBoxFill } from "react-icons/bs"

function MainMenu() {
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
    </>
  )
}
export default MainMenu
