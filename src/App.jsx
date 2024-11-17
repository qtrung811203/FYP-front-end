import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./layout/AppLayout";
import AdminLayout from "./layout/AdminLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PageNotFound from "./pages/NotFoundPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import CheckoutCancelPage from "./pages/CheckoutCancelPage";
import CodSuccessPage from "./pages/CodSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./pages/ProtectedRoute";

import ScrollToTop from "./utils/scrollToTop";

//Redux Store
import store from "./store";
import { AuthProvider } from "./context/authProvider";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="home" />} />
                <Route path="/all" element={<ProductsPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                  path="/checkout/success"
                  element={<CheckoutSuccessPage />}
                />
                <Route
                  path="/checkout/cod-success"
                  element={<CodSuccessPage />}
                />
                <Route
                  path="/checkout/cancel"
                  element={<CheckoutCancelPage />}
                />
                <Route path="/home" element={<HomePage />} />
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute inRole={"admin"}>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                />
                {/*Handle Not Found Path*/}
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>

          {/* Toast Custom */}
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "14px",
                maxWidth: "500px",
                padding: "16px 24px",
              },
            }}
          />
        </QueryClientProvider>
      </Provider>
    </AuthProvider>
  );
}

export default App;
