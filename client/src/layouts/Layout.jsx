import { Outlet } from "react-router-dom";
import ENavbar from "./Navbar";
import Footer from "./Footer";
 
export default function Layout(){
return(
    <>
    <ENavbar/>
    <main className="flex-shrink-0 d-flex flex-column min-vh-100" style={{  "marginTop": "60px" , " padding": "16px "}}>
    <div className="container ">
    <Outlet/>
    </div></main>
    <Footer/>
    
    </>
)
}