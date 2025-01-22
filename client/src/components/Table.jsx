
function Table({products,headers}) {
  console.log({products,headers})
  return (
       <div className="table-responsive">
    <table className="table table-striped table-sm">
      <thead>

        <tr>
         {headers.length>0 ? headers.map((d,idx)=>{
          return <th  key={idx}scope="col">{d}</th>
          }):null }
        </tr>
      </thead>
      <tbody>
          {products.length>0 ? products.map((d,idx)=> {
        return <tr key={idx}>
           <td >{idx+1}</td>
          <td>{d?.name}</td>
          <td>{d?.quantity}</td>
          <td>{d?.price}</td>
          </tr>
          }):null}
        
        

      </tbody>
    </table>
  </div>

  )
}

export default Table