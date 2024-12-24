import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import "./ProductPage.css"; // Import CSS file
import { useSelector,useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import { SkelLoader } from "../components/SkeletalLoaders";

const Products = () => {
  const {products,loading}= useSelector((state)=>state.products);
  const dispatch=useDispatch();
  const initFetch= useCallback(()=>{
    dispatch(fetchProducts());
  },[dispatch])
  
  useEffect(()=>{
    initFetch();
  },[initFetch])

  return (
    <div className="product-list-container">
      <h1 className="text-center my-4">Our Products</h1>
      {products && products.length!==0 ?
        (
          <Row>
             {products.map((product) => (
              
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Card className="product-card mb-4">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <Card.Body>
                    <Card.Title className="product-title">{product.name||""}</Card.Title>
                    <Card.Text className="product-price">Price: ${product.price||""}</Card.Text>
                    <Card.Text className="product-description">{product.description?.substring(0,100).concat("......")||""}</Card.Text>
                    <Link to={`/productDetail/${product.id}`} variant="primary" className=" btn view-details-btn" >
                      View Details
                    </Link>
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
   
    </div>
  );
 
};

export default Products;
