import "../pages/Home.css";

function CarouselPage() {
  return (
    <div>
    <main className="pt-5 mt-4">
    <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" className="active" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://placehold.co/1500x700" className="d-block w-100" alt="Slide 1"/>
          <div className="carousel-caption text-start">
            <h1>Welcome to Modern Carousel.</h1>
            <p>Explore our stunning features and design.</p>
            <a className="btn btn-primary btn-lg" href="#">Get Started</a>
          </div>
        </div>
        <div className="carousel-item">
          <img src="https://placehold.co/1500x700" className="d-block w-100" alt="Slide 2"/>
          <div className="carousel-caption">
            <h1>Seamless Performance.</h1>
            <p>Built for speed and usability.</p>
            <a className="btn btn-primary btn-lg" href="#">Learn More</a>
          </div>
        </div>
        <div className="carousel-item">
          <img src="https://placehold.co/1500x700" className="d-block w-100" alt="Slide 3"/>
          <div className="carousel-caption text-end">
            <h1>Join Us Today.</h1>
            <p>Start your journey with us.</p>
            <a className="btn btn-primary btn-lg" href="#">Sign Up</a>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>

  
    <div className="container marketing mt-5">
      <div className="row text-center">
        <div className="col-lg-4">
          <img src="https://placehold.co/140" className="rounded-circle" alt="Feature 1"/>
          <h2>Innovative</h2>
          <p>Discover groundbreaking features and innovations.</p>
          <a className="btn btn-secondary" href="#">Details &raquo;</a>
        </div>
        <div className="col-lg-4">
          <img src="https://placehold.co/140" className="rounded-circle" alt="Feature 2"/>
          <h2>Efficient</h2>
          <p>Engineered for performance and reliability.</p>
          <a className="btn btn-secondary" href="#">Details &raquo;</a>
        </div>
        <div className="col-lg-4">
          <img src="https://placehold.co/140" className="rounded-circle" alt="Feature 3"/>
          <h2>User-Friendly</h2>
          <p>Designed with simplicity and ease of use in mind.</p>
          <a className="btn btn-secondary" href="#">Details &raquo;</a>
        </div>
      </div>

     
      <hr className="featurette-divider"/>
      <div className="row featurette">
        <div className="col-md-7">
          <h2 className="featurette-heading">Engaging Experiences. <span className="text-muted">See for yourself.</span></h2>
          <p className="lead">Our platform offers a sleek and modern experience for everyone.</p>
        </div>
        <div className="col-md-5">
          <img src="https://placehold.co/500" className="img-fluid" alt="Featurette 1"/>
        </div>
      </div>
      <hr className="featurette-divider"/>
      <div className="row featurette">
        <div className="col-md-7 order-md-2">
          <h2 className="featurette-heading">Advanced Design. <span className="text-muted">Its that good.</span></h2>
          <p className="lead">Every element is crafted with attention to detail.</p>
        </div>
        <div className="col-md-5 order-md-1">
          <img src="https://placehold.co/500" className="img-fluid" alt="Featurette 2"/>
        </div>
      </div>
    </div>

   
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <p className="mb-0 text-center">&copy; 2024 Modern Carousel Inc. &middot; <a href="#" className="text-light">Privacy</a> &middot; <a href="#" className="text-light">Terms</a></p>
      </div>
    </footer>
  </main>
  </div>
  )
  
}

export default CarouselPage