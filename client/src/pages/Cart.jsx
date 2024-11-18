import{FaArrowLeftLong } from "react-icons/fa6"
const Cart =({cart})=>{

    return <>
    <div></div>
 { cart ? < FilledCart data={[]}/>:<EmptyCart/> } 
    
    </>
};
const FilledCart=({data})=>{
    
    return<>
    </>
}
const EmptyCart =()=>{
  
    return(
        <>
        
        <div className="container my-5">
        <div className="text-center bold-large-text"> CART</div>
  <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5">
    <h1 className="text-body-emphasis">Your have empty cart</h1>
    <a className="btn btn-light px-5 " href='./products'>
    <FaArrowLeftLong />&nbsp;
    Continue shopping
    </a>
  </div>
</div>
</>
    )

}

    export default Cart
