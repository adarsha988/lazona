import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import  "./ProductDetailPage.css"; // Import CSS
import { SERVER_URL } from "../constants";
import { updateToCart,addToCart} from "../slices/cartSlice";
import { useParams,Link } from "react-router-dom";
import { fetchProducts,getProducts } from "../slices/productSlice";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product,products } = useSelector((state) => state.products);
  const [Quantity,setQuantity]= useState(1);
  const [random4Item,setrandom4Item]= useState([]);

  const getProduct = useCallback(() => {
    dispatch(getProducts(id));
  }, [dispatch,id]);

  const fetchProduct = useCallback(() => {
    dispatch(fetchProducts({limit:40,page:1}));
  }, [dispatch]);

 

 
  const ProductImage= useCallback(()=>{
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
   setrandom4Item(randProduct);
   
  },[products])

  useEffect(() => {
     getProduct();
     ProductImage();
    if(products?.length===0) fetchProduct();
   
  }, [fetchProduct,ProductImage,getProduct,products]);
  return (
    <div className="product-details-container py-5">
      <Row>
        {/* Product Images */ }
        <Col md={6} className="mb-4">
          <div className="image-gallery">
            <img
              src={product?.images&&product.length>0 &&product.images?.[0].includes("https:")?product.images?.[0]:product?.images&&product.length>0 ? SERVER_URL+'/'+product.images?.[0]: "https://www.bootdey.com/image/380x380/FF00FF/000000"}
              alt={product?.title}
              className="product-main-image mb-3"
            />
            <div className="image-thumbnails d-flex gap-2">
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.includes("https:")?image:image?SERVER_URL+'/'+image: "https://www.bootdey.com/image/380x380/FF00FF/000000"}
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
                  <a href=""> {product?.category_name}</a>
                 </strong>
              </Card.Text>
              <Card.Text className="quantity-section">
            
               <label htmlFor="quantity">Quantity : </label> &nbsp;
               <input type="number" id="quantity" name="quantity" min="1" max={String(product?.quantity)} disabled={product?.quantity < 1} value={Quantity} onChange={(e)=>{ setQuantity(Number(e.target.value))}}/><br/>
              
              </Card.Text>

              <Card.Text className="product-stock">
                <strong>Stock:</strong>{" "}
                {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
              </Card.Text>
              <Button
                className="add-to-cart-btn"
                variant="primary"
                disabled={product?.quantity < 1}
                onClick={()=>{dispatch(updateToCart({product,Quantity}))}}
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
          ) : 
          <>No reviews available for this product.</>
          }
        </Col>
      </Row>
      <Row>
       
        <div className="col-lg-3 text-center pt-3">
          <h4>More Product</h4>
        </div>
        </Row>
        
        <div className="image-thumbnail d-flex gap-2 mt-3 p-0 text-center pro-box-section">
         { random4Item.map((product,index)=>{
            return (
            <div key={index} className="col-lg-3 pb-2">
            <div className="pro-box border p-0 m-0">
              <Link to={`/productDetail/${product?._id}`}>
              <img  src={product.images&&product.images?.[0].includes("https:")?product.images?.[0]:product.images&&product.images?.[0]?SERVER_URL+'/'+product.images?.[0]:"no image"}/>
              </Link>
                
          </div>
            </div>
          )
         }) }
        </div>
        
        
   
    </div>
  );
};

export default ProductDetail;
