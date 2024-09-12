import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

import GlobalStyles from "./styles/GlobalStyles"
import AppLayout from "./ui/AppLayout"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import PageNotFound from "./pages/NotFoundPage"
import LoginPage from "./pages/LoginPage"

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/all" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/*Handle Not Found Path*/}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
