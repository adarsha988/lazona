import{FaArrowLeftLong } from "react-icons/fa6"
import{CiCircleRemove } from "react-icons/ci";
import {useDispatch,useSelector} from "react-redux";
import { removeItem,increaseQuantity,decreaseQuantity } from "../slices/cartSlice";
import numberFormatter from "number-formatter";
import { SERVER_URL } from "../constants";

const Cart =()=>{
    const dispatch=useDispatch();
    const {cart}= useSelector(state=>state.cart);
    const {products}= useSelector(state=>state.products);
    
    const removeFromCart = (id) => {
      if(id){
     dispatch(removeItem(id));
    }}
    const increase = (id) => {
      if(id){
     dispatch(increaseQuantity({id,products}));
    }}
    const decrease = (id) => {
      if(id){
     dispatch(decreaseQuantity(id));
    }}
    const getTotalAmount = () => {
    const totalAmount=cart.reduce((acc,item)=>acc+(item.quantity*item.price),0)
        return totalAmount
    }
  
    
    return <>
 { cart.length > 0 ? < FilledCart cart={cart} removeFromCart ={removeFromCart }
 decrease={decrease}increase={increase} getTotalAmount={getTotalAmount} />:<EmptyCart/> }  </>
};
const FilledCart=({cart,removeFromCart,increase,decrease,getTotalAmount,})=>{
    
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
                    <img src={data && data.images[0].includes("https:")? data.images[0]:SERVER_URL+"/"+data.images[0]||""}alt={data.name} width="50" className="img-thumbnail"></img>
                    </td>
                <td>
                    {numberFormatter( " Rs#,###.##", Number(data?.price))}
                    </td>
                <td>
                <div className="btn btn-primary"onClick={()=>increase(data?._id)}> + </div> &nbsp;
                <span className="badge-transparent m-2 ">{data?.quantity||"Quantity"}</span>
                &nbsp; 
                 <div className="btn btn-primary"onClick={()=>decrease(data?._id)}> - </div></td>
                <td>
                {numberFormatter( " #,##,###.##",  Number(data.price)*Number(data?.quantity?? 1))}
                    </td>
                  <td><CiCircleRemove color="red" size={24} onClick={ ()=>removeFromCart(data?._id)}/></td> 
                    </tr>
                    
                ))
               
            } 
            <tr>
                <td colSpan={5}>
                 Total Carts
                </td>
                <td>{numberFormatter( " Rs#,##,###.##", Number(getTotalAmount() ))}</td>
            </tr>
            </tbody>
          
        </table>
        
        <div className="d-flex justify-content-between mt-4">
            <a href="./products" className="btn btn-success"> 
            <FaArrowLeftLong /> &nbsp; Continue shopping</a>
            <a href="./checkout" className="btn btn-secondary"> Proceed to checkout</a>


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
