import React from 'react'
import HomePage from './Pages/HomePage'
import Footer from './components/footer'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MenuPage from './Pages/MenuPage'
import DetailedMenuPage from './Pages/DetailedMenuPage'
import MealPlanPage from './Pages/MealPlanPage'
import WeightLossPlanPage from './Pages/WeightLossPlanPage'
import WeightGainPlanPage from './Pages/WeightGainPlanPage'
import GutHealthPlanPage from './Pages/GutHealthPlanPage'
import AntiInflammatoryPlanPage from './Pages/AntiInflammatoryPlanPage'
import OrderPage from './Pages/OrderPage'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './stores/useUserStore'
import { useEffect } from 'react'
import ScrollToTop from './components/ScrollToTop'
import MealPlanDetailPage from './Pages/MealPlanDetailPage'
import OrderSummaryPage from './Pages/OrderSummaryPage'
import AdminPage from './Pages/AdminPage'
import MyPlanPage from './Pages/MyPlanPage'

const App = () => {

  const { user, checkAuth, checkingAuth } = useUserStore();
  const location = useLocation();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(user);


  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to='/' />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={location.state?.from || '/'} replace />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/full-menu" element={<DetailedMenuPage />} />
        <Route path="/meal-plan" element={<MealPlanPage />} />

      
        <Route path="/meal-plan/:planId" element={<MealPlanDetailPage />} />
        <Route path="/order-summary" element={<OrderSummaryPage />} />



        <Route path="/order" element={<OrderPage />} />
        {/* Admin is the only page that requires login. Wait for the auth check so a refresh doesn't bounce admins away. */}
        <Route
          path="/admin"
          element={
            checkingAuth
              ? <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>
              : !user
                ? <Navigate to="/login" state={{ from: '/admin' }} />
                : user.role === 'admin'
                  ? <AdminPage />
                  : <Navigate to="/" />
          }
        />

        <Route path="/my-plan" element={user ? <MyPlanPage /> : <Navigate to='/login' />} />

      </Routes>
      <Footer />
      <Toaster />

    </div>
  )
}

export default App