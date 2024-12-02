import React from "react";
import {useDispatch, useSelector}from "react-redux"
import { Row, Col, Card, Button } from "react-bootstrap";
import "./ProductDetailPage.css"; // Import CSS
import { addToCart } from "../slices/cartSlice";
import { useParams } from "react-router-dom";


const ProductDetail= () => {
  const dispatch=useDispatch();
  const{id}=useParams();
const {products}= useSelector((state)=>state.products)
console.log(products)
    const input= products?.find((item)=>item.id===parseInt(id));
    if (!input) {
      return <p>Product not found.</p>;  // Show a message if the product doesn't exist
    }
    
    const addToCartHandler=()=>{
    dispatch(addToCart(input));
   }
    
  

  return (
    
   
    
    <div className="product-details-container">
      <Row>
        <Col md={6}>
          <img
            src={input.image}
            alt={input.title}
            className="product-details-image"
          />
        </Col>
        <Col md={6}>
          <Card className="product-details-card">
            <Card.Body>
              <Card.Title className="product-title">{input.title}</Card.Title>
              <Card.Text className="product-price">Price: ${input.price}</Card.Text>
              <Card.Text className="product-description">{input.description}</Card.Text>
              <Card.Text className="product-stock">
                {input.countInStock ||5 > 0 ? "In Stock" : "Out of Stock"}
              </Card.Text>
              <Button
                className="add-to-cart-btn"
                variant="primary"
                // disabled={input.countInStock === 0}
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="product-reviews">
        <Col>
          <h3>Customer Reviews</h3>
          {Array.isArray(input.reviews)&& input.reviews.length >0 ?(input.reviews.map((review) => (
            <Card key={review.id} className="review-card">
              <Card.Body>
                <Card.Title>{review.user}</Card.Title>
                <Card.Text>
                  <strong>Rating:</strong> {review.rating}/5
                </Card.Text>
                <Card.Text>{review.comment}</Card.Text>
              </Card.Body>
            </Card>
          ))):(<p> Product is unavailable</p>)}
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;