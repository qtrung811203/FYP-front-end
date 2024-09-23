import { Outlet } from "react-router-dom"

import Header from "../components/Header/Header"
import CartSidebar from "../components/CartSidebar/CartSidebar"

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <CartSidebar />
    </>
  )
}

export default AppLayout
