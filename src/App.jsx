import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

import GlobalStyles from "./styles/GlobalStyles"
import AppLayout from "./ui/AppLayout"
import MainMenu from "./pages/MainMenu"
import AllProduct from "./pages/AllProduct"
import Product from "./pages/Product"

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="/home" element={<MainMenu />} />
            <Route path="/collections/all" element={<AllProduct />} />
            <Route path="/product/:id" element={<Product />} />
            {/*Handle Not Found Path*/}
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
