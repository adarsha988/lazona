import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Cart from "./pages/Cart";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/home";
import ProductDetail from "./pages/ProductDetail";
import ENavbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Stack from 'react-bootstrap/Stack'
import Products from "./pages/Products";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Home/></div>,
  },
  {
    path: "/cart",
    element: <div><Cart/></div>,
  },
  {
    path: "/products",
    element: <div><Products/></div>,
  },
  {
    path: "/login",
    element: <div><Login/></div>,
  },
 
  {
    path: "/products/:id",
    element: <div><ProductDetail/></div>,
  },
  {
    path: "*",
    element: <div><ErrorPage/></div>,
  },
 
]);
const App=()=>{

  return (
<div className="d-flex flex-column h-100">
   <Stack  gap={3}>
     <ENavbar/>
  <main className="flex-shrink-0  vh-100">
  <div className="container">
  <RouterProvider router= {router}/>
  </div>
  </main>
  <Footer/>
  </Stack>
  </div>
  )
}

export default App
