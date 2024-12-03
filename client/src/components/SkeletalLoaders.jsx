 export const SkelLoader=()=>{
  return (
 
<div className="card m-5" aria-hidden="true">
  <div className=" card-header d-flex justify-content-center ">
  <div className="cointainer spinner-border text-secondary p-2 ">
    <span className="visually-hidden ">Loading.....</span>
  </div> </div>
  <div className="card-body">
    <h5 className="card-title placeholder-glow">
      <span className="placeholder col-6"></span>
    </h5>
    <p className="card-text placeholder-glow">
      <span className="placeholder col-7"></span>
      <span className="placeholder col-4"></span>
      <span className="placeholder col-4"></span>
      <span className="placeholder col-6"></span>
      <span className="placeholder col-8"></span>
    </p>

    <div className=" d-flex m-4 mt-5 justify-content-center">
    <a href="#"  className="btn btn-secondary disabled placeholder col-2"></a>

     <a href="#"  className="btn btn-secondary disabled placeholder   col-2"></a>
    </div>
  </div>
</div>
  )
}

