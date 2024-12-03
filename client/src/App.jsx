import {BrowserRouter, Routes,Route} from "react-router-dom";
import About from "./pages/About";
import Cart from "./pages/Cart";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ENavbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import AdminProducts from"./pages/Admin/AdminProducts"
import { PrivateRoutes } from "./components/Routes";



const adminRoutes=[
  { path:"/products",component:<AdminProducts/>,role:"admin"},
  { path:"/orders",component:<AdminProducts/>,role:"admin"},
  { path:"/users",component:<AdminProducts/>,role:"admin"},
]


const App=()=>{

 
  return (
    <div className="">
    <BrowserRouter>
     <ENavbar/>
    
  <main className="flex-shrink-0 d-flex flex-column min-vh-100">
  <div className="container ">
  <Routes>

    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/productDetail/:id" element={<ProductDetail/>}/>
    <Route path="/admin/products" element={<AdminProducts/>}/>
    <Route path="/products" element={<Products/>}/>
    {
      adminRoutes.map((route,index)=>(
        <Route 
        key={index}
        path={`/admin${route?.path}`}
        element={
         <PrivateRoutes roles={route?.role??" "}>
          { route?.component}
         </PrivateRoutes>
        }/>
      ))
    }
    <Route path="*" element={<ErrorPage/>}/>
  </Routes>
  </div>
  </main>
  <Footer/>
  </BrowserRouter>
  </div>
  )
}

export default App
