import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import FloatingShapes from '../components/FloatingShapes';

const Home = () => {
    return (
        <div className="home-wrapper animated-bg">
            <FloatingShapes />
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-image-side">
                        <div className="image-wrapper">
                            <img
                                src="https://www.dimensions-architect.com/wp-content/uploads/2014/07/Scholars-Institute-building.png"
                                alt="Modern Hostel"
                                className="hero-image"
                            />
                        </div>
                    </div>

                    <div className="hero-text-side">
                        <h1 className="hero-title">Welcome to Hostel Management System</h1>
                        <p className="hero-subtitle">
                            Experience a smarter way to manage hostel life. Easy room bookings, secure payments, and seamless administration all in one place.
                        </p>
                        <div className="button-group">
                            <Link to="/login" className="btn-primary">Get Started</Link>
                            <Link to="/login" className="btn-secondary">Learn More</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="feature-card">
                    <span className="feature-icon">🏠</span>
                    <h3>Smart Room Booking</h3>
                    <p>Browse available rooms and book your stay with just a few clicks.</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon">💳</span>
                    <h3>Secure Payments</h3>
                    <p>Integrated Stripe payments for quick and safe transactions.</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon">⚙️</span>
                    <h3>Easy Administration</h3>
                    <p>Powerful tools for admins to manage rooms, students, and more.</p>
                </div>
            </section>

            <footer style={{ textAlign: 'center', padding: '3rem', color: '#636e72' }}>
                <p>&copy; 2026 Hostel Management System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
