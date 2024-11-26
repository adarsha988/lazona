import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import "./ProductPage.css"; // Import CSS file


const Products = () => {
  const products = [
    { id: 1, name: "Table Fan", image: "/images/table-fan.jpg", price: 50, description: "Compact table fan with adjustable speed." },
    { id: 2, name: "LED Bulb", image: "/images/led-bulb.jpg", price: 10, description: "Energy-saving LED bulb with 10,000 hours lifespan." },
    { id: 3, name: "Bluetooth Speaker", image: "/images/bluetooth-speaker.jpg", price: 30, description: "Portable Bluetooth speaker." },
    { id: 4, name: "Wireless Mouse", image: "/images/wireless-mouse.jpg", price: 20, description: "Ergonomic wireless mouse with adjustable DPI." },
  ];

  return (
    <div className="product-list-container">
      <h1 className="text-center my-4">Our Products</h1>
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
                <Card.Title className="product-title">{product.name}</Card.Title>
                <Card.Text className="product-price">Price: ${product.price}</Card.Text>
                <Card.Text className="product-description">{product.description}</Card.Text>
                <Link to={`/productDetail/${product.id}`} variant="primary" className=" btn view-details-btn" >
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
