import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Cart from "./pages/Cart";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ENavbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutState";
import Contact from "./pages/Contact";
import AdminProducts from "./pages/Admin/AdminProducts";
import AddProduct from "./pages/Admin/AddProduct";
import EditProduct from "./pages/Admin/EditProduct";
import SignupPage from "./pages/Signup";
import { PrivateRoutes,AdminRoutes } from "./components/Routes";
import Dashboard from "./pages/Admin/Dashboard";
import Adminbar from "./layouts/Adminbar";
import { useSelector } from "react-redux";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";


const adminRoutes =  [
  { path: "/categories", component: <Dashboard />, role: "admin" },
  { path: "/dashboard", component: <Dashboard />, role: "admin" },
  { path: "/products", component: <AdminProducts />, role: "admin" },
  { path: "/products/add", component: <AddProduct />, role: "admin" },
  { path: "/products/:id", component: <EditProduct/>, role: "admin" },
  { path: "/orders", component: <AdminProducts />, role: "admin" },
  { path: "/users", component: <AdminProducts />, role: "admin" },
]
const App = () => {

  
  return (
    <div className="">
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout/>}>
                    <Route index element={<Home />} />
                     <Route path="/about" element={<About />} />
                     <Route path="/cart" element={<Cart />} />
                     <Route path="/checkout" element={<Checkout />} />
                     <Route path="/checkout/success" element={<CheckoutSuccess />} />
                       <Route path="/checkout/failed" element={<CheckoutSuccess type="failure" 
                      msgHeader="something went wrong.try again!"
                      msg="transaction failed"/>} />
                     <Route path="/contact" element={<Contact />} />
                      <Route path="/login" element={
                      <PrivateRoutes>
                      <Login />
                       </PrivateRoutes>
                       } />
                      <Route path="/signup" element={< SignupPage />} />
                      <Route path="/productDetail/:id" element={<ProductDetail />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="*" element={<ErrorPage />} />
                 </Route>
                 <Route  path="/admin" element={<AdminLayout/>}>
                          
                               <Route
                               path={"/admin/categories"}
                              element={
                              <AdminRoutes roles="admin">
                                 <AdminProducts/>
                              </AdminRoutes> }/>

                               <Route
                               path={"/admin/products"}
                              element={
                              <AdminRoutes roles="admin">
                                 <AdminProducts/>
                              </AdminRoutes> }/>

                               <Route
                               path={"/admin/dashboard"}
                              element={
                              <AdminRoutes roles="admin">
                               <Dashboard />
                              </AdminRoutes> }/>

                               <Route
                               path={"/admin/products/add"}
                              element={
                              <AdminRoutes roles="admin">
                                  <AddProduct />
                              </AdminRoutes> }/>
                               
                               <Route
                               path={"/admin/products/:id"}
                              element={
                              <AdminRoutes roles="admin">
                                  <EditProduct />
                              </AdminRoutes> }/>
                               
                               <Route
                               path={"/admin/orders"}
                              element={
                              <AdminRoutes roles="admin">
                                  <AddProduct />
                              </AdminRoutes> }/>
                               
                               <Route
                               path={"/admin/users"}
                              element={
                              <AdminRoutes roles="admin">
                                  <AddProduct />
                              </AdminRoutes> }/>
                              
                               
                               
                               
                 </Route>
            </Routes>
          
        
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
