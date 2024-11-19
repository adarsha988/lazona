import{FaArrowLeftLong } from "react-icons/fa6"
const Cart =()=>{
    const cart = [
        { Name: "Product A", Image: "imageA.jpg", Price: 100, Quantity: 2, Total_Price: 200 },
        { Name: "Product B", Image: "imageB.jpg", Price: 150, Quantity: 1, Total_Price: 150 },
      ];
    return <>
    
 { cart.length > 0 ? < FilledCart cart={cart}/>:<EmptyCart/> } 
    
    </>
};
const FilledCart=({cart})=>{
    
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
                    {data.Name || "Name"}
                    </td>
                <td>
                    <img src={data.Image||""}alt={data.Name} width="50" className="img-thumbnail"></img>
                    </td>
                <td>
                    {data.Price.toFixed(2)||"Price"}
                    </td>
                <td>
                    {data.Quantity||"Quantity"}
                    </td>
                <td>
                    {data.Total_Price||"Total Price"}
                    </td>
                    </tr>
                ))
            }
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
