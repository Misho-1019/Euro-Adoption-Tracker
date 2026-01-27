import './App.css'
import { Routes, Route } from "react-router";
import AppLayout from './pages/layouts/AppLayout'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Products from './pages/products/Products';
import Rate from './pages/rate/Rate';
import Basket from './pages/basket/Basket';
import Compliance from './pages/compliance/Compliance';
import Analytics from './pages/analytics/Analytics';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRate from './pages/admin/AdminRate';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminSettings from './pages/admin/AdminSettings';
import About from './pages/about/About';
import ComplianceRules from './pages/compliance/ComplianceRules';
import Logout from './pages/logout/Logout';
import { UserProvider } from './providers/UserProvider';
import AuthGuard from './components/guards/authGuard';

function App() {
  return (
    <UserProvider>
      <Routes>
  
        <Route element={<AppLayout />}>
          <Route element={<AuthGuard />}>
            <Route index element={<Dashboard />} />
            <Route path='/products' element={<Products />} />
            <Route path='/rate' element={<Rate />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/compliance' element={<Compliance />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route path='/about' element={<About />} />
            <Route path='/compliance/rules' element={<ComplianceRules />} />
            <Route path='/logout' element={<Logout />} />

            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/admin/rate' element={<AdminRate />} />
            <Route path='/admin/products' element={<AdminProducts />} />
            <Route path='/admin/categories' element={<AdminCategories />} />
            <Route path='/admin/settings' element={<AdminSettings />} />
          </Route>

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
  
        </Route>
      </Routes>

    </UserProvider>
  )
}

export default App
