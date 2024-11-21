import{FaArrowLeftLong } from "react-icons/fa6"
import{CiCircleRemove } from "react-icons/ci";
import {useDispatch,useSelector} from "react-redux";
import { removeItem } from "../slices/cartSlice";
const Cart =()=>{
    const dispatch=useDispatch();
    const removeFromCart = (id) => {
      if(id){
     dispatch(removeItem(id));
    }}
 const {cart}= useSelector(state=>state.cart); 
    
    return <>
 { cart.length > 0 ? < FilledCart cart={cart} removeFromCart ={removeFromCart }/>:<EmptyCart/> }  </>
};
const FilledCart=({cart,removeFromCart })=>{
    
    return(<>
  <div className="container my-5">
    {/* Header section */}
    <div className="text-center mb-4">
       <h1 className="fw-bold text-primary"> Your shopping cart</h1>
        <p className="fw-light">Carefully review you items before checkout </p>
    </div>
  </div>
  {/* table section */}

    <table className="table  table-hover align-middle table-responsive">
        <thead className="table-light">
        <tr>  
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
         </tr></thead>
            <tbody>
            {
                cart.map((data,index)=>
                (
                    <tr key={index} scope="row"><td>
                    {data?.name || "Name"}
                    </td>
                <td>
                    <img src={data.Image||""}alt={data.Name} width="50" className="img-thumbnail"></img>
                    </td>
                <td>
                    {data?.price||"Price"}
                    </td>
                <td>
                    {data?.quantity||"Quantity"}
                    </td>
                <td>
                    {Number(data.price)*Number(data?.quantity)}
                    </td>
                   <CiCircleRemove color="red" size={24} onClick={ ()=>removeFromCart(data?.id)}/>
                    </tr>
                    
                ))
               
            } 
            <tr>
                <td colSpan={5}>
                 Total Carts
                </td>
                <td>Total Amount</td>
            </tr>
            </tbody>
          
        </table>
        
        <div className="d-flex justify-content-between mt-4">
            <a href="./products" className="btn btn-success"> 
            <FaArrowLeftLong /> &nbsp; Continue shopping</a>
            <a href="./productDetail" className="btn btn-secondary"> Proceed to checkout</a>


        </div>
    </>
    )
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
