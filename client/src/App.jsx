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
import SignupPage from "./pages/Signup";
import { PrivateRoutes,AdminRoutes } from "./components/Routes";
import Dashboard from "./pages/Admin/Dashboard";
import Adminbar from "./layouts/Adminbar";
import { useSelector } from "react-redux";

const adminRoutes = [
  { path: "/categories", component: <Dashboard/>, role: "admin" },
  { path: "/dashboard", component: <Dashboard/>, role: "admin" },
  { path: "/products", component: <AdminProducts />, role: "admin" },
  { path: "/orders", component: <AdminProducts />, role: "admin" },
  { path: "/users", component: <AdminProducts />, role: "admin" },
];

const App = () => {
  const {isLoggedIn}= useSelector((state)=>state.auth)
  console.log(isLoggedIn)
  return (
    <div className="">
      <BrowserRouter>
      {isLoggedIn ? <Adminbar/>:<ENavbar /> }  

        <main className="flex-shrink-0 d-flex flex-column min-vh-100">
          <div className="container ">
            <Routes>
              <Route path="/" element={<Home />} />
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
              {adminRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={`/admin${route?.path}`}
                  element={
                    <AdminRoutes roles={route?.role ?? " "}>
                      {route?.component}
                    </AdminRoutes>
                  }
                />
              ))}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
