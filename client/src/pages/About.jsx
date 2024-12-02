import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">About Us</h1>
          <p className="hero-subtitle">
            Your one-stop destination for the best shopping experience.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="company-overview">
        <div className="container">
          <h2>Who We Are</h2>
          <p>
            Welcome to [Your E-Commerce Name]! We are passionate about bringing 
            you the best products from around the globe. Our mission is to 
            make shopping convenient, enjoyable, and trustworthy for our 
            customers.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            To empower our customers by providing access to high-quality 
            products at affordable prices while ensuring exceptional service 
            and support.
          </p>
        </div>
      </section>

     
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="team-photo"
              />
              <h3>Jane Doe</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="team-photo"
              />
              <h3>John Smith</h3>
              <p>Head of Operations</p>
            </div>
            <div className="team-member">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="team-photo"
              />
              <h3>Sara Lee</h3>
              <p>Marketing Director</p>
            </div>
          </div>
        </div>
      </section>

     
      <section className="testimonials-section">
        <div className="container">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <p>
                "I love shopping here! The quality and variety of products are 
                unbeatable."
              </p>
              <h4>- Alex Johnson</h4>
            </div>
            <div className="testimonial">
              <p>
                "Customer service is amazing. Fast shipping and easy returns 
                made my experience stress-free."
              </p>
              <h4>- Maria Gonzalez</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call-to-Action */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Shop?</h2>
          <p>Explore our collections and find what you love today!</p>
          <a href="/shop" className="btn btn-primary">
            Start Shopping
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
