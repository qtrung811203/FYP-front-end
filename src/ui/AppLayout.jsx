import { Outlet } from "react-router-dom"

function AppLayout() {
  return (
    <>
      <h1>App Layout</h1>
      <Outlet />
    </>
  )
}

export default AppLayout
