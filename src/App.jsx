import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Mainpage from './pages/mainpage'
import Header from './components/header'
import Shoppingcart from './pages/shoppingcart'
import PaymentPage from './pages/payment'
import Pdescript from './pages/pdescript'
import Chat from './pages/shopowner/chat'
import ProductManagement from './pages/shopowner/productmanagement'
import OrderManagement from './pages/shopowner/ordermanagement'
import EmployeeManagement from './pages/shopowner/employeemanagement'
import Reports from './pages/shopowner/report'
import OrderHistory from './pages/personal'
import { CartProvider } from './components/cartcontext'
import DropdownMenu from './components/dropdownmenu'
import Nav from './components/shopowner/nav/nav'

function App() {
  const location = useLocation();
  const showNav = ['chat', 'reports', 'products', 'orders', 'employees'].some((page) =>
    location.pathname.includes(page)
  );

  return (
    <CartProvider>
      <div className="app">
        {!showNav && (
          <>
            <Header />
            <DropdownMenu />
          </> )}
        <div className="content">
          <Routes>
            <Route path='/mainpage' element={<Mainpage />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path='/shoppingcart' element={<Shoppingcart />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/pdescript' element={<Pdescript />} />
            <Route path='/personal' element={<OrderHistory />} />
          </Routes>
        </div>
      </div>
    </CartProvider>
  )
}

export default App;
