import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
import { usePagination, DOTS } from "../hooks/usePagination";

const HookPaginate = ({
  total,
  limit,
  currentPage,
  setCurrentPage,
  setLimit
})=>{
  let active = currentPage;
  let items = [];
  const totalNumberofPages = Math.ceil(total/limit)
  for (let number = 1; number <= totalNumberofPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}
      onClick={()=>{setCurrentPage(number)}}
      >
        {number}
      </Pagination.Item>,
    );
  }

  const paginationRange = usePagination({
    currentPage,
    totalCount: total,
    siblingCount: 1,
    pageSize: limit,
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }


  return (
  <div className='d-flex justify-content-center'>
    <div className="row">
    <div className="col">
    <Pagination>
    <Pagination.First 
    disabled={currentPage===1}
    onClick={()=>{
      setCurrentPage(1)
    }}/>
    <Pagination.Prev
    disabled={currentPage===1}
    onClick={()=>{
      currentPage!==1 ?
     setCurrentPage(currentPage-1): null }}/>

     
       {paginationRange.map((num, index) => {
              if (num === DOTS) {
                return <Pagination.Ellipsis key={`${index}-${num}`} />;
              }

              return (
                <Pagination.Item
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  active={currentPage === num}
                >
                  {num}
                </Pagination.Item>
              );
            })}
      <Pagination.Next 
      disabled={currentPage===totalNumberofPages}
      onClick={()=>{
        currentPage!==1 ?
       setCurrentPage(currentPage+1): null }}
      />
      <Pagination.Last  disabled={currentPage===totalNumberofPages}
      onClick={()=>{
        
       setCurrentPage(totalNumberofPages)}} />
      </Pagination>
    </div>
    <div className='col-auto'>
  <select value={limit} className="form-select" onChange={(e)=>{setLimit(Number(e.target.value)); setCurrentPage(1)}}>
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
  </select>
  </div>
  </div>
  </div>
  )
}
  


export default HookPaginate;
