import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Mainpage from "./pages/mainpage";
import Header from "./components/header";
import Shoppingcart from "./pages/shoppingcart";
import PaymentPage from "./pages/payment";
import Pdescript from "./pages/pdescript";
import Chat from "./pages/shopowner/chat";
import OrderManagement from "./pages/shopowner/ordermanagement";
import OrderDetail from "./pages/shopowner/OrderDetail";
import Reports from "./pages/shopowner/report";
import OrderHistory from "./pages/personal";
import { CartProvider } from "./components/cartcontext";
import DropdownMenu from "./components/dropdownmenu";
import MainPage from "./pages/shopowner/mainpage";
import EmployeeList from "./pages/shopowner/NewEmployee";
import Supplier from "./pages/shopowner/Supplier";
import SupplierDetail from "./pages/shopowner/SupplierDetail";
import EmployeeDetail from "./pages/shopowner/EmployeeDetail";
import ProductList from "./pages/shopowner/ProductList";
import ProductDetail from "./pages/shopowner/ProductDetail";
import AddSupplier from "./pages/shopowner/AddSupplier";
import CreateProduct from "./pages/shopowner/CreateProduct";
import AddEmployee from "./pages/shopowner/AddEmployee";
import ImportOrder from "./pages/shopowner/ImportOrder";
import CreateImportOrder from "./pages/shopowner/CreateImportOrder";

function App() {
  const location = useLocation();
  const showNav = [
    "chat",
    "reports",
    "products",
    "orders",
    "employees",
    "supplier",
    "admin",
  ].some((page) => location.pathname.includes(page));

  return (
    <CartProvider>
      <div className="app">
        {!showNav && (
          <>
            <Header />
            <DropdownMenu />
          </>
        )}
        <div className="content">
          <Routes>
            <Route path="/mainpage" element={<Mainpage />} />
            <Route path="/shoppingcart" element={<Shoppingcart />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/pdescript" element={<Pdescript />} />
            <Route path="/personal" element={<OrderHistory />} />
            <Route path="/admin" element={<MainPage />}>
              <Route path="chat" element={<Chat />} />
              <Route path="reports" element={<Reports />} />
              <Route path="supplier" element={<Supplier />} >
                <Route path="addsupplier" element={<AddSupplier/>} ></Route>
                <Route path=":supplierId" element={<SupplierDetail />}></Route>
              </Route>
              <Route path="orders" element={<ImportOrder />} >
                <Route path=":orderId" element={<OrderDetail />}></Route>
                <Route path="create" element={<CreateImportOrder />}></Route>
              </Route>
              <Route path="employees" element={<EmployeeList />}>
              <Route path="addemployee" element={<AddEmployee />}></Route>
                <Route path=":employeeId" element={<EmployeeDetail />}></Route>
              </Route>
              <Route path="products" element={<ProductList />}>
                <Route path=":productId" element={<ProductDetail />} />
                <Route path="create" element={<CreateProduct />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
