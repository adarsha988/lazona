import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import "./ProductDetailPage.css"; // Import CSS
import { addToCart } from "../slices/cartSlice";
import { useParams } from "react-router-dom";
import { getById } from "../slices/productSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product,products } = useSelector((state) => state.products);

  const getProduct = useCallback(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const addToCartHandler = () => {
    dispatch(addToCart(product));
  };
  const ProductImage= ()=>{
const firstRandomIndex = Math.floor(Math.random()*products.length);
const secRandomIndex = Math.floor(Math.random()*products.length);
const thirdRandomIndex = Math.floor(Math.random()*products.length);
const fourthRandomIndex = Math.floor(Math.random()*products.length);

const randProduct=[
  products[firstRandomIndex],
  products[secRandomIndex],
  products[thirdRandomIndex],
  products[fourthRandomIndex],
]
    return randProduct;
  }

  return (
    <div className="product-details-container py-5">
      <Row>
        {/* Product Images */}
        <Col md={6} className="mb-4">
          <div className="image-gallery">
            <img
              src={product?.images?.[0]}
              alt={product?.title}
              className="product-main-image mb-3"
            />
            <div className="image-thumbnails d-flex gap-2">
              {product?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail-image border p-1"
                />
              ))}
            </div>
          </div>
        </Col>

        {/* Product Details */}
        <Col md={6}>
          <Card className="product-details-card shadow-sm">
            <Card.Body>
              <Card.Title className="product-title">{product?.name}</Card.Title>
              <Card.Text className="product-price text-muted fs-5">
                Price: <strong>${product?.price}</strong>
              </Card.Text>
              <Card.Text className="product-description">{product?.description}</Card.Text>
              <Card.Text className="tag-section">
                <strong>
                  Tag:
                  <a href=""> {product?.category}</a>
                 </strong>
              </Card.Text>
              <Card.Text className="quantity-section">
               <div>
               <label for="quantity">Quantity : </label> &nbsp;
               <input type="number" id="quantity" name="quantity" min="1" max={String(product?.quantity)} defaultValue="1"/><br/>
               </div>
              </Card.Text>

              <Card.Text className="product-stock">
                <strong>Stock:</strong>{" "}
                {product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </Card.Text>
              <Button
                className="add-to-cart-btn"
                variant="primary"
                disabled={product?.countInStock < 1}
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Customer Reviews */}
      <Row className="product-reviews mt-5">
        <Col>
          <h3 className="d-flex justify-content-start">Customer Reviews</h3>
          {Array.isArray(product?.reviews) && product?.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <Card key={review.id} className="review-card mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title className="review-user">{review.user}</Card.Title>
                  <Card.Text>
                    <strong>Rating:</strong> {review.rating}/5
                  </Card.Text>
                  <Card.Text>{review.comment}</Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No reviews available for this product.</p>
          )}
        </Col>
      </Row>
      <Row>
       
        <div className="col-lg-3 text-center pt-3">
          <h4>More Product</h4>
        </div>
        </Row>
        
        <div className="image-thumbnail d-flex gap-2 mt-3 p-0 text-center pro-box-section">
         { ProductImage().map((product,index)=>{
            return (
            <div key={index} className="col-lg-3 pb-2">
            <div className="pro-box border p-0 m-0">
            <img  src={product.images?.[0]}/>
          </div>
            </div>
          )
         }) }
        </div>
        
        
   
    </div>
  );
};

export default ProductDetail;
