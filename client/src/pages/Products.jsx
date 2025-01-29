import React, { useCallback, useEffect } from "react";
import { GrFormView } from "react-icons/gr";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import "./ProductPage.css"; // Import CSS file
import { useSelector,useDispatch } from "react-redux";
import { fetchProducts,setCurrentPage,setLimit} from "../slices/productSlice";
import { SkelLoader } from "../components/SkeletalLoaders";
import { addToCart } from "../slices/cartSlice";
import Paginate from "../components/Paginate";
import { SERVER_URL } from "../constants";

const Products = () => {
  const {products,limit,currentPage,total,loading,error}= useSelector((state)=>state.products);
  const dispatch=useDispatch();
  const initFetch= useCallback(()=>{
    dispatch(fetchProducts({limit,page:currentPage}));
  },[dispatch,limit,currentPage])
  
  useEffect(()=>{
    initFetch();
  },[initFetch])
 const addToCartHandler=(product)=>{
 dispatch(addToCart(product));
   }
  return (
    <div className="product-list-container">
      <h1 className="text-center my-4">Our Products</h1>
      {products && products.length!==0 ?
        (
          <Row>
             {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Card className="product-card mb-4">
                {product?.quantity<1 && (
                  <div className="badge-ribbon">
                  <span className="badge bg-danger">out of stock</span>
                </div>
                )}

                  <Card.Img
                    variant="top"
                    src={product.images&&product.images[0].includes("https:")?product.images[0]:SERVER_URL+'/'+product.images[0]}
                    alt={product.name}
                    className="product-image"
                  />
                  <Card.Body>
                    <Card.Title className="product-title">{product.name||""}</Card.Title>
                    <Card.Text className="product-price">Price: ${product.price||""}</Card.Text>
                    <Card.Text className="product-description">{product.description?.substring(0,100).concat("......")||""}</Card.Text>
                   <div className="d-flex justify-content-center mt-4">
                   <Link to={`/productDetail/${product._id}`} variant="primary" className=" view-btn"  >
                     <GrFormView />
                    </Link>
                                  <Button
                                    className="add-btn"
                                    variant="primary"
                                    disabled={product.quantity<1 ? true : false }
                                    onClick={()=>addToCartHandler(product)}
                                  >
                                  <IoCartOutline />
                                  </Button>
                                   </div>
                   </Card.Body>
                </Card>
              </Col>
            ))}

          </Row>
        )
      :
      (
        <div className="container">
          {products.length===0 && !loading &&(
           <div className="text-center my-4 ">No Products Found</div>
         ) }
       
          {products.length===0 && loading &&(
           <div className=" row mb-4 "style={{display:" flex",
            justifycontent: "space-between",
           }}>
           <div className="col"><SkelLoader/></div>
           <div className="col"><SkelLoader/></div>
           <div className="col"><SkelLoader/></div>
           <div className="col"><SkelLoader/></div>

           </div>
         ) }
       </div>
      )}
   <Paginate dispatch={dispatch}limit={limit} setCurrentPage={setCurrentPage} total={total} currentPage={currentPage}
    setLimit={setLimit}/>
    </div>
  );
 
};

export default Products;
