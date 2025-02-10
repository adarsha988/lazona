
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes,AdminRoutes } from "./components/Routes";

import{AdminProducts,AddProduct,EditProduct} from "./pages/Admin/products/index";
import {Add,Admin,Edit} from "./pages/Admin/categories/index";
import { Adminorder,Addorder,Editorder } from "./pages/Admin/orders";
import { AddUser,AdminUser,EditUser } from "./pages/Admin/users";

import About from "./pages/About";
import Cart from "./pages/Cart";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./layouts/Footer";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutState";
import Contact from "./pages/Contact";
import SignupPage from "./pages/Signup";
import Dashboard from "./pages/Admin/Dashboard";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";


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
                                 <Admin/>
                              </AdminRoutes> }/>
                               <Route
                               path={"/admin/categories/add"}
                              element={
                              <AdminRoutes roles="admin">
                                 <Add/>
                              </AdminRoutes> }/>
                               <Route
                               path={"/admin/categories/:id"}
                              element={
                              <AdminRoutes roles="admin">
                                 <Edit/>
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
                                  <Adminorder />
                              </AdminRoutes> }/>

                               <Route
                               path={"/admin/orders/add"}
                              element={
                              <AdminRoutes roles="admin">
                                  <Addorder/>
                              </AdminRoutes> }/>
                               <Route
                               path={"/admin/orders/:id"}
                              element={
                              <AdminRoutes roles="admin">
                                  <Editorder />
                              </AdminRoutes> }/>
                               
                               <Route
                               path={"/admin/users"}
                              element={
                              <AdminRoutes roles="admin">
                                  <AdminUser />
                              </AdminRoutes> }/>
                               <Route
                               path={"/admin/users/add"}
                              element={
                              <AdminRoutes roles="admin">
                                  <AddUser />
                              </AdminRoutes> }/>
                               <Route
                               path={"/admin/users/:id"}
                              element={
                              <AdminRoutes roles="admin">
                                  <EditUser/>
                              </AdminRoutes> }/>
                              
                               
                               
                               
                 </Route>
            </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
