import React from "react";
import {useDispatch}from "react-redux"
import { Row, Col, Card, Button } from "react-bootstrap";
import "./ProductDetailPage.css"; // Import CSS
import { addToCart } from "../slices/cartSlice";
import { useParams } from "react-router-dom";


const ProductDetail= () => {
  const dispatch=useDispatch();
  const{id}=useParams();
const product = [
    {
        id: 1,
        name: "Table Fan",
        image: "/images/table-fan.jpg", // Replace with actual image path
        price: 50,
        description: "A compact table fan with adjustable speed and sleek design.",
        averageRating: 4.5,
        countInStock: 10,
        quantity:0,
        reviews: [
          { id: 1, user: "John Doe", comment: "Great product!", rating: 5 },
          { id: 2, user: "Jane Smith", comment: "Good value for money.", rating: 4 },
        ],
      },
      {
        id: 2,
        name: "LED Bulb",
        image: "/images/led-bulb.jpg",
        price: 10,
        description: "Energy-saving LED bulb with 10,000 hours lifespan.",
        averageRating: 4.8,
        countInStock: 25,
        quantity:0,
        reviews: [
          { id: 1, user: "Alice Brown", comment: "Super bright and efficient!", rating: 5 },
        ],
      },
      {
        id: 3,
        name: "Bluetooth Speaker",
        image: "/images/bluetooth-speaker.jpg",
        price: 30,
        description: "Portable Bluetooth speaker with crystal-clear sound.",
        averageRating: 4.3,
        countInStock: 15,
        quantity:0,
        reviews: [
          { id: 1, user: "Charlie Green", comment: "Great sound quality for the price.", rating: 4 },
          { id: 2, user: "Diana White", comment: "Easy to pair with my devices.", rating: 5 },
        ],
      },
      {
        id: 4,
        name: "Wireless Mouse",
        image: "/images/wireless-mouse.jpg",
        price: 20,
        description: "Ergonomic wireless mouse with adjustable DPI.",
        averageRating: 4.6,
        countInStock: 8,
        quantity:0,
        reviews: [
          { id: 1, user: "Ethan Black", comment: "Very comfortable for long use.", rating: 5 },
          { id: 2, user: "Fiona Gray", comment: "Battery life could be better.", rating: 4 },
        ],
      },
      {
        id: 5,
        name: "Smart Watch",
        image: "/images/smart-watch.jpg",
        price: 100,
        description: "Feature-packed smartwatch with fitness tracking and notifications.",
        averageRating: 4.7,
        countInStock: 5,
        quantity:0,
        reviews: [
          { id: 1, user: "George Wilson", comment: "Tracks my steps perfectly!", rating: 5 },
          { id: 2, user: "Hannah Brown", comment: "Screen quality is amazing.", rating: 4 },
        ],
      },
      {
        id: 6,
        name: "Gaming Keyboard",
        image: "/images/gaming-keyboard.jpg",
        price: 70,
        description: "RGB mechanical gaming keyboard with customizable keys.",
        averageRating: 4.9,
        countInStock: 12,
        quantity:0,
        reviews: [
          { id: 1, user: "Ian Silver", comment: "Love the RGB lighting!", rating: 5 },
          { id: 2, user: "Julia Gold", comment: "Keys are smooth and responsive.", rating: 5 },
        ],
      },
    ];
    const input= product?.find((item)=>item.id===parseInt(id));
     const addToCartHandler=()=>{
    dispatch(addToCart(input));
   }
    
  

  return (
    
   
    
    <div className="product-details-container">
      <Row>
        <Col md={6}>
          <img
            src={input.image}
            alt={input.name}
            className="product-details-image"
          />
        </Col>
        <Col md={6}>
          <Card className="product-details-card">
            <Card.Body>
              <Card.Title className="product-title">{input.name}</Card.Title>
              <Card.Text className="product-price">Price: ${input.price}</Card.Text>
              <Card.Text className="product-description">{input.description}</Card.Text>
              <Card.Text className="product-stock">
                {input.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </Card.Text>
              <Button
                className="add-to-cart-btn"
                variant="primary"
                disabled={input.countInStock === 0}
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
          {input.reviews.map((review) => (
            <Card key={review.id} className="review-card">
              <Card.Body>
                <Card.Title>{review.user}</Card.Title>
                <Card.Text>
                  <strong>Rating:</strong> {review.rating}/5
                </Card.Text>
                <Card.Text>{review.comment}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
