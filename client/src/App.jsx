import {BrowserRouter, Routes,Route} from "react-router-dom";
import About from "./pages/About";
import Cart from "./pages/Cart";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/home";
import ProductDetail from "./pages/ProductDetail";
import ENavbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Stack from 'react-bootstrap/Stack'
import Products from "./pages/Products";
import Login from "./pages/Login";
import Contact from "./pages/Contact";




const App=()=>{

  return (
    <BrowserRouter>
<div className="d-flex flex-column h-100">
   <Stack  gap={3}>
     <ENavbar/>
  <main className="flex-grow-1  vh-100">
  <div className="container ">
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/productDetail/:id" element={<ProductDetail/>}/>
    <Route path="/products" element={<Products/>}/>
    <Route path="*" element={<ErrorPage/>}/>
  </Routes>
  </div>
  </main>
  <Footer/>
  </Stack>
  </div>
  </BrowserRouter>
  )
}

export default App
