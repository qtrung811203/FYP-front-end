import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default AppLayout
