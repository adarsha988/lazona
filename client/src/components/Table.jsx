import { MdDelete,MdEdit } from "react-icons/md";
import Swal from 'sweetalert2'
function Table({products,headers,msg,url,deleteById}) {
const handleChange=async(e,id)=>{
  e.preventDefault();
  const result= await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  })
    if (result.isConfirmed) {
    await deleteById(id,url)
    
      Swal.fire(
        "Deleted!",
        msg,
       "success"
      );
    }
  
 const handleEdit=async(id)=>{
console.log(id)
 }

}

  return (
       <div className="table-responsive">
    <table className="table table-striped table-sm">
      <thead>

        <tr>
         {headers.length>0 ? headers.map((d,idx)=>{
          return <th  key={idx}scope="col">{d}</th>
          }):null }
          <th >
          actions
        </th>
        </tr>
    
      </thead>
      <tbody>
          {products.length>0 ? products.map((d,idx)=> {
            
        return <tr key={idx}>
           <td >{idx+1}</td>
          <td>{d?.name}</td>
          <td>{d?.quantity}</td>
          <td>{d?.price}</td>
          <td>
         <div className=" d-flex justify-content-evenly">
         <MdDelete onClick={(e)=>handleChange(e,d._id)} />
         <MdEdit onClick={(e)=>handleEdit(e,d._id)} />
         </div>
          </td>
          </tr>
          }):null}
        
        

      </tbody>
    </table>
  </div>

  )
}

export default Table